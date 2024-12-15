import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, MessageCircle } from 'lucide-react';

const fetchMostViewedPost = async () => {
  const response = await axios.get(
    'https://ozadv6.beavercoding.net/api/posts?page=1&limit=2&sortBy=viewCount&order=desc',
  );
  console.log(response);
  return response.data;
};

const HomePost = () => {
  const [mostViewedPosts, setMostViewedPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMostViewedPost = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMostViewedPost();
        setMostViewedPosts(data.data);
      } catch (error) {
        console.error('조회수가 가장 높은 글 로드 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMostViewedPost();
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold col-span-full">인기 게시물</h1>

      {isLoading ? (
        <p>로딩 중...</p>
      ) : mostViewedPosts.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {mostViewedPosts.map(post => (
            <Card key={post.id} className="w-full">
              <Link to={`/posts/detail/${post.id}`}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{post.title}</CardTitle>
                    <div className="flex gap-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Eye className="w-4 h-4 mr-1" />
                        <span>{post.viewCount}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        <span>{post.commentCount}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{post.content}</p>
                </CardContent>
                <CardFooter className="flex justify-end text-sm text-muted-foreground">
                  <div>{post.accountUsername || '익명의 사용자'}</div>
                </CardFooter>
              </Link>
            </Card>
          ))}
        </div>
      ) : (
        <p>조회수가 높은 글이 없습니다.</p>
      )}
    </div>
  );
};

export default HomePost;
