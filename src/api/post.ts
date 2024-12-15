import axios from 'axios';

const API_BASE_URL = 'https://ozadv6.beavercoding.net/api';
const POST_PER_PAGE = 6;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { Accept: 'application/json' },
});

const handleApiError = (error: unknown, errorMessage: string) => {
  if (axios.isAxiosError(error)) {
    console.error(`${errorMessage}:`, error.response?.data || error.message);
  } else {
    console.error(`${errorMessage}:`, error);
  }
  throw error;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  accountId: string;
  accountUsername: string;
  isLikedByUser: boolean;
  pureLikeCount?: number;
  createdAt: string;
  contentType?: 'markdown' | 'string';
  externalLink?: string;
  viewCount?: number;
  commentCount?: number;
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
    const response = await apiClient.get(`/posts`, { params: { page, limit, type: 'post' } });
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error fetching posts');
    throw error;
  }
};

export const fetchPostDetail = async (id: string): Promise<Post | null> => {
  try {
    const response = await apiClient.get(`/posts/${id}`);
    const data = response.data;

    return {
      id: data.id,
      title: data.title,
      content: data.content,
      accountId: data.accountId,
      accountUsername: data.accountUsername || 'Unknown',
      isLikedByUser: data.isLikedByUser || false,
      pureLikeCount: data.pureLikeCount || 0,
      createdAt: data.createdAt,
      contentType: data.contentType || 'string',
      externalLink: data.externalLink || '',
      viewCount: data.viewCount || 0,
      commentCount: data.commentCount || 0,
    };
  } catch (error) {
    handleApiError(error, 'Error fetching post detail');
    return null;
  }
};

export const createNewPost = async (
  title: string,
  content: string,
  contentType: string,
  externalLink: string,
  token: string,
) => {
  try {
    const response = await apiClient.post(
      `/posts`,
      {
        title,
        content,
        contentType,
        externalLink,
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

export const updatePost = async (
  id: string,
  updatedPost: Partial<Post>,
  token: string,
): Promise<boolean> => {
  try {
    const response = await apiClient.patch(`/posts/${id}`, updatedPost, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.status === 200;
  } catch (error) {
    handleApiError(error, 'Error updating post');
    return false;
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

export const likePost = async (postId: string, token: string) => {
  try {
    const response = await apiClient.post(
      `/posts/${postId}/like`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error liking post');
    return false;
  }
};

export const unlikePost = async (postId: string, token: string) => {
  try {
    const response = await apiClient.delete(`/posts/${postId}/like`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error unliking post');
    return false;
  }
};
