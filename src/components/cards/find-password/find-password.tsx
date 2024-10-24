import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useId, useState } from 'react';

const FindPassword = () => {
  const [email, setEmail] = useState<string>('');
  const [errors, _] = useState<{ [key: string]: string }>({});

  const emailId = useId();

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl mb-2">비밀번호 찾기</CardTitle>
        <CardDescription>
          가입할 때 사용하신 이메일을 입력해주세요.
          <br />
          비밀번호 재설정 링크를 보내드립니다.
        </CardDescription>
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
          <div className="text-center w-full text-sm font-thin">
            <a href="/find-email" className="text-primary hover:underline ">
              이메일이 기억 안나시나요?
            </a>
          </div>
          <div className="pt-4 mt-8">
            <Button type="submit" className="w-full ">
              비밀번호 재설정
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default FindPassword;
