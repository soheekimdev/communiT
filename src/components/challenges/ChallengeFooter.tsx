import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import ProfileImage from '@/components/profile/ProfileImage';
import { Button } from '@/components/ui/button';
import { Challenge } from '@/types/challenge';
import { Heart, Calendar } from 'lucide-react';

type ChallengeFooterProps = {
  author: { username: string; profileImageUrl?: string } | null;
  challenge: Challenge;
  isParticipating: boolean;
  isFinished: boolean;
  onJoin: () => void;
};

const ChallengeFooter = ({
  author,
  challenge,
  isParticipating,
  isFinished,
  onJoin,
}: ChallengeFooterProps) => {
  const getButtonText = () => {
    if (isFinished) return '종료된 챌린지';
    if (isParticipating) return '챌린지 인증하기';
    return '참여하기';
  };

  return (
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
        <Button size="lg" className="w-full sm:w-auto" disabled={isFinished} onClick={onJoin}>
          {getButtonText()}
        </Button>
      </div>
    </div>
  );
};

export default ChallengeFooter;