import { cn } from '@/lib/utils';
import Signin from '@/components/cards/sign-in';
import ChangePassword from '@/components/cards/find-password/change-password';
import FindPassword from '@/components/cards/find-password/find-password';
import FindPasswordEmail from '@/components/cards/find-password/find-password-email';
import FindEmail from '@/components/cards/find-password/find-email';

function DemoContainer({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex items-center justify-center [&>div]:w-full', className)} {...props} />
  );
}

export default function HomePage() {
  return (
    <div className="grid items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3">
      {/* 여진 컴포넌트 확인용 */}
      <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
        <DemoContainer>
          <Signin />
        </DemoContainer>
        <DemoContainer>
          <FindEmail />
        </DemoContainer>
        <DemoContainer>
          <FindPassword />
        </DemoContainer>
        <DemoContainer>
          <FindPasswordEmail />
        </DemoContainer>
        <DemoContainer>
          <ChangePassword />
        </DemoContainer>
      </div>
      {/*  */}
    </div>
  );
}
