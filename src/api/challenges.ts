import instance from '@/api/axios';
import type {
  Challenge,
  ChallengeResponse,
  CreateChallengeRequest,
  UpdateChallengeRequest,
} from '@/types/challenge';

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const createChallenge = async (data: CreateChallengeRequest) => {
  let lastError;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const response = await instance.post<Challenge>('api/challenges', data);
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
  const response = await instance.get<ChallengeResponse>('api/challenges', {
    params: {
      page,
      limit,
    },
  });

  // API 응답에서 삭제되지 않은 챌린지만 필터링 (삭제 예정)
  response.data.data = response.data.data.filter(challenge => !challenge.isDeleted);

  return response.data;
};

export const getChallenge = async (id: string) => {
  const response = await instance.get<Challenge>(`api/challenges/${id}`);
  return response.data;
};

export const updateChallenge = async (id: string, data: UpdateChallengeRequest) => {
  const response = await instance.patch<Challenge>(`api/challenges/${id}`, data);
  return response.data;
};

export const deleteChallenge = async (id: string) => {
  await instance.delete(`api/challenges/${id}`);
};
