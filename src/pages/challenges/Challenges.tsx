import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getChallenges } from '@/api/challenges';
import { ChallengeCard } from '@/components/challenges/ChallengeCard';
import { CreateChallengeButton } from '@/components/challenges/CreateChallengeButton';
import type { Challenge } from '@/types/challenge';
import type { RootState } from '@/RTK/store';
import type { AuthState } from '@/types/auth';

const Challenges = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user, isLoggedIn } = useSelector<RootState, AuthState>(state => state.auth);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setIsLoading(true);
        const response = await getChallenges();
        setChallenges(response.data);
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
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-3xl font-bold">챌린지 목록</h2>
        {isLoggedIn && <CreateChallengeButton />}
      </div>

      {challenges.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {challenges.map(challenge => (
            <ChallengeCard
              key={challenge.id}
              id={challenge.id}
              isMine={user?.id === challenge.accountId}
              likeCount={challenge.likeCount}
              title={challenge.title}
              startDate={challenge.startDate}
              endDate={challenge.endDate}
              description={challenge.description}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-4">등록된 챌린지가 없습니다</p>
          {isLoggedIn && <CreateChallengeButton />}
        </div>
      )}
    </div>
  );
};

export default Challenges;
