import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Signin() {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">커뮤니T</CardTitle>
        <CardDescription>
          운동을 좋아하시나요? 저희 커뮤니티를 이용하세요
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>
        <br/>
        <Button className="w-full">로그인</Button>
        <div className="text-center w-full text-sm font-thin">
          <a href="/find-email" className="text-primary hover:underline text-red-300">
            이메일 찾기
          </a>
          <a href="/find-password" className="text-primary hover:underline text-red-300 ml-16">
            비밀번호 찾기
          </a>
        </div>

        <div className="text-center w-full text-sm font-thin">
          <a href="/sign-up" className="text-primary hover:underline">
          커뮤니T의 친구가 아니라면 회원가입
          </a>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase mt-4 mb-2 ">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
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
}
