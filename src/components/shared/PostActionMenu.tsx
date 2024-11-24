import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';

type MenuItem = {
  label: string;
  onClick: () => void;
  className?: string;
};

type PostActionMenuProps = {
  onEdit?: () => void;
  onDelete?: () => void;
  disableEdit?: boolean;
  disableDelete?: boolean;
  additionalItems?: MenuItem[];
  align?: 'start' | 'end' | 'center';
};

const PostActionMenu = ({
  onEdit,
  onDelete,
  disableEdit = false,
  disableDelete = false,
  additionalItems = [],
  align = 'end',
}: PostActionMenuProps) => {
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
          <DropdownMenuItem onClick={onDelete} className="text-red-600 focus:text-red-600">
            삭제
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostActionMenu;
