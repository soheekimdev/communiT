import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email('유효한 이메일 주소를 입력하세요'),
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
});
