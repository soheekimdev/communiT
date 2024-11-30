import axios from 'axios';

const API_BASE_URL = 'https://ozadv6.beavercoding.net/api';
const POST_PER_PAGE = 20;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { Accept: 'application/json' },
});

export const fetchTag = async (page = 1, limit = POST_PER_PAGE) => {
  try {
    const response = await apiClient.get(`/tags`, { params: { page, limit, order: 'desc' } });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
