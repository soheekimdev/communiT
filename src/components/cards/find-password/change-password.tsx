import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useId, useState } from 'react';

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [errors, _] = useState<{ [key: string]: string }>({});

  const newPasswordId = useId();
  const newConfirmPasswordId = useId();

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl mb-2">비밀번호 변경</CardTitle>
        <CardDescription>변경할 비밀번호를 입력해주세요.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="relative mb-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
        </div>

        <form>
          <div className="relative mb-4">
            <Label htmlFor={newPasswordId}>새 비밀번호</Label>
            <div className="relative mt-1">
              <Input
                id={newPasswordId}
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                className={`pl-10 pr-10 ${errors.newpassword ? 'border-red-500' : ''}`}
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
          </div>

          <div className="relative mb-2">
            <Label htmlFor={newConfirmPasswordId}>새 비밀번호 확인</Label>
            <div className="relative mt-1">
              <Input
                id={newConfirmPasswordId}
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
          </div>
        </form>
      </CardContent>
      <br />
      <CardFooter>
        <Button className="w-full">로그인</Button>
      </CardFooter>
    </Card>
  );
};

export default ChangePassword;
