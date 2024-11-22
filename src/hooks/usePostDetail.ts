import { useState, useEffect } from 'react';
import { fetchPostDetail, deletePost } from '@/api/post';
import { useNavigate } from 'react-router-dom';

const usePostDetail = (id: string | undefined, token: string | null) => {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchPostDetail(id)
        .then(data => {
          setPost(data);
          console.log(post);
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

  return { post, loading, error, success, handleDelete };
};

export default usePostDetail;
