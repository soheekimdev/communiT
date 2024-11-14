import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import LikeButton from '../LikeButton';
import CommentEdit from './CommentEdit';

type Comment = {
  id: string;
  content: string;
  createdAt: string;
  likeCount: number;
  dislikeCount: number;
  accountUsername: string;
};

interface CommentCardProps {
  comment: Comment;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태 추가

  const handleEditClick = () => {
    setIsEditing(true); // 수정 모드 활성화
  };

  const handleCancelEdit = () => {
    setIsEditing(false); // 수정 모드 비활성화
  };

  return (
    <Card className="px-4 py-2 border-l-0 border-r-0 shadow-none rounded-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-semibold">{comment.accountUsername}</p>
          <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
          <LikeButton initialLikes={comment.likeCount} />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleEditClick}>수정</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">삭제</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="px-0 py-2">
        {isEditing ? (
          <CommentEdit comment={comment} onCancel={handleCancelEdit} />
        ) : (
          <p>{comment.content}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default CommentCard;
