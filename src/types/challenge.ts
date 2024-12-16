import type { DateRange } from 'react-day-picker';

type ChallengeType = 'self-check';

type Challenge = {
  id: string;
  title: string;
  description: string;
  challengeImageUrl: string;
  type: ChallengeType;
  startDate: string;
  endDate: string;
  accountId: string;
  isDeleted: boolean;
  isPublished: boolean;
  isFinished: boolean;
  createdAt: string;
  updatedAt: string;
  accountUsername: string;
  likeCount: number;
  dislikeCount: number;
  pureLikeCount: number;
  controversialCount: number;
  challengeEventCount: number;
  challengeParticipantCount: number;
  challengeEventCheckedParticipantsFraction: number;
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
  id: string;
  isMine: boolean;
  likeCount: number;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  isDeleted: boolean;
  isPublished: boolean;
  isFinished: boolean;
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

type UpdateChallengeRequest = Partial<CreateChallengeRequest>;

type ChallengeFormData = {
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

type ChallengeFormState = {
  date: DateRange | undefined;
  isLoading: boolean;
  error: string | null;
};

type ChallengeFormProps = {
  isEditing?: boolean;
};

type ChallengeMember = {
  id: string;
  email: string;
  username: string;
  profileImageUrl: string | null;
  isEmailVerified: boolean;
  isPrivate: boolean;
  role: string;
};

export type {
  Challenge,
  ChallengeResponse,
  ChallengeCardProps,
  CreateChallengeRequest,
  UpdateChallengeRequest,
  ChallengeDetailState,
  ChallengeFormData,
  ChallengeFormState,
  ChallengeFormProps,
  ChallengeMember,
};
