import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { createNewPost } from '@/api/post';
import { Info } from 'lucide-react';

const NewPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');

    if (!token) {
      setDialogMessage('로그인이 필요합니다.');
      setShowDialog(true);
      return;
    }

    if (title.trim().length < 4) {
      setAlertMessage('제목은 최소 4자 이상이어야 합니다.');
      setShowAlert(true);
      return;
    }

    setIsSubmitting(true);

    try {
      await createNewPost(title, content, token);
      setDialogMessage('게시물이 성공적으로 작성되었습니다.');
      setShowDialog(true);
      setTitle('');
      setContent('');
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setDialogMessage('로그인이 필요합니다. 다시 로그인해 주세요.');
        setShowDialog(true);
      } else {
        setAlertMessage('게시물 생성에 실패했습니다. 잠시 후 다시 시도해주세요.');
        setShowAlert(true);
      }
      console.error('Failed to create post:', error);
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
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="게시물 제목을 입력하세요 (4자 이상)"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">내용</Label>
              <Textarea
                id="content"
                value={content}
                onChange={e => setContent(e.target.value)}
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
