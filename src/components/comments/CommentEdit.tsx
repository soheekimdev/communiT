import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  content: z
    .string()
    .min(1, { message: '댓글 내용을 입력해주세요.' })
    .max(500, { message: '댓글은 500자를 초과할 수 없습니다.' }),
});

interface CommentEditProps {
  comment: {
    id: string;
    content: string;
  };
  onCancel: () => void; // 취소 버튼을 클릭했을 때 호출되는 함수
}

const CommentEdit: React.FC<CommentEditProps> = ({ comment, onCancel }) => {
  const [charCount, setCharCount] = useState(comment.content.length);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: comment.content,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // TODO: 여기에 댓글 수정 제출 로직 추가
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
