import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/useToast';
import NicknameInput from './NicknameInput';
import { nicknameSchema, NicknameFormData } from '@/schemas/nicknameSchema';
import { updateNickname } from '@/api/profile';

const UpdateNickname = ({
  userId,
  token,
  currentNickname,
}: {
  userId: string;
  token: string;
  currentNickname?: string;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NicknameFormData>({
    resolver: zodResolver(nicknameSchema),
  });

  const onSubmit = async (data: NicknameFormData) => {
    if (!userId || !token) {
      toast({
        title: '넥네임 업데이트 실패',
        description: '사용자 정보 또는 토큰이 없습니다.',
      });
      return;
    }

    try {
      await updateNickname(userId, data.nickname, token);
      toast({
        title: '닉네임 업데이트 성공',
        description: '닉네임이 성공적으로 업데이트되었습니다.',
      });
    } catch {
      toast({
        title: '업데이트 실패',
        description: '닉네임 업데이트 중 오류가 발생했습니다.',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>닉네임 변경</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <NicknameInput
            id="nickname"
            label="닉네임"
            placeholderValue={currentNickname || '새 닉네임 입력'}
            register={register('nickname')}
            error={errors.nickname}
          />
          <div className="flex justify-center">
            <Button type="submit">닉네임 업데이트</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdateNickname;
