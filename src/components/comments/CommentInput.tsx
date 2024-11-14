import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useAppSelector } from '@/RTK/hooks';
import { RootState } from '@/RTK/store';
import { formSchema } from '@/schemas/commentSchema';

const CommentInput = () => {
  const [charCount, setCharCount] = useState(0);
  const user = useAppSelector((state: RootState) => state.auth.user);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // TODO: 여기에 댓글 제출 로직 추가
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="border border-gray-200 p-2 rounded-xl bg-card text-card-foreground shadow"
      >
        <div className="flex space-x-2 items-stretch">
          <div className="flex-grow">
            <div className="ml-3 mb-2 font-bold">{user?.username}</div>
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
            <Button type="submit" className="mb-1 ">
              등록
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CommentInput;
