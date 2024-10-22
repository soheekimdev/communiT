import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useState, useRef } from 'react';

const EditProfile = () => {
  const [profileImage, setProfileImage] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const imageFileRef = useRef<HTMLInputElement>(null);

  const defaultImage = 'https://example.com/my-default-image.png';

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};
    if (!email.includes('@'))
      newErrors.email = '유효한 이메일 주소를 입력하세요.';
    if (userName.length < 3)
      newErrors.userName = '이름은 최소 3자 이상이어야 합니다.';
    if (password.length < 6)
      newErrors.password = '비밀번호는 최소 6자 이상이어야 합니다.';
    if (password !== confirmPassword)
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (validateFields()) {
      // 프로필 수정 로직

      console.log('프로필 수정 성공 : ', {
        profileImage,
        userName,
        email,
        password,
      });
    }
  };

  const handleCancel = () => {
    setProfileImage('');
    setUserName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors({});

    if (imageFileRef.current) {
      imageFileRef.current.value = '';
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Edit Profile</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="m-auto">
            <Avatar className="h-24 w-24">
              <AvatarImage
                className="h-full w-full"
                src={profileImage || defaultImage}
                alt="Profile Picture"
              />
              <AvatarFallback>사용자</AvatarFallback>
            </Avatar>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="profile-image">Change Profile Image</Label>
            <Input
              id="profile-image"
              type="file"
              accept="image/*"
              className="w-auto"
              onChange={handleImageChange}
              ref={imageFileRef}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="userEmail@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className={errors.userName ? 'border-red-500' : ''}
            />
            {errors.userName && (
              <p className="text-red-500 text-sm">{errors.userName}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? 'border-red-500' : ''}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={errors.confirmPassword ? 'border-red-500' : ''}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>
          <Button type="submit" className="w-full">
            Edit
          </Button>
        </form>
      </CardContent>

      <CardFooter className="gap-4">
        <Button className="w-full" variant="destructive" onClick={handleCancel}>
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EditProfile;
