import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/useToast';
import { updateBio } from '@/api/profile';
import { BioFormData, bioSchema } from '@/schemas/bioSchema';
import BioInput from './BioInput';

const UpdateBio = ({
  userId,
  token,
  currentBio,
}: {
  userId: string;
  token: string;
  currentBio?: string;
}) => {
  const {
    register: registerBio,
    handleSubmit: handleSubmitBio,
    formState: { errors: bioErrors },
  } = useForm<BioFormData>({
    resolver: zodResolver(bioSchema),
  });

  const onSubmitBio = async (data: BioFormData) => {
    if (!userId || !token) {
      toast({
        title: '자기소개 업데이트 실패',
        description: '사용자 정보 또는 토큰이 없습니다.',
      });
      return;
    }

    try {
      await updateBio(userId, data.bio, token);
      toast({
        title: '자기소개 업데이트',
        description: '자기소개가 성공적으로 업데이트되었습니다.',
      });
    } catch (error) {
      toast({
        title: '자기소개 업데이트 실패',
        description: '자기소개 업데이트 중 오류가 발생했습니다.',
      });
    }
  };

  return (
    <Card className="md:col-span-1">
      <CardHeader>
        <CardTitle>자기소개 변경</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmitBio(onSubmitBio)} className="space-y-4">
          <BioInput
            id="bio"
            label="자기소개"
            placeholderValue={currentBio || '자기소개를 입력해주세요.'}
            register={registerBio('bio')}
            error={bioErrors.bio}
          />
          <div className="flex justify-center">
            <Button type="submit">자기소개 업데이트</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdateBio;
