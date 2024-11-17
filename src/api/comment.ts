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

export const getComments = async (postId: string, page: number, limit: number) => {
  const response = await axios.get(`${BASE_URL}/${postId}/comments`, {
    params: { page, limit },
  });
  return response.data;
};
