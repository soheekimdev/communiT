import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useId, useState } from 'react';
import { z } from 'zod';

const findEmailSchema = z.object({
  email: z.string().email('유효한 이메일 주소를 입력하세요'),
});

const FindEmail = () => {
  const [email, setEmail] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null); // 제출된 이메일 상태 추가

  const emailId = useId();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = findEmailSchema.safeParse({ email });

    if (!result.success) {
      const formattedErrors = result.error.format();
      setErrors({
        email: formattedErrors.email?._errors ? formattedErrors.email._errors[0] : '',
      });
      setSubmittedEmail(null);
    } else {
      setErrors({});
      setSubmittedEmail(email);
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl mb-2">이메일 찾기</CardTitle>
        <CardDescription>
          이메일을 입력해주세요.
          <br />
          해당 이메일 가입여부를 알려드립니다
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="relative mb-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
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

          {/* 나중에 이메일 가입확인 안된 여부도 추가하기 */}
          {submittedEmail && (
            <div className="mt-8 text-center">
              <p className="text-green-600 font-bold">{submittedEmail}</p>
              <p className="text-green-600">해당 이메일 가입 확인되었습니다</p>
            </div>
          )}

          <div className="pt-4 mt-8">
            <Button type="submit" className="w-full ">
              이메일 찾기
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default FindEmail;
