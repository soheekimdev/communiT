import axios from 'axios';

export type Comment = {
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
