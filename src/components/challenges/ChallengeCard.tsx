import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Crown, Heart } from 'lucide-react';
import { ChallengeCardProps } from '@/types/challenge';
import { Badge } from '@/components/ui/badge';

export const ChallengeCard = ({
  id,
  isMine,
  likeCount,
  title,
  startDate,
  endDate,
  description,
  isDeleted,
  isFinished,
}: ChallengeCardProps) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleClick = () => {
    navigate(`/challenges/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col gap-2 p-6 border rounded-xl bg-card text-card-foreground shadow overflow-hidden cursor-pointer transition-colors"
    >
      <div className="flex gap-2 justify-between flex-wrap">
        <div className="flex">
          <Avatar size="xs">
            <AvatarFallback>김홍삼</AvatarFallback>
          </Avatar>
          <Avatar size="xs" className="ml-[-10%]">
            <AvatarFallback>222</AvatarFallback>
          </Avatar>
          <Avatar size="xs" className="ml-[-10%]">
            <AvatarFallback>+233</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex gap-2 items-center">
          {isMine && <Crown />}
          <Button
            variant="plain"
            size="min"
            className="flex gap-2"
            onClick={e => {
              e.stopPropagation();
              // TODO: 좋아요 기능 구현
            }}
          >
            <Heart />
            <span>{likeCount}</span>
          </Button>
        </div>
      </div>

      <div className="items-start text-xl font-semibold">
        {isDeleted && (
          <Badge variant="options" className="mr-2 align-bottom">
            삭제됨
          </Badge>
        )}
        {isFinished && (
          <Badge variant="options" className="mr-2 align-bottom">
            종료
          </Badge>
        )}
        <span>{title}</span>
      </div>

      <p className="text-sm">
        {formatDate(startDate)} ~ {formatDate(endDate)}
      </p>

      <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
    </div>
  );
};
