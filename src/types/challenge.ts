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

// 새로 추가하는 타입
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

export type { Challenge, ChallengeResponse, ChallengeCardProps, CreateChallengeRequest };
