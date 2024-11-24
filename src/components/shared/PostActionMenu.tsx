import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogTrigger,
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

type PostActionMenuWithAlertProps = {
  onEdit?: () => void;
  onDelete?: () => void;
  disableEdit?: boolean;
  disableDelete?: boolean;
  alertTitle?: string;
  alertDescription?: string;
  additionalItems?: { label: string; onClick: () => void; className?: string }[];
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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        {!disableEdit && onEdit && <DropdownMenuItem onClick={onEdit}>수정</DropdownMenuItem>}
        {additionalItems.map((item, index) => (
          <DropdownMenuItem
            key={`${item.label}-${index}`}
            onClick={item.onClick}
            className={item.className}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
        {!disableDelete && onDelete && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem
                onSelect={e => e.preventDefault()}
                className="text-red-600 focus:text-red-600"
              >
                삭제
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
                <AlertDialogDescription>{alertDescription}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>취소</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete}>삭제</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostActionMenuWithAlert;
