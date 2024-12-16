import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/RTK/hooks';
import { toggleChallengeLike } from '@/RTK/challengeSlice';
import { useToast } from '@/hooks/useToast';

type LikeButtonProps = {
  challengeId: string;
  initialLikeCount: number;
  initialIsLiked: boolean;
  isLoggedIn: boolean;
  isMine: boolean;
};

const LikeButton = ({
  challengeId,
  initialLikeCount,
  initialIsLiked,
  isLoggedIn,
  isMine,
}: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const isLoading = useAppSelector(state => state.challenge.loading);

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      toast({
        title: '로그인 필요',
        description: '좋아요를 누르려면 먼저 로그인해주세요.',
        variant: 'destructive',
      });
      return;
    }

    if (isMine) {
      toast({
        title: '좋아요 불가',
        description: '자신의 챌린지에는 좋아요를 할 수 없습니다.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const result = await dispatch(
        toggleChallengeLike({
          challengeId,
          isLiked,
        }),
      ).unwrap();

      setIsLiked(!isLiked);
      setLikeCount(result.likeCount);

      toast({
        title: isLiked ? '좋아요 취소' : '좋아요',
        description: isLiked ? '좋아요가 취소되었습니다.' : '좋아요를 눌렀습니다.',
      });
    } catch (error) {
      toast({
        title: '오류 발생',
        description: error instanceof Error ? error.message : '좋아요 처리 중 오류가 발생했습니다.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Button
      size="lg"
      variant="outline"
      className="gap-2 px-4"
      onClick={handleLikeClick}
      disabled={isLoading || isMine}
    >
      <Heart className={`transition-colors ${isLiked ? 'fill-current text-red-500' : ''}`} />
      <span>{likeCount}</span>
    </Button>
  );
};

export default LikeButton;
