import PostActionMenuWithAlert from '@/components/shared/PostActionMenu';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '@/RTK/hooks';
import { finishChallenge, reopenChallenge, selectChallengeLoading } from '@/RTK/challengeSlice';

type ChallengeHeaderProps = {
  challengeId: string;
  title: string;
  isMine: boolean;
  onEdit: () => void;
  onDelete: () => void;
  startDate: Date;
  endDate: Date;
  totalDays: number;
  isFinished: boolean;
};

const ChallengeHeader = ({
  challengeId,
  title,
  isMine,
  onEdit,
  onDelete,
  startDate,
  endDate,
  totalDays,
  isFinished,
}: ChallengeHeaderProps) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const isLoading = useSelector(selectChallengeLoading);

  const handleFinish = async () => {
    try {
      await dispatch(finishChallenge(challengeId)).unwrap();
    } catch (error) {
      console.error('챌린지 종료 중 오류 발생:', error);
    }
  };

  const handleReopen = async () => {
    try {
      await dispatch(reopenChallenge(challengeId)).unwrap();
    } catch (error) {
      console.error('챌린지 재개 중 오류 발생:', error);
    }
  };

  return (
    <div className="flex flex-col items-start justify-between">
      <div className="flex flex-row-reverse items-start flex-wrap gap-2 w-full mb-4">
        {(isMine || user?.role === 'admin') && (
          <PostActionMenuWithAlert
            onEdit={isFinished ? undefined : onEdit}
            onDelete={onDelete}
            disableEdit={isFinished}
            alertTitle="삭제 확인"
            alertDescription="정말로 삭제하시겠습니까? 삭제된 내용은 복구할 수 없습니다."
            additionalItems={
              isFinished
                ? [
                    {
                      label: isLoading ? '재개 중...' : '다시 열기',
                      onClick: handleReopen,
                      isWithAlert: true,
                      alertTitle: '챌린지 재개',
                      alertDescription: '종료된 챌린지를 다시 여시겠습니까?',
                      alertConfirmText: '재개',
                    },
                  ]
                : [
                    {
                      label: isLoading ? '종료 중...' : '종료',
                      onClick: handleFinish,
                      isWithAlert: true,
                      alertTitle: '챌린지 종료',
                      alertDescription: '챌린지를 종료하시겠습니까?',
                      alertConfirmText: '종료',
                    },
                  ]
            }
          />
        )}
        <h1 className="flex-1 min-w-40 text-3xl font-bold">
          {isFinished && (
            <p>
              <Badge variant="options" className="mb-2">
                종료된 챌린지
              </Badge>
            </p>
          )}
          <span>{title}</span>
        </h1>
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
};

export default ChallengeHeader;
