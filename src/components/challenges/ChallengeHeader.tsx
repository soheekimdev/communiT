import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import PostActionMenu from '@/components/shared/PostActionMenu';
import { Clock, Calendar } from 'lucide-react';

type ChallengeHeaderProps = {
  title: string;
  isMine: boolean;
  onEdit: () => void;
  onDelete: () => void;
  startDate: Date;
  endDate: Date;
  totalDays: number;
};

const ChallengeHeader = ({
  title,
  isMine,
  onEdit,
  onDelete,
  startDate,
  endDate,
  totalDays,
}: ChallengeHeaderProps) => (
  <div className="flex flex-col items-start justify-between">
    <div className="flex flex-row-reverse items-start flex-wrap gap-2 w-full mb-4">
      {isMine && <PostActionMenu onEdit={onEdit} onDelete={onDelete} />}
      <h1 className="flex-1 min-w-40 text-3xl font-bold">{title}</h1>
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
);

export default ChallengeHeader;
