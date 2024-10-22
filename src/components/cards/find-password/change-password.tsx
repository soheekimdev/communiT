import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ChangePassword() {
  return (
    <Card>
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl mb-2">비밀번호 변경</CardTitle>
        <CardDescription>
          변경할 비밀번호를 입력해주세요.
        </CardDescription>
      </CardHeader>
      <br/>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">새 비밀번호</Label>
          <Input id="password" type="password"/>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">새 비밀번호 확인</Label>
          <Input id="password" type="password"/>
        </div>
      </CardContent>
      <br/>
      <CardFooter>
        <Button className="w-full">로그인 하러가기</Button>
      </CardFooter>
    </Card>
  );
}
