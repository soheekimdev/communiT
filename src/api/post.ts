import axios from 'axios';

const API_BASE_URL = 'https://ozadv6.beavercoding.net/api';

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

const POST_PER_PAGE = 6;

export const fetchPosts = async (
  page = 1,
  limit = POST_PER_PAGE,
): Promise<{ data: Post[]; meta: Meta }> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts?page=${page}&limit=${limit}`, {
      headers: {
        Accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching posts: ', error);
    throw error;
  }
};

export const createNewPost = async (title: string, content: string, token: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/posts`,
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
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Failed to create post:', error);
    throw error;
  }
};

export const fetchPostDetail = async (id: string): Promise<Post | null> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts/${id}`, {
      headers: { Accept: 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
};

export const deletePost = async (id: string, token: string): Promise<boolean> => {
  try {
    await axios.delete(`${API_BASE_URL}/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    return true;
  } catch (error) {
    console.error('Error deleting post:', error);
    return false;
  }
};

export const updatePost = async (id: string, updatedPost: Post, token: string) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/posts/${id}`, updatedPost, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    // 응답 상태가 200이면 성공
    if (response.status === 204) {
      return true;
    }

    // 응답 상태가 200이 아니면 실패 처리
    console.error('Unexpected response status:', response.status);
    return false;
  } catch (err) {
    // 에러 로깅
    console.error('Error updating post:', err);
    return false;
  }
};
