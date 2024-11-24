import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { CalendarIcon, AlertCircle, ThumbsUp, MessageCircle, Eye } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/RTK/store';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import ReactMarkdown from 'react-markdown';
import usePostDetail from '@/hooks/usePostDetail';
import ErrorAlert from '@/components/post/ErrorAlert';
import { fetchProfileImageURL } from '@/api/profileURL';
import ProfileImage from '@/components/profile/ProfileImage';
import { useEffect, useState } from 'react';
import CommentForm from '@/components/comments/CommentForm';
import BackButton from '@/components/shared/BackButton';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Time from '@/components/shared/Time';
import PostActionMenu from '@/components/shared/PostActionMenu';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?.id;
  const token = localStorage.getItem('accessToken');
  const { post, loading, error, success, handleDelete } = usePostDetail(id, token);
  const [author, setAuthor] = useState<{ username: string; profileImageUrl?: string } | null>(null);

  useEffect(() => {
    if (post?.accountId) {
      fetchProfileImageURL(post.accountId)
        .then(data => setAuthor(data))
        .catch(err => console.error(err));
    }
  }, [post]);

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

  if (!post) return <ErrorAlert message="게시글을 찾을 수 없습니다." />;

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>오류</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert variant="default" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>성공</AlertTitle>
          <AlertDescription>
            게시글이 성공적으로 삭제되었습니다. 곧 목록 페이지로 이동합니다.
          </AlertDescription>
        </Alert>
      )}
      <div className="mb-4">
        <BackButton />
      </div>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-3xl font-bold mb-2">{post.title}</CardTitle>
              <div className="flex items-center text-sm text-muted-foreground">
                <ProfileImage profileImageUrl={author?.profileImageUrl} className="w-6 h-6 mr-2" />
                <span className="mr-2">{post.accountUsername}</span>
                <Separator orientation="vertical" className="h-4 mx-2" />
                <CalendarIcon className="mr-1 h-4 w-4" />
                <Time time={post.createdAt} showTime />
              </div>
            </div>
            {(userId === post.accountId || user?.role === 'admin') && (
              <PostActionMenu
                onEdit={() => navigate(`/posts/update/${id}`)}
                onDelete={() => id && handleDelete(id)}
                alertTitle="게시글 삭제"
                alertDescription="정말로 게시글을 삭제하시겠습니까? 삭제된 후에는 복구할 수 없습니다."
              />
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            {post.contentType === 'markdown' ? (
              <ReactMarkdown>{post.content}</ReactMarkdown>
            ) : (
              <p>{post.content}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{post.viewCount}</span>
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <ThumbsUp className="h-4 w-4" />
              <span>{post.pureLikeCount}</span>
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>{post.commentCount}</span>
            </Badge>
          </div>
        </CardFooter>
      </Card>
      <CommentForm />
    </div>
  );
};

export default PostDetail;
