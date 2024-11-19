import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getChallenge } from '@/api/challenges';
import { Button } from '@/components/ui/button';
import ProfileImage from '@/components/profile/ProfileImage';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format, differenceInDays } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Heart, ArrowLeft, Calendar, Clock, MoreHorizontal } from 'lucide-react';
import type { Challenge } from '@/types/challenge';
import type { RootState } from '@/RTK/store';
import { fetchProfileImageURL } from '@/api/profileURL';

const ChallengeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [author, setAuthor] = useState<{ username: string; profileImageUrl?: string } | null>(null);

  useEffect(() => {
    if (challenge?.accountId) {
      fetchProfileImageURL(challenge.accountId)
        .then(data => setAuthor(data))
        .catch(err => console.error(err));
    }
  }, [challenge]);

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

  const handleDelete = () => {
    // TODO: 삭제 확인 모달 표시
    console.log('삭제 클릭');
  };

  const handleEdit = () => {
    navigate(`/challenges/${challenge.id}/edit`);
  };

  const isMine = user?.id === challenge.accountId;
  const startDate = new Date(challenge.startDate);
  const endDate = new Date(challenge.endDate);
  const totalDays = differenceInDays(endDate, startDate) + 1;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        목록으로
      </Button>

      <div className="space-y-6">
        <div className="flex flex-col items-start justify-between">
          <div className="flex flex-row-reverse items-start flex-wrap gap-2 w-full mb-4">
            {isMine && (
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleEdit}>수정</DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleDelete}
                      className="text-red-600 focus:text-red-600"
                    >
                      삭제
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
            <h1 className="flex-1 min-w-40 text-3xl font-bold">{challenge.title}</h1>
          </div>

          <div className="flex items-center gap-4 flex-wrap text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {format(startDate, 'PPP', { locale: ko })} ~ {format(endDate, 'PPP', { locale: ko })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {totalDays}일간의 도전
            </span>
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none py-4">
          <p>{challenge.description}</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 w-full text-sm text-muted-foreground">
          <div className="self-start flex items-center gap-1 flex-wrap">
            <div className="flex items-center mr-4">
              {author && <ProfileImage profileImageUrl={author.profileImageUrl} />}
              <span>{challenge.accountUsername}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(challenge.createdAt), 'PPP', { locale: ko })}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button size="lg" variant="outline" className="gap-2 px-4">
              <Heart />
              <span>{challenge.likeCount}</span>
            </Button>
            <Button size="lg" className="w-full sm:w-auto">
              {isParticipating ? '챌린지 인증하기' : '참여하기'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetail;
