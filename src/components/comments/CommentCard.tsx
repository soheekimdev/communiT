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
import LikeButton from '../LikeButton';
import CommentEdit from './CommentEdit';
import { UserComment } from '@/api/comment';
import { useAppSelector } from '@/RTK/hooks';
import ProfileImage from '../profile/ProfileImage';
import { fetchProfileImageURL } from '@/api/profileURL';

type CommentCardProps = {
  comment: UserComment;
};

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const user = useAppSelector(state => state.auth.user);
  const [author, setAuthor] = useState<{ username: string; profileImageUrl?: string } | null>(null);

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

  const isOwnComment = user?.username === comment.accountUsername;

  return (
    <Card className="px-4 py-2 border-l-0 border-r-0 shadow-none rounded-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0">
        <div className="flex items-center">
          {author && <ProfileImage profileImageUrl={author.profileImageUrl} />}
          <p className="text-sm font-semibold">{comment.accountUsername}</p>
          <p className="text-xs text-gray-500 ml-2">
            {new Date(comment.createdAt).toLocaleString()}
          </p>
          <LikeButton initialLikes={comment.likeCount} />
        </div>
        {isOwnComment && (
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
        )}
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
