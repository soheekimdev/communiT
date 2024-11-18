import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Crown, Heart } from 'lucide-react';

interface ChallengeCardProps {
  id: string;
  isMine: boolean;
  likeCount: number;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
}

export const ChallengeCard = ({
  id,
  isMine,
  likeCount,
  title,
  startDate,
  endDate,
  description,
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
      <div className="flex gap-4 justify-between">
        <div className="flex">
          <Avatar size="xs" className="ml-[-10%]">
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
              e.stopPropagation(); // 좋아요 클릭 시 카드 클릭 이벤트 전파 방지
              // TODO: 좋아요 기능 구현
            }}
          >
            <Heart />
            <span>{likeCount}</span>
          </Button>
        </div>
      </div>
      <p className="text-xl font-semibold">{title}</p>
      <p className="text-sm">
        {formatDate(startDate)} ~ {formatDate(endDate)}
      </p>
      <p className="text-sm text-muted-foreground mb-6">{description}</p>
    </div>
  );
};
