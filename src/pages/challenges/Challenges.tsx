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

  const {
    user,
    isLoggedIn,
    isLoading: authLoading,
  } = useSelector<RootState, AuthState>(state => state.auth);

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

    if (isLoggedIn) {
      fetchChallenges();
    }
  }, [isLoggedIn]);

  if (authLoading || isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div>Loading...</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center p-6">
          <h2 className="text-xl font-semibold mb-2">로그인이 필요한 서비스입니다</h2>
          <p className="text-muted-foreground">챌린지 목록을 보려면 로그인해 주세요.</p>
        </div>
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
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">챌린지 목록</h2>
        <CreateChallengeButton />
      </div>

      {challenges.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {challenges.map(challenge => (
            <ChallengeCard
              key={challenge.id}
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
          <CreateChallengeButton />
        </div>
      )}
    </div>
  );
};

export default Challenges;
