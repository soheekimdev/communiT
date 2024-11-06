import z from 'zod';

export const nicknameSchema = z.object({
  nickname: z
    .string()
    .trim()
    .nonempty('이름을 입력해 주세요.')
    .regex(
      /^[a-zA-Z0-9가-힣]*$/,
      '공백, 특수 문자, 그리고 자음이나 모음만으로 이루어진 한글은 사용할 수 없습니다.',
    )
    .min(2, '이름은 최소 2자 이상이어야 합니다.'),
});

export type NicknameFormData = z.infer<typeof nicknameSchema>;
