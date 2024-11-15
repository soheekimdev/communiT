import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { createNewPost } from '@/api/post';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import useForm from '@/hooks/usePostForm';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const NewPost = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const token = localStorage.getItem('accessToken');

  const { values, handleChange, validate } = useForm({
    title: '',
    content: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    if (!token) {
      setDialogMessage('로그인이 필요합니다.');
      setShowDialog(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const isCreated = await createNewPost(values.title, values.content, token);
      if (isCreated) {
        setDialogMessage('게시물이 성공적으로 작성되었습니다.');
        setShowDialog(true);
        values.title = ''; // 폼 초기화
        values.content = '';
      } else {
        setAlertMessage('게시물 생성에 실패했습니다. 잠시 후 다시 시도해주세요.');
        setShowAlert(true);
      }
    } catch (error: any) {
      console.error('Failed to create post:', error);
      setAlertMessage('게시물 생성에 실패했습니다. 잠시 후 다시 시도해주세요.');
      setShowAlert(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">새 게시물 작성</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {showAlert && (
              <Alert variant="destructive">
                <Info className="h-4 w-4" />
                <AlertTitle>오류</AlertTitle>
                <AlertDescription>{alertMessage}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="title">제목</Label>
              <Input
                id="title"
                name="title"
                value={values.title}
                onChange={handleChange}
                placeholder="게시물 제목을 입력하세요 (4자 이상)"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">내용</Label>
              <Textarea
                id="content"
                name="content"
                value={values.content}
                onChange={handleChange}
                placeholder="게시물 내용을 입력하세요"
                required
                className="min-h-[200px]"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              disabled={isSubmitting}
            >
              취소
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? '제출 중...' : '게시물 작성'}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>알림</AlertDialogTitle>
            <AlertDialogDescription>{dialogMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setShowDialog(false);
                if (dialogMessage.includes('로그인이 필요합니다')) {
                  navigate('/login');
                } else if (dialogMessage.includes('성공적으로 작성되었습니다')) {
                  navigate('/posts');
                }
              }}
            >
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default NewPost;
