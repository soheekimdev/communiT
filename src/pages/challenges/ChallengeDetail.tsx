import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { differenceInDays } from 'date-fns';
import BackButton from '@/components/shared/BackButton';
import LoadingState from '@/components/shared/LoadingState';
import ErrorState from '@/components/shared/ErrorState';
import ChallengeHeader from '@/components/challenges/ChallengeHeader';
import ChallengeFooter from '@/components/challenges/ChallengeFooter';
import { getChallenge } from '@/api/challenges';
import { fetchProfileImageURL } from '@/api/profileURL';
import type { ChallengeDetailState } from '@/types/challenge';
import type { RootState } from '@/RTK/store';

const ChallengeDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user } = useSelector((state: RootState) => state.auth);

  const [detailState, setDetailState] = useState<ChallengeDetailState>({
    challenge: null,
    author: null,
    isLoading: true,
    error: null,
  });

  // 임시 데이터: 추후 API 연동 필요
  const isParticipating = false;

  useEffect(() => {
    const fetchChallengeDetails = async () => {
      if (!id) return;

      try {
        const challengeData = await getChallenge(id);
        setDetailState(prev => ({
          ...prev,
          challenge: challengeData,
        }));

        if (challengeData.accountId) {
          const authorData = await fetchProfileImageURL(challengeData.accountId);
          setDetailState(prev => ({
            ...prev,
            author: authorData,
          }));
        }
      } catch (err) {
        setDetailState(prev => ({
          ...prev,
          error: '챌린지 정보를 불러오는데 실패했습니다.',
        }));
        console.error('챌린지 조회 실패:', err);
      } finally {
        setDetailState(prev => ({
          ...prev,
          isLoading: false,
        }));
      }
    };

    fetchChallengeDetails();
  }, [id]);

  const handleDelete = () => {
    // TODO: 삭제 확인 모달 표시
    console.log('삭제 클릭');
  };

  const handleEdit = () => {
    if (detailState.challenge?.id) {
      navigate(`/challenges/${detailState.challenge.id}/edit`);
    }
  };

  if (detailState.isLoading) {
    return <LoadingState />;
  }

  if (detailState.error || !detailState.challenge) {
    return <ErrorState error={detailState.error} onBack={() => navigate(-1)} />;
  }

  const { challenge, author } = detailState;
  const isMine = user?.id === challenge.accountId;
  const startDate = new Date(challenge.startDate);
  const endDate = new Date(challenge.endDate);
  const totalDays = differenceInDays(endDate, startDate) + 1;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <BackButton className="mb-6" />

      <div className="space-y-6">
        <ChallengeHeader
          title={challenge.title}
          isMine={isMine}
          onEdit={handleEdit}
          onDelete={handleDelete}
          startDate={startDate}
          endDate={endDate}
          totalDays={totalDays}
        />

        <div className="prose dark:prose-invert max-w-none py-4">
          <p>{challenge.description}</p>
        </div>

        <ChallengeFooter author={author} challenge={challenge} isParticipating={isParticipating} />
      </div>
    </div>
  );
};

export default ChallengeDetail;
