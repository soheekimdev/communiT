import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/RTK/hooks';
import { setCurrentChallenge, selectCurrentChallenge } from '@/RTK/challengeSlice';
import BackButton from '@/components/shared/BackButton';
import LoadingState from '@/components/shared/LoadingState';
import ErrorState from '@/components/shared/ErrorState';
import ChallengeHeader from '@/components/challenges/ChallengeHeader';
import ChallengeFooter from '@/components/challenges/ChallengeFooter';
import { differenceInDays } from 'date-fns';
import { deleteChallenge, getChallenge } from '@/api/challenges';
import { fetchProfileImageURL } from '@/api/profileURL';

const ChallengeDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const challenge = useAppSelector(selectCurrentChallenge);
  const { user } = useAppSelector(state => state.auth);
  const [author, setAuthor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChallengeDetails = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const challengeData = await getChallenge(id);
        dispatch(setCurrentChallenge(challengeData));

        if (challengeData.accountId) {
          const authorData = await fetchProfileImageURL(challengeData.accountId);
          setAuthor(authorData);
        }
      } catch (err) {
        setError('챌린지 정보를 불러오는데 실패했습니다.');
        console.error('챌린지 조회 실패:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallengeDetails();
  }, [id, dispatch]);

  const handleEdit = () => {
    if (challenge?.id) {
      navigate(`/challenges/${challenge.id}/edit`);
    }
  };

  const handleDelete = () => {
    if (challenge?.id) {
      deleteChallenge(challenge.id);
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (error || !challenge) {
    return <ErrorState error={error} onBack={() => navigate(-1)} />;
  }

  const isMine = user?.id === challenge.accountId;
  const startDate = new Date(challenge.startDate);
  const endDate = new Date(challenge.endDate);
  const today = new Date();
  const totalDays = differenceInDays(endDate, startDate) + 1;
  const isFinished = challenge.isFinished || endDate < today;
  const isParticipating = isMine || true; // 임시 데이터

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <BackButton className="mb-6" />

      <div className="space-y-6">
        <ChallengeHeader
          challengeId={challenge.id}
          title={challenge.title}
          isMine={isMine}
          onEdit={handleEdit}
          onDelete={handleDelete}
          startDate={startDate}
          endDate={endDate}
          totalDays={totalDays}
          isFinished={isFinished}
        />

        <div className="prose dark:prose-invert max-w-none py-4">
          <p>{challenge.description}</p>
        </div>

        <ChallengeFooter
          author={author}
          challenge={challenge}
          isParticipating={isParticipating}
          isFinished={isFinished}
        />
      </div>
    </div>
  );
};

export default ChallengeDetail;
