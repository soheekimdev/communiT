import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter } from '@/components/ui/card';

const FindPasswordEmail = () => {
  return (
    <Card>
      <CardContent className="text-center mt-16">
        <CardDescription>
          <span className="font-bold text-lg mb-4">m@example.com</span>
          <br />
          입력하신 이메일로 비밀번호 재설정 메일이 발송되었습니다
        </CardDescription>
      </CardContent>

      <CardFooter>
        <Button className="w-full">확인</Button>
      </CardFooter>
    </Card>
  );
};

export default FindPasswordEmail;
