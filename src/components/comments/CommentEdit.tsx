import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { updateComment } from '@/api/comment';
import { commentSchema } from '@/schemas/commentSchema';

interface CommentEditProps {
  comment: {
    id: string;
    postId: string;
    content: string;
  };
  onCancel: () => void;
  onUpdate: (updatedComment: { id: string; content: string }) => void;
}

const CommentEdit: React.FC<CommentEditProps> = ({ comment, onCancel, onUpdate }) => {
  const [charCount, setCharCount] = useState(comment.content.length);

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: comment.content,
    },
  });

  async function onSubmit(values: z.infer<typeof commentSchema>) {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('사용자 인증이 필요합니다.');
      return;
    }

    try {
      const success = await updateComment(comment.postId, comment.id, token, values.content);
      if (success) {
        onUpdate({ id: comment.id, content: values.content });
        onCancel();
      } else {
        console.error('댓글 수정에 실패했습니다.');
      }
    } catch (error) {
      console.error('API 요청 중 오류가 발생했습니다.', error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="border border-gray-200 p-2 rounded-xl bg-card text-card-foreground shadow"
      >
        <div className="flex space-x-2 items-stretch">
          <div className="flex-grow">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="댓글을 입력하세요..."
                      className="resize-none border-none shadow-none "
                      {...field}
                      onChange={e => {
                        field.onChange(e);
                        setCharCount(e.target.value.length);
                      }}
                    />
                  </FormControl>

                  <FormMessage className="ml-2" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col justify-between pr-1">
            <div className="text-sm text-gray-500 text-right">{charCount}/500</div>
            <Button variant="ghost" type="button" className="mb-1" onClick={onCancel}>
              취소
            </Button>
            <Button type="submit" className="mb-1">
              등록
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CommentEdit;
