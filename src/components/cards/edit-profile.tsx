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
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Camera,
  CheckCircle,
  XCircle,
} from 'lucide-react';

const EditProfile = () => {
  const [profileImage, setProfileImage] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

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
        <form onSubmit={handleSubmit} className="space-y-6">
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

          <div className="space-y-4">
            <div className="relative">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <div className="relative mt-1">
                <Input
                  id="email"
                  type="email"
                  placeholder="userEmail@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`pl-10 pr-10 ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                {email &&
                  (errors.email ? (
                    <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 h-5 w-5" />
                  ) : (
                    <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 h-5 w-5" />
                  ))}
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <Label htmlFor="name" className="text-sm font-medium">
                Name
              </Label>
              <div className="relative mt-1">
                <Input
                  id="name"
                  type="text"
                  placeholder="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className={`pl-10 pr-10 ${
                    errors.userName ? 'border-red-500' : ''
                  }`}
                />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                {userName &&
                  (errors.userName ? (
                    <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 h-5 w-5" />
                  ) : (
                    <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 h-5 w-5" />
                  ))}
              </div>
              {errors.userName && (
                <p className="text-red-500 text-xs mt-1">{errors.userName}</p>
              )}
            </div>

            <div className="relative">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`pl-10 pr-10 ${
                    errors.password ? 'border-red-500' : ''
                  }`}
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <div className="relative">
              <Label htmlFor="confirm-password" className="text-sm font-medium">
                Confirm Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`pl-10 pr-10 ${
                    errors.confirmPassword ? 'border-red-500' : ''
                  }`}
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2"
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
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <div className="pt-4">
            <Button type="submit" variant="profile">
              Save Changes
            </Button>
          </div>
        </form>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full bg-gray-200 text-gray-800 hover:bg-gray-300 transition-all duration-300"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EditProfile;
