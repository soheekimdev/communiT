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
import usePostForm from '@/hooks/usePostForm';
import MarkdownCheckbox from '@/components/post/MarkdownCheckbox';

const UpdatePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [isMarkdown, setIsMarkdown] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const { user, token } = useSelector((state: RootState) => state.auth);

  const { values, error, handleChange, validate } = usePostForm({
    title: '',
    content: '',
    externalLink: '',
  });

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetchPostDetail(id)
        .then(data => {
          if (data) {
            if (data.accountId === user?.id) {
              setPost(data);
              values.title = data.title;
              values.content = data.content;
              values.externalLink = data.externalLink || '';
              setIsMarkdown(data.contentType === 'markdown');
            } else {
              setAlertMessage('권한이 없습니다.');
              setShowAlert(true);
            }
          } else {
            setAlertMessage('게시글을 불러오는 데 실패했습니다.');
            setShowAlert(true);
          }
        })
        .catch(err => {
          console.error(err);
          setAlertMessage('게시글을 불러오는 데 실패했습니다.');
          setShowAlert(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [id, user?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    if (!token) {
      setAlertMessage('로그인 상태여야 게시물을 수정할 수 있습니다.');
      setShowAlert(true);
      return;
    }

    if (id && post && token) {
      try {
        const updatedPost: Post = {
          ...post,
          title: values.title as string,
          content: values.content as string,
          contentType: isMarkdown ? 'markdown' : 'string',
          externalLink: values.externalLink as string,
        };
        const isUpdated = await updatePost(id, updatedPost, token);
        if (isUpdated) {
          navigate(`/posts/detail/${id}`);
        } else {
          setAlertMessage('게시글 수정에 실패했습니다.');
          setShowAlert(true);
        }
      } catch (err) {
        setAlertMessage('게시글 수정 중 오류가 발생했습니다.');
        setShowAlert(true);
      }
    } else {
      setAlertMessage('게시글 수정에 실패했습니다.');
      setShowAlert(true);
    }
  };

  if (isLoading) {
    return <div className="text-center">로딩 중...</div>;
  }

  const handleCancel = () => {
    values.title = '';
    values.content = '';
    values.externalLink = '';
    navigate(-1);
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-3xl font-bold">게시글 수정</CardTitle>
            <MarkdownCheckbox isMarkdown={isMarkdown} setIsMarkdown={setIsMarkdown} />
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {showAlert && <div className="text-red-500">{alertMessage}</div>}
            {error && <div className="text-red-500">{error}</div>}
            <div className="space-y-2">
              <Label htmlFor="title">제목</Label>
              <Input
                id="title"
                name="title"
                value={values.title as string}
                onChange={handleChange}
                placeholder="게시물 제목을 입력하세요 (4자 이상)"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">내용</Label>
              <Textarea
                id="content"
                name="content"
                value={values.content as string}
                onChange={handleChange}
                placeholder="게시물 내용을 입력하세요"
                required
                className="min-h-[200px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="externalLink">추가 URL</Label>
              <Input
                id="externalLink"
                name="externalLink"
                value={values.externalLink || ''}
                onChange={handleChange}
                placeholder="www.google.com"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button type="submit" className="mt-4">
              수정 완료
            </Button>
            <Button className="mt-4" onClick={handleCancel}>
              취소
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default UpdatePost;
