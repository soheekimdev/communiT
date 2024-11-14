import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Post, fetchPostDetail, updatePost } from '@/api/post';
import { useSelector } from 'react-redux';
import { RootState } from '@/RTK/store';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const UpdatePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const user = useSelector((state: RootState) => state.auth.user);
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    if (id) {
      setIsLoading(true); // Start loading
      fetchPostDetail(id)
        .then(data => {
          if (data) {
            if (data.accountId === user?.id) {
              setPost(data);
              setTitle(data.title);
              setContent(data.content);
            } else {
              setError('권한이 없습니다.');
            }
          } else {
            setError('게시글을 불러오는 데 실패했습니다.');
          }
        })
        .catch(err => {
          console.error(err);
          setError('게시글을 불러오는 데 실패했습니다.');
        })
        .finally(() => {
          setIsLoading(false); // End loading
        });
    }
  }, [id, user?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || title.length < 4) {
      setError('제목은 4자 이상이어야 합니다.');
      return;
    }

    if (!content) {
      setError('내용을 입력해야 합니다.');
      return;
    }

    if (id && post && token) {
      try {
        const updatedPost = { ...post, title, content };
        const isUpdated = await updatePost(id, updatedPost, token); // 토큰을 함께 전달
        if (isUpdated) {
          navigate(`/posts/detail/${id}`);
        } else {
          setError('게시글 수정에 실패했습니다.');
        }
      } catch (err) {
        setError('게시글 수정 중 오류가 발생했습니다.');
      }
    } else {
      setError('로그인 상태여야 게시물을 수정할 수 있습니다.');
    }
  };

  if (isLoading) {
    return <div className="text-center">로딩 중...</div>; // Loading indicator
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">게시글 수정</CardTitle>
        </CardHeader>
        {post && (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">제목</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="게시물 제목을 입력하세요 (4자 이상)"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">내용</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="게시물 내용을 입력하세요"
                  required
                  className="min-h-[200px]"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button type="submit" className="mt-4">
                수정 완료
              </Button>
              <Button className="mt-4" onClick={() => navigate(-1)}>
                취소
              </Button>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
};

export default UpdatePost;
