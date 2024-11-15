import { useEffect, useState } from 'react';
import { Post, fetchPosts } from '@/api/post';

const POST_PER_PAGE = 6;

const usePosts = (currentPage: number) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [meta, setMeta] = useState<{ total: number; page: number } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      try {
        const { data, meta } = await fetchPosts(currentPage, POST_PER_PAGE);
        setPosts(data);
        setMeta(meta);
      } catch (error) {
        console.error('Failed to load posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, [currentPage]);

  return { posts, meta, isLoading };
};

export default usePosts;
