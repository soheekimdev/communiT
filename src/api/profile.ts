import axios from 'axios';

const API_BASE_URL = 'https://ozadv6.beavercoding.net/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});

const setAuthHeader = (token: string) => ({
  Authorization: `Bearer ${token}`,
});

const apiPostRequest = async (url: string, data: FormData, token: string) => {
  try {
    const response = await apiClient.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
        accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || 'Unknown error occurred';
      throw new Error(`POST request failed: ${message}`);
    }
    throw new Error('Unexpected error occurred');
  }
};

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

export const uploadFile = async (file: File, type: string, id: string, token: string) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);
  formData.append('id', id);

  const filename = file.name.split('.').slice(0, -1).join('.');
  const extension = file.name.split('.').pop() || '';

  formData.append('filename', filename);
  formData.append('extension', extension);
  formData.append('sizeInKb', Math.ceil(file.size / 1024).toString());

  const getDimensions = (file: File): Promise<{ width: number; height: number }> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve({ width: img.width, height: img.height });
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });

  try {
    const { width, height } = await getDimensions(file);
    formData.append('width', width.toString());
    formData.append('height', height.toString());
  } catch {
    formData.append('width', '200');
    formData.append('height', '200');
  }

  return apiPostRequest('/files/upload', formData, token);
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
