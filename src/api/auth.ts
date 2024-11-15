import axios from 'axios';

interface AuthResponse {
  account: {
    id: string;
    email: string;
    profileImageUrl: string;
    mainLanguage: string;
    nationality: string;
    bio: string;
    externalUrls: string[];
    isEmailVerified: boolean;
    isPrivate: boolean;
    role: string;
    username: string;
    birthday: string;
    createdAt: string;
    updatedAt: string;
  };
  accessToken: string;
  refreshToken: string;
}

const axiosInstance = axios.create({
  baseURL: 'https://ozadv6.beavercoding.net/api/accounts',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  signin: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/sign-in', { email, password });
    return response.data;
  },

  signup: async (
    email: string,
    password: string,
    confirmPassword: string,
    username: string,
  ): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/sign-up', {
      email,
      password,
      confirmPassword,
      username,
    });
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await axiosInstance.get('/me');
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('autoLogin');
  },
};

export const signinApi = authAPI.signin;
export const signupApi = authAPI.signup;
