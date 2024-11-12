import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { CalendarIcon, UserIcon } from 'lucide-react';

type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
};

const fetchPostById = async (id: string): Promise<Post | null> => {
  try {
    const response = await axios.get(`https://ozadv6.beavercoding.net/api/posts/${id}`, {
      headers: { Accept: 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
};

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPostById(id).then(data => {
        setPost(data);
        setLoading(false);
      });
    }
  }, [id]);

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
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-muted-foreground">
          <div className="flex items-center mb-2 sm:mb-0">
            <UserIcon className="mr-2 h-4 w-4" />
            <span>작성자: {post.author}</span>
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
