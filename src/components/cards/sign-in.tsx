import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useId, useState } from 'react';
import { Checkbox } from '../ui/checkbox';

const Signin = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, _] = useState<{ [key: string]: string }>({});

  // const id = useId();
  const emailId = useId();
  const passwordId = useId();
  const checkId = useId();

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

        <form>
          <div className="relative mb-4">
            <Label htmlFor={emailId} className="text-sm font-medium">
              Email
            </Label>
            <div className="relative mt-1">
              <Input
                id={emailId}
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
            <Label htmlFor={passwordId}>Password</Label>
            <div className="relative mt-1">
              <Input
                id={passwordId}
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
          </div>

          <div className="flex items-center space-x-2 ml-8  mb-4">
            <Checkbox id={checkId} />
            <label
              htmlFor={checkId}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              자동 로그인
            </label>
          </div>

          <Button className="w-full mt-4 mb-4">로그인</Button>
          <div className="text-center w-full text-sm font-thin">
            <a href="/find-password" className="text-primary hover:underline">
              아이디 / 비밀번호 찾기
            </a>
            <a href="/sign-up" className="text-primary hover:underline ml-8">
              회원가입
            </a>
          </div>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase mt-4 mb-2 ">
            <span className="bg-background px-2 text-muted-foreground">SNS LOGIN</span>
          </div>
        </div>

        <div className="flex gap-6">
          <Button variant="outline" className="flex-grow">
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2 dark:invert"
            >
              <title>Naver</title>
              <path d="M19 19V5h-3.5v10.5L8 5H5v14h3.5V8.5L16 19h3z" />
            </svg>
            Naver
          </Button>
          <Button variant="outline" className="flex-grow">
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2 dark:invert"
            >
              <title>Kakao</title>
              <path d="M12 3C5.9 3 1 7.1 1 12.2C1 15.7 3.1 18.7 6.2 20.4V24L10.6 21.2C11 21.3 11.5 21.3 12 21.3C18.1 21.3 23 17.2 23 12.2C23 7.1 18.1 3 12 3Z" />
            </svg>
            Kakao
          </Button>
          <Button variant="outline" className="flex-grow">
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2 dark:invert"
            >
              <title>Google</title>
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
            </svg>
            Google
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Signin;
