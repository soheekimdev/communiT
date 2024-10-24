import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { User, Mail, Lock, Eye, EyeOff, Camera, CheckCircle, XCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

// /^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]*$/
// 특수문자 불가능, 한글 자음 모음 가능 -> ㅂ 가능 ㅏ 가능 바 가능

// /^[a-zA-Z0-9가-힣]*$/
// 특수문자 자음 모음 불가능, 한글 가능 -> ㅂ 불가능 바 가능

const formSchema = z
  .object({
    userName: z
      .string()
      .trim()
      .nonempty('이름을 입력해 주세요.')
      .regex(/^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]*$/, '특수문자는 사용할 수 없습니다.')
      .min(2, '이름은 최소 2자 이상이어야 합니다.'),
    newPassword: z
      .string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .regex(/^(?!.*(.)\1\1).*$/, '같은 문자를 3번 이상 반복할 수 없습니다.'),
    confirmPassword: z.string(),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof formSchema>;

const EditProfile = () => {
  const [profileImage, setProfileImage] = useState<string>('');
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const imageFileRef = useRef<HTMLInputElement>(null);

  const defaultImage = 'https://example.com/my-default-image.png';

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const userNameValue = watch('userName', '');

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

  const onSubmit = (data: FormData) => {
    // 프로필 수정 로직

    console.log('프로필 수정 성공 : ', {
      profileImage,
      ...data,
    });
  };

  const handleCancel = () => {
    setProfileImage('');
    reset();

    if (imageFileRef.current) {
      imageFileRef.current.value = '';
    }
  };

  return (
    <div className="bg-[#fafafa] overflow-hidden h-full mx-auto">
      <div className="relative p-8 space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">정보 수정</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-gray shadow-lg">
                <AvatarImage
                  className="h-full w-full object-cover"
                  src={profileImage || defaultImage}
                  alt="Profile Picture"
                />
                <AvatarFallback>사용자</AvatarFallback>
              </Avatar>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="absolute bottom-0 right-0 rounded-full bg-white"
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
          </div>

          <div className="flex flex-col justify-center items-center space-y-4">
            <div className="relative w-[30rem] ">
              <Label htmlFor="email" className="text-sm font-medium">
                계정
              </Label>
              <div className="relative mt-1">
                <Input
                  id="email"
                  type="email"
                  value="Example@google.com"
                  disabled
                  className="pl-10 pr-10 bg-slate-300 text-green-700"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>

            <div className="relative w-[30rem] ">
              <Label htmlFor="name" className="text-sm font-medium">
                이름(or 닉네임 - 생각중..)
              </Label>
              <div className="relative mt-1">
                <Input
                  id="name"
                  type="text"
                  placeholder="userName"
                  {...register('userName')}
                  className={`pl-10 pr-10 ${errors.userName ? 'border-red-500' : ''}`}
                />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                {errors.userName ? (
                  <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 h-5 w-5" />
                ) : (
                  userNameValue.trim().length >= 2 && (
                    <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 h-5 w-5" />
                  )
                )}
              </div>
              {errors.userName && (
                <p className="text-red-500 text-xs mt-1">{errors.userName.message}</p>
              )}
            </div>

            {/* 회원가입 기능 구현 완료 후 현재 비밀번호와 일치하는지 비교하는 기능 구현 예정 */}
            <div className="relative">
              <Label htmlFor="currentPassword" className="text-sm font-medium">
                현재 비밀번호
              </Label>
              <div className="relative w-[30rem] ">
                <Input
                  id="currentPassword"
                  value="회원가입 후 현재 비밀번호와 일치하는지 비교 예정(현재 disabled)"
                  className="pl-10 pr-10 text-violet-900"
                  disabled
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 hover:bg-transparent hover:text-inherit"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 " />
                  )}
                </Button>
              </div>
              {errors.newPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.newPassword.message}</p>
              )}
            </div>

            <div className="relative w-[30rem] ">
              <Label htmlFor="newPassword" className="text-sm font-medium">
                새 비밀번호
              </Label>
              <div className="relative mt-1">
                <Input
                  id="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  {...register('newPassword')}
                  className={`pl-10 pr-10 ${errors.newPassword ? 'border-red-500' : ''}`}
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 hover:bg-transparent hover:text-inherit"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </Button>
              </div>
              {errors.newPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.newPassword.message}</p>
              )}
            </div>

            <div className="relative w-[30rem] ">
              <Label htmlFor="confirm-password" className="text-sm font-medium">
                비밀번호 확인
              </Label>
              <div className="relative mt-1">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register('confirmPassword')}
                  className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 hover:bg-transparent hover:text-inherit"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-center gap-10 pt-2">
            <Button className="w-[15rem]" type="submit" variant="profile">
              저장
            </Button>
            <Button className="w-[15rem]" type="reset" variant="outline" onClick={handleCancel}>
              취소
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
