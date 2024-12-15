import { Button } from '@/components/ui/button';
import { ThumbsUp } from 'lucide-react';
import { useState } from 'react';
import { likeComment, unlikeComment } from '@/api/comment';
import { useToast } from '@/hooks/useToast';
import axios from 'axios';

interface LikeButtonProps {
  initialLikes: number;
  isInitiallyLiked: boolean;
  postId: string;
  commentId: string;
  token: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  initialLikes,
  isInitiallyLiked,
  postId,
  commentId,
  token,
}) => {
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(isInitiallyLiked);
  const { toast } = useToast();

  const handleLikeToggle = async () => {
    if (!token) {
      toast({
        title: '로그인 필요',
        description: '좋아요를 누르려면 로그인이 필요합니다.',
      });
      return;
    }

    try {
      if (isLiked) {
        await unlikeComment(postId, commentId, token);
        setIsLiked(false);
        setLikeCount(prev => Math.max(0, prev - 1));
      } else {
        try {
          await likeComment(postId, commentId, token);
          setIsLiked(true);
          setLikeCount(prev => prev + 1);
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 409) {
            await unlikeComment(postId, commentId, token);
            setIsLiked(false);
            setLikeCount(prev => Math.max(0, prev - 1));
          }
        }
      }
    } catch (error) {
      toast({
        title: '좋아요 처리 실패',
        description: '좋아요/취소 처리 중 오류가 발생했습니다.',
      });
      console.error('Error toggling like:', error);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className={`flex items-center space-x-1 `}
      onClick={handleLikeToggle}
      aria-label={`좋아요 ${likeCount}개`}
    >
      <ThumbsUp className="h-4 w-4" />
      <span>{likeCount}</span>
    </Button>
  );
};

export default LikeButton;
