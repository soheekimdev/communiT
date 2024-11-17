import { useParams } from 'react-router-dom';
import CommentCard from './CommentCard';
import { useEffect, useState } from 'react';
import { Comment, getComments } from '@/api/comment';
import { Skeleton } from '../ui/skeleton';
import { Card } from '../ui/card';

const CommentList = () => {
  const { id: postId } = useParams();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) return;

    const fetchComments = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getComments(postId, 1, 10);
        if (response.data && Array.isArray(response.data)) {
          setComments(response.data);
        } else {
          throw new Error('댓글 데이터 형식이 잘못되었습니다.');
        }
      } catch (err) {
        console.error(err);
        setError('댓글을 불러오는 중 문제가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (comments.length === 0) {
    return (
      <Card className="py-4 border-l-0 border-r-0 shadow-none rounded-none text-center">
        댓글이 없습니다. 첫 번째 댓글을 작성해 보세요!
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map(comment => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
