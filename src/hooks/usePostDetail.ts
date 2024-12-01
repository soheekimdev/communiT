import { useState, useEffect } from 'react';
import { fetchPostDetail, deletePost } from '@/api/post';
import { useNavigate } from 'react-router-dom';

type Post = {
  id: string;
  title: string;
  content: string;
  accountId: string;
  pureLikeCount?: number;
  createdAt: string;
  [key: string]: any;
};

const usePostDetail = (id: string | undefined, token: string | null) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchPostDetail(id)
        .then((data: Post | null) => {
          if (data) {
            setPost(data);
            setLikeCount(data.pureLikeCount || 0);
          } else {
            setError('게시글 데이터를 불러오지 못했습니다.');
          }
          setLoading(false);
        })
        .catch(err => {
          setError('게시글을 불러오는 데 실패했습니다.');
          console.error(err);
          setLoading(false);
        });
    }
  }, [id]);

  const handleDelete = async (id: string) => {
    if (token && id) {
      try {
        const isDeleted = await deletePost(id, token);
        if (isDeleted) {
          setSuccess(true);
          setTimeout(() => {
            navigate('/posts');
          }, 2000);
        } else {
          setError('게시글 삭제에 실패했습니다.');
        }
      } catch (err) {
        console.error('Error deleting post:', err);
        setError('게시글 삭제 중 오류가 발생했습니다.');
      }
    } else {
      setError('로그인 상태가 아닙니다.');
    }
  };

  return { post, loading, error, setError, success, likeCount, setLikeCount, handleDelete };
};

export default usePostDetail;
