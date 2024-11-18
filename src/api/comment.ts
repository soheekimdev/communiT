import axios from 'axios';

export type UserComment = {
  id: string;
  postId: string;
  accountId: string;
  content: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  pureLikeCount: number;
  accountUsername: string;
};

const BASE_URL = 'https://ozadv6.beavercoding.net/api/posts';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { Accept: 'application/json' },
});

export const getComments = async (postId: string, page: number, limit: number) => {
  const response = await apiClient.get(`${postId}/comments`, {
    params: { page, limit },
  });
  return response.data;
};

export const createNewComment = async (postId: string, content: string, token: string) => {
  try {
    const response = await apiClient.post(
      `${postId}/comments`,
      {
        postId,
        content,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Failed to create coment: ', error);
    return null;
  }
};

export const deleteComment = async (postId: string, id: string, token: string) => {
  try {
    await apiClient.delete(`/${postId}/comments/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return true;
  } catch (error) {
    console.error('Error deleting comment: ', error);
    return false;
  }
};

export const updateComment = async (postId: string, id: string, token: string, content: string) => {
  try {
    const response = await apiClient.patch(
      `/${postId}/comments/${id}`,
      { content },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.status === 200;
  } catch (error) {
    console.error('Error updating comment: ', error);
    return false;
  }
};
