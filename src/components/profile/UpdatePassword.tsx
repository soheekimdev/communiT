import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/useToast';
import { PasswordFormData, passwordSchema } from '@/schemas/passwordSchema';
import PasswordInput from './PasswordInput';
import { useState } from 'react';

const UpdatePassword = ({
  userId,
  token,
}: // CurrentPassword,
{
  userId: string;
  token: string;
  // CurrentPassword: string;
}) => {
  const [loading, setLoading] = useState(false);

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmitPassword = async (data: PasswordFormData) => {
    if (!userId || !token) {
      toast({
        title: '비밀번호 업데이트 실패',
        description: '사용자 정보 또는 토큰이 없습니다.',
      });
      return;
    }

    setLoading(true);
    try {
      // 비밀번호 업데이트 로직
      console.log('비밀번호 업데이트:', data);
      toast({
        title: '비밀번호 업데이트',
        description: '비밀번호가 성공적으로 업데이트되었습니다.',
      });
    } catch (error) {
      toast({
        title: '비밀번호 업데이트 실패',
        description: '비밀번호 업데이트 중 오류가 발생했습니다.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="md:col-span-1">
      <CardHeader>
        <CardTitle>비밀번호 변경</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmitPassword(onSubmitPassword)} className="space-y-4">
          <PasswordInput
            id="currentPassword"
            label="현재 비밀번호"
            register={registerPassword('currentPassword')}
            error={passwordErrors.currentPassword}
          />
          <PasswordInput
            id="newPassword"
            label="새 비밀번호"
            register={registerPassword('newPassword')}
            error={passwordErrors.newPassword}
          />
          <PasswordInput
            id="confirmPassword"
            label="비밀번호 확인"
            register={registerPassword('confirmPassword')}
            error={passwordErrors.confirmPassword}
          />
          <div className="flex justify-center">
            <Button type="submit" disabled={loading}>
              {loading ? '업데이트 중...' : '비밀번호 업데이트'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdatePassword;
