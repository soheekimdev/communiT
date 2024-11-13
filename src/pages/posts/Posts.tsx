import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import PostPagination from '@/components/PostPagination';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: string;
  accountId: string;
};

type Meta = {
  total: number;
  page: number;
  limit: number;
  isLastPage: boolean;
};

const POST_PER_PAGE = 6;

const fetchPosts = async (
  page = 1,
  limit = POST_PER_PAGE,
): Promise<{ data: Post[]; meta: Meta }> => {
  try {
    const response = await axios.get(
      `https://ozadv6.beavercoding.net/api/posts?page=${page}&limit=${limit}`,
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching posts: ', error);
    throw error;
  }
};

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

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      try {
        const { data, meta } = await fetchPosts(currentPage, POST_PER_PAGE);
        setPosts(data);
        setPageCount(Math.ceil(meta.total / POST_PER_PAGE));
      } catch (error) {
        console.error('Failed to load posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, [currentPage]);

  const createNewPost = () => {
    navigate('/new-post');
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-6">커뮤니티 글 목록</h1>
        <Button onClick={createNewPost}>글 작성하기</Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
        {isLoading
          ? Array.from({ length: POST_PER_PAGE }).map((_, index) => <PostSkeleton key={index} />)
          : posts.map(post => (
              <Card key={post.id} className="overflow-hidden">
                <Link to={`/posts/detail/${post.id}`}>
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="truncate">{post.content}</p>
                  </CardContent>
                  <CardFooter className="text-sm text-muted-foreground">
                    <span>작성자: {post.author}</span> |{' '}
                    <time dateTime={post.createdAt}>
                      {new Date(post.createdAt).toLocaleString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
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

export default Posts;
