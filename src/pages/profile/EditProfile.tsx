import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import NicknameInput from '@/components/NicknameInput';
import PasswordInput from '@/components/PasswordInput';
import BioInput from '@/components/BioInput';
import CategorySelector from '@/components/CategorySelector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Camera } from 'lucide-react';
import { toast } from '@/hooks/useToast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { nicknameSchema, NicknameFormData } from '@/schemas/nicknameSchema';
import { passwordSchema, PasswordFormData } from '@/schemas/passwordSchema';
import { bioSchema, BioFormData } from '@/schemas/bioSchema';
import { updateNickname, updateProfileImg, updateBio } from '@/api/profile';
import { useSelector } from 'react-redux';
import { RootState } from '@/RTK/store';

const categoryOptions = ['축구', '농구', '야구', '테니스', '스쿠버 다이빙', '수상스키', '런닝'];

const EditProfile = () => {
  const [profileImage, setProfileImage] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const imageFileRef = useRef<HTMLInputElement>(null);

  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?.id;
  const token = localStorage.getItem('accessToken');
  // console.log(userId, token);

  const {
    register: registerNickname,
    handleSubmit: handleSubmitNickname,
    formState: { errors: nicknameErrors },
  } = useForm<NicknameFormData>({
    resolver: zodResolver(nicknameSchema),
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const {
    register: registerBio,
    handleSubmit: handleSubmitBio,
    formState: { errors: bioErrors },
  } = useForm<BioFormData>({
    resolver: zodResolver(bioSchema),
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
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
    }
  };

  const toggleCategory = (category: string) => {
    setCategories(prevCategories =>
      prevCategories.includes(category)
        ? prevCategories.filter(c => c !== category)
        : [...prevCategories, category],
    );
  };

  const handleCategorySubmit = async () => {
    // 카테고리 업데이트 로직
    console.log('선택된 카테고리:', categories);
    toast({
      title: '카테고리 업데이트',
      description: '카테고리가 성공적으로 업데이트되었습니다.',
    });
  };

  const onSubmitNickname = async (data: NicknameFormData) => {
    if (!userId || !token) {
      toast({
        title: '닉네임 업데이트 실패',
        description: '사용자 정보 또는 토큰이 없습니다.',
      });
      return;
    }

    try {
      await updateNickname(userId, data.nickname, token);
      toast({
        title: '닉네임 업데이트',
        description: '닉네임이 성공적으로 업데이트되었습니다.',
      });
    } catch (error) {
      toast({
        title: '닉네임 업데이트 실패',
        description: '닉네임 업데이트 중 오류가 발생했습니다.',
      });
    }
  };

  const onSubmitBio = async (data: BioFormData) => {
    if (!userId || !token) {
      toast({
        title: '닉네임 업데이트 실패',
        description: '사용자 정보 또는 토큰이 없습니다.',
      });
      return;
    }

    try {
      await updateBio(userId, data.bio, token);
      toast({
        title: '닉네임 업데이트',
        description: '닉네임이 성공적으로 업데이트되었습니다.',
      });
    } catch (error) {
      toast({
        title: '닉네임 업데이트 실패',
        description: '닉네임 업데이트 중 오류가 발생했습니다.',
      });
    }
  };

  const onSubmitPassword = async (data: PasswordFormData) => {
    // 비밀번호 업데이트 로직
    console.log('비밀번호 업데이트:', data);
    toast({
      title: '비밀번호 업데이트',
      description: '비밀번호가 성공적으로 업데이트되었습니다.',
    });
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">정보 수정</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="md:col-span-1 ">
          <CardHeader>
            <CardTitle>프로필 이미지 변경</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="w-32 h-32">
                <AvatarImage
                  src={profileImage || user?.profileImageUrl || ''}
                  alt="Profile Picture"
                />
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
            <Button onClick={handleImageSubmit}>이미지 업데이트</Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>닉네임 변경</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitNickname(onSubmitNickname)} className="space-y-4">
              <NicknameInput
                id="nickname"
                label="닉네임"
                placeholderValue={user?.username || ''}
                register={registerNickname('nickname')}
                error={nicknameErrors.nickname}
              />
              <div className="flex justify-center">
                <Button type="submit">닉네임 업데이트</Button>
              </div>
            </form>
          </CardContent>
        </Card>

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
                <Button type="submit">비밀번호 업데이트</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>자기소개 변경</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitBio(onSubmitBio)} className="space-y-4">
              <BioInput
                id="bio"
                label="자기소개"
                placeholderValue={user?.bio || '주 1회 한강에서 런닝합니다.'}
                register={registerBio('bio')}
                error={bioErrors.bio}
              />
              <div className="flex justify-center">
                <Button type="submit">자기소개 업데이트</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>카테고리 변경</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CategorySelector
              categories={categoryOptions}
              selectedCategories={categories}
              toggleCategory={toggleCategory}
            />
            <div className="flex justify-center">
              <Button onClick={handleCategorySubmit}>카테고리 업데이트</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditProfile;
