import { useState } from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import { UserComment } from '@/api/comment';

const CommentForm = () => {
  const [comments, setComments] = useState<UserComment[]>([]);

  const addComment = (newComment: UserComment) => {
    setComments(prevComments => [newComment, ...prevComments]);
  };

  const handleDeleteComment = (commentId: string) => {
    setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      <CommentList comments={comments} setComments={setComments} onDelete={handleDeleteComment} />
      <CommentInput addComment={addComment} />
    </div>
  );
};

export default CommentForm;
