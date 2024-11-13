import z from 'zod';

export const bioSchema = z.object({
  bio: z
    .string()
    .trim()
    .min(10, '10자 이상 입력해주세요.')
    .max(50, '자기소개는 50자까지 입력가능합니다.'),
});

export type BioFormData = z.infer<typeof bioSchema>;
