import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useId, useState } from 'react';
import { Checkbox } from '../ui/checkbox';
import { z } from 'zod';

const signInSchema = z.object({
  email: z.string().email('유효한 이메일 주소를 입력하세요'),
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
});

const Signin = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const Id = useId();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = signInSchema.safeParse({ email, password });

    if (!result.success) {
      const formattedErrors = result.error.format();
      setErrors({
        email: formattedErrors.email?._errors ? formattedErrors.email._errors[0] : '',
        password: formattedErrors.password?._errors ? formattedErrors.password._errors[0] : '',
      });
    } else {
      setErrors({});
      console.log('로그인 성공', result.data);
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">운동 커뮤니T</CardTitle>
        <CardDescription>운동을 좋아하시나요? 여깁니다 여기</CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        <div className="relative mb-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <Label htmlFor={`${Id}-email`} className="text-sm font-medium">
              Email
            </Label>
            <div className="relative mt-1">
              <Input
                id={`${Id}-email`}
                type="email"
                placeholder="userEmail@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={`pl-10 pr-10 ${errors.email ? 'border-red-500' : ''}`}
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="relative mb-4">
            <Label htmlFor={`${Id}-password`}>Password</Label>
            <div className="relative mt-1">
              <Input
                id={`${Id}-password`}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 hover:bg-transparent hover:text-inherit"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </Button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div className="flex items-center space-x-2 ml-4 mb-4 text-gray-500">
            <Checkbox id={`${Id}-check`} name="autoLogin" onChange={() => setChecked(!checked)} />
            <label
              htmlFor={`${Id}-check`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              자동 로그인
            </label>
          </div>

          <div className="pt-4 mt-8 mb-4">
            <Button type="submit" className="w-full">
              로그인
            </Button>
          </div>

          <div className="text-center w-full text-sm font-thin mb-4">
            <a href="/find-email" className="text-primary hover:underline">
              이메일 찾기
            </a>
            <a href="/find-password" className="text-primary hover:underline ml-8">
              비밀번호 찾기
            </a>
            <a href="/sign-up" className="text-primary hover:underline ml-8">
              회원가입
            </a>
          </div>
        </form>

        <div className="relative mt-2 mb-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">SNS LOGIN</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-12 mb-4 mt-4">
          <Button
            type="button"
            variant="ghost"
            className="hover:bg-transparent hover:text-inherit w-16 h-16 rounded-full p-0"
          >
            <img src="/images/Naver.png" alt="Naver" className=" rounded-full border-2" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="hover:bg-transparent hover:text-inherit w-16 h-16 rounded-full p-0"
          >
            <img src="/images/Kakao.png" alt="Kakao" className=" rounded-full border-2" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            className=" hover:bg-transparent hover:text-inherit w-16 h-16 rounded-full p-0"
          >
            <img src="/images/Google.png" alt="Google" className="rounded-full border-2 " />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Signin;
