import { z } from 'zod';

export const formSchema = z.object({
  content: z
    .string()
    .min(1, { message: '댓글 내용을 입력해주세요.' })
    .max(500, { message: '댓글은 500자를 초과할 수 없습니다.' }),
});
