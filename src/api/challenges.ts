import instance from '@/api/axios';
import type {
  Challenge,
  ChallengeMember,
  ChallengeResponse,
  CreateChallengeRequest,
  UpdateChallengeRequest,
} from '@/types/challenge';
import { parseISO, startOfDay } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

const TIMEZONE = 'Asia/Seoul';

export const convertToAPIDate = (date: Date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
};

export const convertToLocalDate = (dateString: string) => {
  const date = parseISO(dateString);
  return toZonedTime(date, TIMEZONE);
};

export const createChallenge = async (data: CreateChallengeRequest) => {
  const response = await instance.post<Challenge>('api/challenges', data);
  return response.data;
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

export const isChallengePassed = (endDate: string) => {
  const today = startOfDay(new Date());
  const challengeEndDate = startOfDay(new Date(endDate));
  return challengeEndDate < today;
};

// TODO: API 테스트....
export const joinChallenge = async (id: string) => {
  const response = await instance.post(`api/challenges/${id}/member`);
  return response.data;
};

export const getChallengeMembers = async (challengeId: string): Promise<ChallengeMember[]> => {
  try {
    const response = await instance.get<ChallengeMember[]>(`api/challenges/${challengeId}/member`);
    return response.data || [];
  } catch (error) {
    console.error(`Failed to fetch members for challenge ${challengeId}:`, error);
    return [];
  }
};

export const isUserParticipating = (
  members: ChallengeMember[] | undefined,
  userId: string | undefined,
): boolean => {
  if (!members || !userId) {
    return false;
  }
  return members.some(member => member.id === userId);
};
