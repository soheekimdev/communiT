import z from 'zod';

export const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .max(15, '비밀번호는 최대 15자 이하여야 합니다.')
      .regex(/(?=.*[A-Za-z])/, '최소 하나 이상의 영문자가 포함되어야 합니다.')
      .regex(/(?=.*\d)/, '최소 하나 이상의 숫자가 포함되어야 합니다.')
      .regex(/^(?!.*(.)\1\1)/, '동일한 문자가 3번 이상 연속될 수 없습니다.'),
    newPassword: z
      .string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .max(15, '비밀번호는 최대 15자 이하여야 합니다.')
      .regex(/(?=.*[A-Za-z])/, '최소 하나 이상의 영문자가 포함되어야 합니다.')
      .regex(/(?=.*\d)/, '최소 하나 이상의 숫자가 포함되어야 합니다.')
      .regex(/^(?!.*(.)\1\1)/, '동일한 문자가 3번 이상 연속될 수 없습니다.'),
    confirmPassword: z.string(),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export type PasswordFormData = z.infer<typeof passwordSchema>;
