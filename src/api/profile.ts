import axios from 'axios';

const API_BASE_URL = 'https://ozadv6.beavercoding.net/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});

const setAuthHeader = (token: string) => ({
  Authorization: `Bearer ${token}`,
});

const apiPatchRequest = async (url: string, data: object, token: string) => {
  try {
    const response = await apiClient.patch(url, data, {
      headers: setAuthHeader(token),
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateNickname = (id: string, username: string, token: string) => {
  return apiPatchRequest(`/accounts/${id}`, { username }, token);
};

export const updateProfileImg = (id: string, profileImageUrl: string, token: string) => {
  return apiPatchRequest(`/accounts/${id}`, { profileImageUrl }, token);
};

export const updateBio = (id: string, bio: string, token: string) => {
  return apiPatchRequest(`/accounts/${id}`, { bio }, token);
};

export const updatePrivate = (id: string, isPrivate: boolean, token: string) => {
  return apiPatchRequest(`/accounts/${id}`, { isPrivate }, token);
};
