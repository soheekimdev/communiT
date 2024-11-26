import type { DateRange } from 'react-day-picker';

type ChallengeType = 'self-check';

type Challenge = {
  id: string;
  title: string;
  description: string;
  type: ChallengeType;
  startDate: string;
  endDate: string;
  accountId: string;
  isDeleted: boolean;
  isPublished: boolean;
  isFinished: boolean;
  createdAt: string;
  updatedAt: string;
  accountUsername: string | null;
  likeCount: number;
  dislikeCount: number;
  pureLikeCount: number;
  challengeEventCount: number;
};

type ChallengeResponse = {
  data: Challenge[];
  meta: {
    total: number;
    page: number;
    limit: number;
    isLastPage: boolean;
  };
};

type ChallengeCardProps = {
  isMine: boolean;
  likeCount: number;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
};

type CreateChallengeRequest = {
  title: string;
  description: string;
  type: ChallengeType;
  startDate: string;
  endDate: string;
  isDeleted: boolean;
  isPublished: boolean;
  isFinished: boolean;
};

type ChallengeDetailState = {
  challenge: Challenge | null;
  author: {
    username: string;
    profileImageUrl?: string;
  } | null;
  isLoading: boolean;
  error: string | null;
};

type ChallengeFormData = {
  title: string;
  description: string;
  type: 'self-check';
  startDate: string;
  endDate: string;
  isDeleted: boolean;
  isPublished: boolean;
  isFinished: boolean;
};

type ChallengeFormState = {
  date: DateRange | undefined;
  isLoading: boolean;
  error: string | null;
};

type ChallengeFormProps = {
  isEditing?: boolean;
  initialData?: ChallengeFormData;
};

export type {
  Challenge,
  ChallengeResponse,
  ChallengeCardProps,
  CreateChallengeRequest,
  ChallengeDetailState,
  ChallengeFormData,
  ChallengeFormState,
  ChallengeFormProps,
};
