import { z } from 'zod';

export const challengeFormSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요'),
  description: z.string().min(1, '설명을 입력해주세요'),
  type: z.literal('self-check'),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  isDeleted: z.boolean(),
  isPublished: z.boolean(),
  isFinished: z.boolean(),
});

export type ChallengeFormValues = z.infer<typeof challengeFormSchema>;
export type UpdateableFields = Partial<ChallengeFormValues>;
