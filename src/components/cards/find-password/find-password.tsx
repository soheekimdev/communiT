import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export function FindPassword() {
  return (
    <Card>
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl mb-2">비밀번호 찾기</CardTitle>
        <CardDescription>
          가입할 때 사용하신 이메일을 입력해주세요.<br/>
          비밀번호 재설정 메일을 보내드립니다.
        </CardDescription>
      </CardHeader>
      <br/>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">이메일</Label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
      </CardContent>
      <br/>
      <CardFooter>
        <Button className="w-full">비밀번호 재설정하기</Button>
      </CardFooter>
    </Card>
  );
}
