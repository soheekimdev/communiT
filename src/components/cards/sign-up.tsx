import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useId, useState } from 'react';
import { z } from 'zod';

const signUpSchema = z
  .object({
    email: z.string().email('유효한 이메일 주소를 입력하세요'),
    password: z
      .string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .regex(/^(?!.*(.)\1\1).*$/, '같은 문자를 3번 이상 반복할 수 없습니다.'),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

const SignUp = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const Id = useId();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = signUpSchema.safeParse({ email, password, confirmPassword });

    if (!result.success) {
      const formattedErrors = result.error.format();
      setErrors({
        email: formattedErrors.email?._errors ? formattedErrors.email._errors[0] : '',
        password: formattedErrors.password?._errors ? formattedErrors.password._errors[0] : '',
        confirmPassword: formattedErrors.confirmPassword?._errors
          ? formattedErrors.confirmPassword?._errors[0]
          : '',
      });
    } else {
      setErrors({});
      console.log('회원가입 성공', result.data);
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">회원가입</CardTitle>
        <CardDescription>커뮤니T의 친구가 되실 여러분 환영합니다</CardDescription>
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
              이메일
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
            <Label htmlFor={`${Id}-password`}>비밀번호</Label>
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

          <div className="relative mb-4">
            <Label htmlFor={`${Id}-newConfirmPassword`}>비밀번호 확인</Label>
            <div className="relative mt-1">
              <Input
                id={`${Id}-newConfirmPassword`}
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
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
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="pt-4 mt-8">
            <Button className="w-full" type="submit">
              회원가입
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignUp;
