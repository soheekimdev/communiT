import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import LikeButton from '../shared/LikeButton';
import CommentEdit from './CommentEdit';
import { deleteComment, UserComment } from '@/api/comment';
import { useAppSelector } from '@/RTK/hooks';
import ProfileImage from '../profile/ProfileImage';
import { fetchProfileImageURL } from '@/api/profileURL';
import { useToast } from '@/hooks/useToast';
import { useSelector } from 'react-redux';
import { RootState } from '@/RTK/store';

type CommentCardProps = {
  comment: UserComment;
  onDelete: (CommentId: string) => void;
};

const CommentCard: React.FC<CommentCardProps> = ({ comment, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { user, token } = useSelector((state: RootState) => state.auth);
  const isAdmin = useAppSelector(state => state.auth.user?.role === 'admin');
  const [author, setAuthor] = useState<{ username: string; profileImageUrl?: string } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (comment?.accountId) {
      fetchProfileImageURL(comment.accountId)
        .then(data => setAuthor(data))
        .catch(err => console.error(err));
    }
  }, [comment]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleUpdate = (updatedComment: { id: string; content: string }) => {
    comment.content = updatedComment.content;
    setIsEditing(false);
  };

  const handleDeleteClick = async () => {
    if (!token) return;

    const success = await deleteComment(comment.postId, comment.id, token);
    if (success) {
      onDelete(comment.id);
      toast({
        title: '댓글 삭제 완료',
        description: '댓글이 삭제되었습니다.',
      });
    } else {
      toast({
        title: '댓글 삭제 실패',
        description: '댓글 삭제 중 문제가 발생했습니다.',
      });
    }
  };

  const isOwnComment = user?.username === comment.accountUsername;

  return (
    <Card className="px-4 py-2 border-l-0 border-r-0 shadow-none rounded-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0">
        <div className="flex items-center">
          {author && <ProfileImage profileImageUrl={author.profileImageUrl} />}
          <p className="text-sm font-semibold">{comment.accountUsername}</p>
          <p className="text-xs text-gray-500 ml-2">
            {new Date(comment.createdAt).toLocaleString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
          <LikeButton initialLikes={comment.likeCount} />
        </div>
        {(isOwnComment || isAdmin) && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {isOwnComment && <DropdownMenuItem onClick={handleEditClick}>수정</DropdownMenuItem>}
              <DropdownMenuItem onClick={handleDeleteClick} className="text-red-600">
                삭제
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </CardHeader>
      <CardContent className="px-0 py-2">
        {isEditing ? (
          <CommentEdit comment={comment} onCancel={handleCancelEdit} onUpdate={handleUpdate} />
        ) : (
          <p className="break-words whitespace-pre-wrap">{comment.content}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default CommentCard;
