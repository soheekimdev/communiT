import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getChallenge } from '@/api/challenges';
import { Button } from '@/components/ui/button';
import { Crown, Heart, ArrowLeft } from 'lucide-react';
import type { Challenge } from '@/types/challenge';
import type { RootState } from '@/RTK/store';

const ChallengeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 임시 데이터: 내가 참여한 챌린지 여부
  const isParticipating = false;

  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchChallenge = async () => {
      if (!id) return;

      try {
        const data = await getChallenge(id);
        setChallenge(data);
      } catch (err) {
        console.error('챌린지 조회 실패:', err);
        setError('챌린지를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallenge();
  }, [id]);

  if (isLoading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (error || !challenge) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-red-500">{error || '챌린지를 찾을 수 없습니다.'}</div>
        <Button variant="outline" onClick={() => navigate(-1)} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          돌아가기
        </Button>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const isMine = user?.id === challenge.accountId;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        목록으로
      </Button>

      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-col flex-wrap">
            <h1 className="text-3xl font-bold mb-2">{challenge.title}</h1>
            <p className="text-muted-foreground">
              {formatDate(challenge.startDate)} ~ {formatDate(challenge.endDate)}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {isMine && <Crown className="h-6 w-6" />}
            <Button variant="outline" className="gap-2">
              <Heart />
              <span>{challenge.likeCount}</span>
            </Button>
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <p>{challenge.description}</p>
        </div>

        <div className="pt-6">
          <Button size="lg" className="w-full sm:w-auto">
            {isParticipating ? '챌린지 인증하기' : '참여하기'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetail;
