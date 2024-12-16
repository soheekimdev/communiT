import axios from 'axios';
import instance from '@/api/axios';
import type {
  Challenge,
  ChallengeMember,
  ChallengeParticipant,
  ChallengeResponse,
  CreateChallengeRequest,
  UpdateChallengeRequest,
} from '@/types/challenge';
import { parseISO, format, startOfDay } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

const TIMEZONE = 'Asia/Seoul';

export const convertToAPIDate = (date: Date) => {
  const localMidnight = new Date(date);
  localMidnight.setHours(0, 0, 0, 0);

  const utcDate = new Date(localMidnight.getTime() - 9 * 60 * 60 * 1000);
  return utcDate.toISOString();
};

export const convertToLocalDate = (dateString: string) => {
  const utcDate = parseISO(dateString);
  return toZonedTime(utcDate, TIMEZONE);
};

export const formatDisplayDate = (date: Date) => {
  return format(date, 'yyyy.MM.dd');
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

export const joinChallenge = async (challengeId: string): Promise<ChallengeParticipant> => {
  try {
    const response = await instance.post<ChallengeParticipant>(
      `api/challenges/${challengeId}/member`,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 409) {
        throw new Error('이미 참여 중인 챌린지입니다.');
      }
    }
    throw new Error('챌린지 참여에 실패했습니다.');
  }
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
