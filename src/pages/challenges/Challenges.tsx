import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getChallenges, isChallengePassed } from '@/api/challenges';
import { ChallengeCard } from '@/components/challenges/ChallengeCard';
import { CreateChallengeButton } from '@/components/challenges/CreateChallengeButton';
import type { Challenge } from '@/types/challenge';
import type { RootState } from '@/RTK/store';
import type { AuthState } from '@/types/auth';

const Challenges = () => {
  const [allChallenges, setAllChallenges] = useState<Challenge[]>([]);
  const [myChallenges /* setMyChallenge */] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isLoggedIn } = useSelector<RootState, AuthState>(state => state.auth);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setIsLoading(true);
        const response = await getChallenges();
        setAllChallenges(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '챌린지 목록을 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-12">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">챌린지 목록</h2>
        {isLoggedIn && <CreateChallengeButton />}
      </div>

      <section className="space-y-6">
        <h3 className="text-2xl font-semibold">{user?.username}님이 참여 중인 챌린지</h3>
        {myChallenges.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {myChallenges.map(challenge => (
              <ChallengeCard
                key={challenge.id}
                {...challenge}
                isFinished={isChallengePassed(challenge.endDate)}
                isMine={user?.id === challenge.accountId}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">참여 중인 챌린지가 없습니다.</p>
          </div>
        )}
      </section>

      <section className="space-y-6">
        <h3 className="text-2xl font-semibold">모든 챌린지</h3>
        {allChallenges.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allChallenges.map(challenge => (
              <ChallengeCard
                key={challenge.id}
                {...challenge}
                isFinished={new Date(challenge.endDate) < new Date()}
                isMine={user?.id === challenge.accountId}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">등록된 챌린지가 없습니다</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Challenges;
