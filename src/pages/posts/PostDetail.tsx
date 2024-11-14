import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { CalendarIcon, UserIcon, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Post, deletePost, fetchPostDetail } from '@/api/post';
import { useSelector } from 'react-redux';
import { RootState } from '@/RTK/store';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import ReactMarkdown from 'react-markdown';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?.id;
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    if (id) {
      fetchPostDetail(id)
        .then(data => {
          setPost(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setError('게시글을 불러오는 데 실패했습니다.');
          setLoading(false);
        });
    }
  }, [id]);

  const handleDelete = async () => {
    if (id && token) {
      try {
        const isDeleted = await deletePost(id, token);
        if (isDeleted) {
          setShowSuccessAlert(true);
          setTimeout(() => {
            navigate('/posts');
          }, 2000);
        } else {
          setError('게시글 삭제에 실패했습니다.');
        }
      } catch (err) {
        setError('게시글 삭제 중 오류가 발생했습니다.');
      }
    } else {
      setError('삭제할 게시글 정보가 없거나, 로그인 상태가 아닙니다.');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 max-w-2xl">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-4 w-1/3" />
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto p-4 max-w-2xl text-center">
        <Card>
          <CardContent className="pt-6">
            <p className="text-xl text-muted-foreground">게시글을 찾을 수 없습니다.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>오류</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {showSuccessAlert && (
        <Alert variant="default" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>성공</AlertTitle>
          <AlertDescription>
            게시글이 성공적으로 삭제되었습니다. 곧 목록 페이지로 이동합니다.
          </AlertDescription>
        </Alert>
      )}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl font-bold">{post.title}</CardTitle>
            {userId === post.accountId ? (
              <div>
                <Button className="mr-2" onClick={() => navigate(`/posts/update/${id}`)}>
                  수정
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button>삭제</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>게시글 삭제</AlertDialogTitle>
                      <AlertDialogDescription>
                        정말로 게시글을 삭제하시겠습니까? 삭제된 후에는 복구할 수 없습니다.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>취소</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete}>삭제</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ) : null}
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <ReactMarkdown className="text-gray-700 whitespace-pre-wrap">
              {post.content}
            </ReactMarkdown>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-muted-foreground">
          <div className="flex items-center mb-2 sm:mb-0">
            <UserIcon className="mr-2 h-4 w-4" />
            <span>작성자: {post.accountUsername}</span>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <time dateTime={post.createdAt}>
              {new Date(post.createdAt).toLocaleString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </time>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PostDetail;
