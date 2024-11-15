import axios from 'axios';

const API_BASE_URL = 'https://ozadv6.beavercoding.net/api';
const POST_PER_PAGE = 6;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { Accept: 'application/json' },
});

const handleApiError = (error: unknown, errorMessage: string) => {
  console.error(`${errorMessage}: `, error);
  throw error;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  accountUsername: string;
  accountId: string;
};

export type Meta = {
  total: number;
  page: number;
  limit: number;
  isLastPage: boolean;
};

export const fetchPosts = async (
  page = 1,
  limit = POST_PER_PAGE,
): Promise<{ data: Post[]; meta: Meta }> => {
  try {
    const response = await apiClient.get(`/posts`, { params: { page, limit } });
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error fetching posts');
    throw error;
  }
};

export const fetchPostDetail = async (id: string): Promise<Post | null> => {
  try {
    const response = await apiClient.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
};

export const createNewPost = async (title: string, content: string, token: string) => {
  try {
    const response = await apiClient.post(
      `/posts`,
      {
        title,
        content,
        contentType: 'markdown',
        externalLink: '',
        isDeleted: false,
        type: 'post',
        isCommentAllowed: true,
        isLikeAllowed: true,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  } catch (error) {
    handleApiError(error, 'Failed to create post');
  }
};

export const updatePost = async (id: string, updatedPost: Post, token: string) => {
  try {
    const response = await apiClient.patch(`/posts/${id}`, updatedPost, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.status === 204;
  } catch (error) {
    handleApiError(error, 'Error updating post');
  }
};

export const deletePost = async (id: string, token: string): Promise<boolean> => {
  try {
    await apiClient.delete(`/posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return true;
  } catch (error) {
    console.error('Error deleting post:', error);
    return false;
  }
};
