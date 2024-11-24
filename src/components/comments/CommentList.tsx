import { useParams } from 'react-router-dom';
import CommentCard from './CommentCard';
import { useEffect, useState } from 'react';
import { UserComment, getComments } from '@/api/comment';
import { Skeleton } from '../ui/skeleton';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

type CommentListProps = {
  comments: UserComment[];
  setComments: React.Dispatch<React.SetStateAction<UserComment[]>>;
  onDelete: (commentId: string) => void;
};

const CommentList = ({ comments, setComments, onDelete }: CommentListProps) => {
  const { id: postId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState<'latest' | 'oldest'>('oldest');

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
  }, [postId, setComments]);

  const handleSortChange = (order: 'latest' | 'oldest') => {
    setSort(order);
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (sort === 'latest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

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
    <div>
      <div className="flex justify-end mb-4 mr-4">
        <Button
          variant="ghost"
          className={`text-sm px-2 py-2 rounded hover:bg-white dark:hover:bg-black ${
            sort === 'oldest'
              ? 'text-black dark:text-white'
              : 'text-gray-400 dark:text-gray-500 dark:hover:text-gray-300'
          }`}
          onClick={() => handleSortChange('oldest')}
        >
          등록순
        </Button>
        <Button
          variant="ghost"
          className={`text-sm px-2 py-2 rounded hover:bg-white dark:hover:bg-black ${
            sort === 'latest'
              ? 'text-black dark:text-white'
              : 'text-gray-400 dark:text-gray-500 dark:hover:text-gray-300'
          }`}
          onClick={() => handleSortChange('latest')}
        >
          최신순
        </Button>
      </div>

      <div className="space-y-4">
        {sortedComments.map(comment => (
          <CommentCard key={comment.id} comment={comment} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};

export default CommentList;
