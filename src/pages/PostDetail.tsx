import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
    return <p>로딩 중입니다...</p>;
  }

  if (!post) {
    return <p>게시글을 찾을 수 없습니다.</p>;
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700">{post.content}</p>
      <footer className="text-sm text-muted-foreground">
        {/* ToDo: post.author 받아오기  */}
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
      </footer>
    </div>
  );
};
export default PostDetail;
