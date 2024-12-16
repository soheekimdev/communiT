import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getChallenges,
  getChallengeMembers,
  isChallengePassed,
  isUserParticipating,
} from '@/api/challenges';
import { ChallengeCard } from '@/components/challenges/ChallengeCard';
import { CreateChallengeButton } from '@/components/challenges/CreateChallengeButton';
import LoadingState from '../../components/shared/LoadingState';
import type { Challenge } from '@/types/challenge';
import type { RootState } from '@/RTK/store';
import type { AuthState } from '@/types/auth';

const Challenges = () => {
  const [allChallenges, setAllChallenges] = useState<Challenge[]>([]);
  const [participatingChallenges, setParticipatingChallenges] = useState<Challenge[]>([]);
  const [isAllChallengesLoading, setIsAllChallengesLoading] = useState(true);
  const [isParticipatingChallengesLoading, setIsParticipatingChallengesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isLoggedIn } = useSelector<RootState, AuthState>(state => state.auth);

  const sortWithFinishedAtEnd = (challenges: Challenge[]) => {
    return [...challenges].sort((a, b) => {
      const isAFinished = isChallengePassed(a.endDate) || a.isFinished;
      const isBFinished = isChallengePassed(b.endDate) || b.isFinished;

      if (isAFinished && !isBFinished) return 1;
      if (!isAFinished && isBFinished) return -1;
      return 0;
    });
  };

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setIsAllChallengesLoading(true);
        const response = await getChallenges();
        const sortedChallenges = sortWithFinishedAtEnd(response.data);
        setAllChallenges(sortedChallenges);

        if (isLoggedIn && user?.id) {
          setIsParticipatingChallengesLoading(true);

          const challengesWithParticipation = await Promise.all(
            sortedChallenges.map(async challenge => {
              try {
                const members = await getChallengeMembers(challenge.id);
                const isParticipating = isUserParticipating(members, user.id);
                return { challenge, isParticipating };
              } catch (error) {
                console.error(`Failed to fetch members for challenge ${challenge.id}:`, error);
                return { challenge, isParticipating: false };
              }
            }),
          );

          const participating = challengesWithParticipation
            .filter(result => result.isParticipating)
            .map(result => result.challenge);

          setParticipatingChallenges(sortWithFinishedAtEnd(participating));
        } else {
          setParticipatingChallenges([]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : '챌린지 목록을 불러오는데 실패했습니다.');
      } finally {
        setIsAllChallengesLoading(false);
        setIsParticipatingChallengesLoading(false);
      }
    };

    fetchChallenges();
  }, [isLoggedIn, user?.id]);
  if (isAllChallengesLoading) {
    return (
      <div className="container mx-auto p-4">
        <LoadingState />
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

      {isLoggedIn && (
        <section className="space-y-6">
          <h3 className="text-2xl font-semibold">
            {user?.username}님이 참여 중인 챌린지
            {isParticipatingChallengesLoading && (
              <span className="ml-2 text-sm text-muted-foreground">불러오는 중...</span>
            )}
          </h3>
          {isParticipatingChallengesLoading ? (
            <LoadingState />
          ) : participatingChallenges.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {participatingChallenges.map(challenge => (
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
      )}

      <section className="space-y-6">
        <h3 className="text-2xl font-semibold">모든 챌린지</h3>
        {allChallenges.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allChallenges.map(challenge => (
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
            <p className="text-lg text-muted-foreground mb-4">등록된 챌린지가 없습니다</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Challenges;
