import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import PostPagination from '@/components/PostPagination';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import usePostForm from '@/hooks/usePosts';
import { useSelector } from 'react-redux';
import { RootState } from '@/RTK/store';
import ProfileImage from '@/components/profile/ProfileImage';
import { fetchProfileImageURL } from '@/api/profileURL';
import { Eye, MessageCircle } from 'lucide-react';

const POST_PER_PAGE = 6;

const PostSkeleton = () => (
  <Card className="overflow-hidden">
    <CardHeader>
      <Skeleton className="h-6 w-3/4" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3" />
    </CardContent>
    <CardFooter>
      <Skeleton className="h-4 w-1/2" />
    </CardFooter>
  </Card>
);
const Post = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { posts, meta, isLoading } = usePostForm(currentPage);
  const [userProfiles, setUserProfiles] = useState<{ [key: string]: string | null }>({});
  const [loadingProfiles, setLoadingProfiles] = useState<{ [key: string]: boolean }>({});
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const fetchMissingProfiles = async () => {
      if (!posts) return;

      const newProfilePromises = posts
        .filter(
          post => !userProfiles.hasOwnProperty(post.accountId) && !loadingProfiles[post.accountId],
        )
        .map(async post => {
          if (loadingProfiles[post.accountId]) return;

          setLoadingProfiles(prev => ({
            ...prev,
            [post.accountId]: true,
          }));

          try {
            const data = await fetchProfileImageURL(post.accountId);
            return { id: post.accountId, url: data.profileImageUrl };
          } catch (error) {
            console.error(`Failed to load profile for ${post.accountId}`);
            return { id: post.accountId, url: null };
          }
        });

      if (newProfilePromises.length > 0) {
        const results = await Promise.all(newProfilePromises);

        setUserProfiles(prev => {
          const updates = results.reduce((acc, result) => {
            if (result) {
              acc[result.id] = result.url;
            }
            return acc;
          }, {} as { [key: string]: string | null });

          return { ...prev, ...updates };
        });

        setLoadingProfiles(prev => {
          const updates = results.reduce((acc, result) => {
            if (result) {
              acc[result.id] = false;
            }
            return acc;
          }, {} as { [key: string]: boolean });

          return { ...prev, ...updates };
        });
      }
    };

    fetchMissingProfiles();
  }, [posts]);

  const createNewPost = () => {
    if (user) navigate('/new-post');
    else navigate('/sign-in');
  };

  const pageCount = meta ? Math.ceil(meta.total / POST_PER_PAGE) : 0;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">커뮤니티 글 목록</h1>
        <Button onClick={createNewPost}>글 작성하기</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
        {isLoading
          ? Array.from({ length: POST_PER_PAGE }).map((_, index) => <PostSkeleton key={index} />)
          : posts.map(post => (
              <Card key={post.id} className="overflow-hidden">
                <Link to={`/posts/detail/${post.id}`}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{post.title}</CardTitle>
                      <div className="flex gap-2">
                        <div className="flex  items-center text-sm text-muted-foreground">
                          <Eye className="w-4 h-4 mr-1" />
                          <span>{post.viewCount}</span>
                        </div>
                        <div className="flex  items-center text-sm text-muted-foreground">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          <span>{post.commentCount}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ReactMarkdown className="max-h-20 overflow-hidden text-sm text-muted-foreground">
                      {post.content}
                    </ReactMarkdown>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <ProfileImage profileImageUrl={userProfiles[post.accountId] || undefined} />
                      <span>{post.accountUsername || '익명의 사용자'}</span>
                    </div>
                    <time dateTime={post.createdAt}>
                      {new Date(post.createdAt).toLocaleString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </CardFooter>
                </Link>
              </Card>
            ))}
      </div>

      {pageCount > 1 && (
        <PostPagination
          pageCount={pageCount}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Post;
