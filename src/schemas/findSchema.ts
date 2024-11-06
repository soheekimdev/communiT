import { z } from 'zod';

export const findSchema = z.object({
  email: z.string().email('유효한 이메일 주소를 입력하세요'),
});
