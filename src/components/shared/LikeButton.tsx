import { Button } from '@/components/ui/button';
import { ThumbsUp } from 'lucide-react';
import { useState } from 'react';

interface LikeButtonProps {
  initialLikes: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ initialLikes }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className={`flex items-center space-x-1 ${liked ? 'text-blue-600' : ''}`}
      onClick={handleLike}
      aria-label={`좋아요 ${initialLikes + (liked ? 1 : 0)}개`}
    >
      <ThumbsUp className="h-4 w-4" />
      <span>{initialLikes + (liked ? 1 : 0)}</span>
    </Button>
  );
};

export default LikeButton;
