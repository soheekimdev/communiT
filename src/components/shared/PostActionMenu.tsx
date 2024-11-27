import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { MoreVertical } from 'lucide-react';

type AdditionalItem = {
  label: string;
  onClick: () => void;
  isWithAlert?: boolean;
  alertTitle?: string;
  alertDescription?: string;
  alertConfirmText?: string;
  alertCancelText?: string;
  className?: string;
};

type PostActionMenuWithAlertProps = {
  onEdit?: () => void;
  onDelete?: () => void;
  disableEdit?: boolean;
  disableDelete?: boolean;
  alertTitle?: string;
  alertDescription?: string;
  additionalItems?: AdditionalItem[];
  align?: 'start' | 'end' | 'center';
};

const PostActionMenuWithAlert = ({
  onEdit,
  onDelete,
  disableEdit = false,
  disableDelete = false,
  alertTitle = '삭제 확인',
  alertDescription = '정말로 삭제하시겠습니까? 삭제된 내용은 복구할 수 없습니다.',
  additionalItems = [],
  align = 'end',
}: PostActionMenuWithAlertProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openAlerts, setOpenAlerts] = useState<{ [key: string]: boolean }>({});

  const handleAlertOpen = (index: number) => {
    setOpenAlerts(prev => ({ ...prev, [index]: true }));
    setIsDropdownOpen(false);
  };

  const handleAlertClose = (index: number) => {
    setOpenAlerts(prev => ({ ...prev, [index]: false }));
  };

  const handleAction = async (item: AdditionalItem, index: number) => {
    await item.onClick();
    handleAlertClose(index);
  };

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={align}>
          {!disableEdit && onEdit && <DropdownMenuItem onClick={onEdit}>수정</DropdownMenuItem>}

          {additionalItems.map((item, index) =>
            item.isWithAlert ? (
              <DropdownMenuItem
                key={`${item.label}-${index}`}
                onSelect={() => handleAlertOpen(index)}
                className={item.className}
              >
                {item.label}
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                key={`${item.label}-${index}`}
                onClick={item.onClick}
                className={item.className}
              >
                {item.label}
              </DropdownMenuItem>
            ),
          )}

          {!disableDelete && onDelete && (
            <DropdownMenuItem
              className="text-red-600 focus:text-red-600"
              onSelect={() => handleAlertOpen(-1)} // 삭제 알림용 특별 인덱스
            >
              삭제
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 추가 항목들의 AlertDialog */}
      {additionalItems.map((item, index) =>
        item.isWithAlert ? (
          <AlertDialog
            key={`alert-${index}`}
            open={openAlerts[index]}
            onOpenChange={open => !open && handleAlertClose(index)}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{item.alertTitle}</AlertDialogTitle>
                <AlertDialogDescription>{item.alertDescription}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => handleAlertClose(index)}>
                  {item.alertCancelText || '취소'}
                </AlertDialogCancel>
                <AlertDialogAction onClick={() => handleAction(item, index)}>
                  {item.alertConfirmText || '확인'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : null,
      )}

      {/* 삭제용 AlertDialog */}
      {!disableDelete && onDelete && (
        <AlertDialog open={openAlerts[-1]} onOpenChange={open => !open && handleAlertClose(-1)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
              <AlertDialogDescription>{alertDescription}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => handleAlertClose(-1)}>취소</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  onDelete();
                  handleAlertClose(-1);
                }}
              >
                삭제
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};

export default PostActionMenuWithAlert;
