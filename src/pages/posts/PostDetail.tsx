import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { CalendarIcon, ThumbsUp, MessageCircle, Eye, ExternalLink } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/RTK/store';
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
import ActionFeedback from '@/components/shared/ActionFeedback';
import { likePost, unlikePost } from '@/api/post';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?.id;
  const token = localStorage.getItem('accessToken');
  const { post, loading, likeCount, setLikeCount, error, setError, success, handleDelete } =
    usePostDetail(id, token);
  const [author, setAuthor] = useState<{ username: string; profileImageUrl?: string } | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (post?.accountId) {
      fetchProfileImageURL(post.accountId)
        .then(data => setAuthor(data))
        .catch(err => console.error(err));
    }
    if (post) {
      setIsLiked(post.isLikedByUser);
      setLikeCount(post.pureLikeCount || 0);
    }
  }, [post]);

  const handleLikeToggle = async () => {
    if (!post || !token) {
      setError('로그인이 필요합니다.');
      return;
    }

    try {
      if (isLiked) {
        await unlikePost(post.id, token);
        setIsLiked(false);
        setLikeCount(prev => Math.max(0, prev - 1));
      } else {
        try {
          await likePost(post.id, token);
          setIsLiked(true);
          setLikeCount(prev => prev + 1);
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 409) {
            await unlikePost(post.id, token);
            setIsLiked(false);
            setLikeCount(prev => Math.max(0, prev - 1));
          }
        }
      }
    } catch (error) {
      console.error('좋아요 토글 중 오류 발생:', error);
      setError('좋아요/취소 중 오류가 발생했습니다.');
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

  if (!post) return <ErrorAlert message="게시글을 찾을 수 없습니다." />;

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <ActionFeedback
        error={error}
        success={success}
        successTitle="성공"
        successMessage="게시글이 성공적으로 삭제되었습니다. 곧 목록 페이지로 이동합니다."
      />

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
          {post.externalLink && (
            <div className="mt-6">
              <a
                href={
                  post.externalLink.startsWith('http')
                    ? post.externalLink
                    : `https://${post.externalLink}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="truncate max-w-[200px]">{post.externalLink}</span>
              </a>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{post.viewCount}</span>
            </Badge>
            <Badge
              variant="outline"
              className="flex items-center gap-1 cursor-pointer"
              onClick={handleLikeToggle}
            >
              <ThumbsUp className="h-4 w-4" />
              <span>{likeCount}</span>
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
