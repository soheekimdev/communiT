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
import { Link, useParams } from 'react-router-dom';
import { createNewComment, UserComment } from '@/api/comment';

type CommentInputProps = {
  addComment: (newComment: UserComment) => void;
};

const CommentInput = ({ addComment }: CommentInputProps) => {
  const { id: postId } = useParams();
  const [charCount, setCharCount] = useState(0);
  const [, setLoading] = useState(false);
  const [, setError] = useState<string | null>(null);
  const user = useAppSelector((state: RootState) => state.auth.user);
  const token = localStorage.getItem('accessToken');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!token) {
      setError('로그인이 필요합니다.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const newComment = await createNewComment(postId!, values.content, token);

      if (newComment) {
        console.log('댓글 작성 성공:', newComment);
        addComment(newComment);
        form.reset();
        setCharCount(0);
      } else {
        throw new Error('댓글 작성 실패');
      }
    } catch (err) {
      console.error(err);
      setError('댓글 작성 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="border border-gray-200 p-4 rounded-xl bg-card text-card-foreground shadow">
        <p className="text-center text-gray-500">
          댓글을 작성하려면{' '}
          <Link to="/sign-in" className="text-blue-500">
            로그인
          </Link>
          이 필요합니다.
        </p>
      </div>
    );
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
