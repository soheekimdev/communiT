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
import {
  deleteChallenge,
  getChallenge,
  joinChallenge,
  getChallengeMembers,
  isUserParticipating,
  convertToLocalDate,
  getChallengeIsLiked,
} from '@/api/challenges';
import { fetchProfileImageURL } from '@/api/profileURL';
import ChallengeEvent from '@/components/challenges/ChallengeEvent';
import { toast } from '@/hooks/useToast';

const ChallengeDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const challenge = useAppSelector(selectCurrentChallenge);
  const { user } = useAppSelector(state => state.auth);
  const isLoggedIn = !!user;

  const [author, setAuthor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isParticipating, setIsParticipating] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchChallengeDetails = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        setError(null);

        const [challengeData, likeStatus] = await Promise.all([
          getChallenge(id),
          isLoggedIn ? getChallengeIsLiked(id) : Promise.resolve(false),
        ]);

        dispatch(setCurrentChallenge(challengeData));
        setIsLiked(likeStatus);

        if (challengeData.accountId) {
          const authorData = await fetchProfileImageURL(challengeData.accountId);
          setAuthor(authorData);
        }

        if (user?.id) {
          const members = await getChallengeMembers(id);
          setIsParticipating(isUserParticipating(members, user.id));
        }
      } catch (err) {
        console.error('챌린지 조회 실패:', err);
        setError('챌린지 정보를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallengeDetails();
  }, [id, dispatch, user, isLoggedIn]);

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

  const onJoin = async () => {
    if (!challenge?.id || !user?.id) {
      setError('로그인이 필요한 기능입니다.');
      return;
    }

    try {
      setIsLoading(true);
      await joinChallenge(challenge.id);
      setIsParticipating(true);

      toast({
        title: '챌린지 참여 완료',
        description: '챌린지에 성공적으로 참여했습니다.',
        variant: 'default',
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : '챌린지 참여에 실패했습니다.');

      toast({
        title: '참여 실패',
        description: error instanceof Error ? error.message : '챌린지 참여에 실패했습니다.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (error || !challenge) {
    return <ErrorState error={error} onBack={() => navigate(-1)} />;
  }

  const isMine = user?.id === challenge.accountId;
  const startDate = convertToLocalDate(challenge.startDate);
  const endDate = convertToLocalDate(challenge.endDate);
  const today = new Date();
  const totalDays = differenceInDays(endDate, startDate) + 1;
  const isFinished = challenge.isFinished || endDate < today;

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
          isLoggedIn={isLoggedIn}
          isMine={isMine}
          initialIsLiked={isLiked}
          onJoin={onJoin}
        />
      </div>
      <ChallengeEvent />
    </div>
  );
};

export default ChallengeDetail;
