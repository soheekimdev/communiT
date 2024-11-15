import { z } from 'zod';

export const signUpSchema = z
  .object({
    email: z.string().email('유효한 이메일 주소를 입력하세요'),
    password: z
      .string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .max(15, '비밀번호는 최대 15자 이하여야 합니다.')
      .regex(/(?=.*[A-Za-z])/, '최소 하나 이상의 영문자가 포함되어야 합니다.')
      .regex(/(?=.*\d)/, '최소 하나 이상의 숫자가 포함되어야 합니다.')
      .regex(/^(?!.*(.)\1\1)/, '동일한 문자가 3번 이상 연속될 수 없습니다.'),
    confirmPassword: z.string(),
    username: z
      .string()
      .trim()
      .nonempty('닉네임을 입력해 주세요.')
      .regex(
        /^[a-zA-Z0-9가-힣]*$/,
        '공백, 특수 문자, 그리고 자음이나 모음만으로 이루어진 한글은 사용할 수 없습니다.',
      )
      .min(2, '이름은 최소 2자 이상이어야 합니다.'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
