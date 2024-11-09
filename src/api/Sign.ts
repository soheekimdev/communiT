import axios from 'axios';

const accountsapi = axios.create({
  baseURL: `https://ozadv6.beavercoding.net/api/accounts/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const signinApi = async (email: string, password: string) => {
  const response = await accountsapi.post(`/sign-in`, { email, password });
  return response.data;
};
