import axios from 'axios';
import type { Challenge, ChallengeResponse, CreateChallengeRequest } from '@/types/challenge';

const API_BASE_URL = 'https://ozadv6.beavercoding.net/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const createChallenge = async (data: CreateChallengeRequest) => {
  let lastError;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const response = await axiosInstance.post<Challenge>('/challenges', data);
      return response.data;
    } catch (error) {
      console.log(`시도 ${attempt + 1}/${MAX_RETRIES} 실패:`, error);
      lastError = error;

      if (attempt < MAX_RETRIES - 1) {
        await sleep(RETRY_DELAY);
      }
    }
  }

  throw lastError;
};

export const getChallenges = async (page: number = 1, limit: number = 20) => {
  const response = await axiosInstance.get<ChallengeResponse>('/challenges', {
    params: {
      page,
      limit,
    },
  });
  return response.data;
};
