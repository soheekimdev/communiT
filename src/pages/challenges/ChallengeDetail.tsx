import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/RTK/hooks';
import { setCurrentChallenge, selectCurrentChallenge } from '@/RTK/challengeSlice';
import BackButton from '@/components/shared/BackButton';
import LoadingState from '@/components/shared/LoadingState';
import ErrorState from '@/components/shared/ErrorState';
import ChallengeHeader from '@/components/challenges/ChallengeHeader';
import ChallengeFooter from '@/components/challenges/ChallengeFooter';
import ActionFeedback from '@/components/shared/ActionFeedback';
import { differenceInDays } from 'date-fns';
import { deleteChallenge, getChallenge } from '@/api/challenges';
import { fetchProfileImageURL } from '@/api/profileURL';
import ChallengeEvent from '@/components/challenges/ChallengeEvent';

const ChallengeDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const challenge = useAppSelector(selectCurrentChallenge);
  const { user } = useAppSelector(state => state.auth);
  const [author, setAuthor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

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

  const handleDelete = async () => {
    if (!challenge?.id) return;

    try {
      await deleteChallenge(challenge.id);
      setSuccess(true);

      setTimeout(() => {
        navigate('/challenges');
      }, 2000);
    } catch (error) {
      setError('챌린지 삭제 중 오류가 발생했습니다.');
      console.error('챌린지 삭제 실패:', error);
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
      <ActionFeedback
        error={error}
        success={success}
        successTitle="성공"
        successMessage="챌린지가 성공적으로 삭제되었습니다. 곧 목록 페이지로 이동합니다."
      />

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
      <ChallengeEvent />
    </div>
  );
};

export default ChallengeDetail;
