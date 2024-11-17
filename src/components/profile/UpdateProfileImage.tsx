import { updateProfileImg } from '@/api/profile';
import { useRef, useState } from 'react';
import { toast } from '@/hooks/useToast';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Camera } from 'lucide-react';

const UpdateProfileImage = ({
  userId,
  token,
  profileImageUrl,
}: {
  userId: string;
  token: string;
  profileImageUrl?: string;
}) => {
  const [profileImage, setProfileImage] = useState<string>(profileImageUrl || '');
  const [loading, setLoading] = useState(false);
  const imageFileRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: '파일 크기 초과',
          description: '이미지 파일은 5MB 이하로 업로드해야 합니다.',
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSubmit = async () => {
    if (!profileImage || !userId || !token) {
      toast({
        title: '업데이트 실패',
        description: '이미지 파일이나 인증 토큰이 없습니다.',
      });
      return;
    }

    setLoading(true);
    try {
      await updateProfileImg(userId, profileImage, token);
      toast({
        title: '프로필 이미지 업데이트',
        description: '프로필 이미지가 성공적으로 업데이트되었습니다.',
      });
    } catch (error) {
      toast({
        title: '프로필 이미지 업데이트 실패',
        description: '프로필 이미지 업데이트 중 오류가 발생했습니다.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="md:col-span-1 ">
      <CardHeader>
        <CardTitle>프로필 이미지 변경</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="relative">
          <Avatar className="w-32 h-32">
            <AvatarImage src={profileImage} alt="Profile Picture" />
            <AvatarFallback>사용자</AvatarFallback>
          </Avatar>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="absolute bottom-0 right-0 rounded-full"
            onClick={() => imageFileRef.current?.click()}
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>
        <Input
          id="profile-image"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
          ref={imageFileRef}
        />
        <Button onClick={handleImageSubmit} disabled={loading}>
          {loading ? '업데이트 중...' : '이미지 업데이트'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default UpdateProfileImage;
