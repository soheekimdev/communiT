import { cn } from '@/lib/utils';

import MyProfile from '@/components/cards/my-profile';
import EditProfile from '@/components/cards/edit-profile';
import Signin from '@/components/cards/sign-in';
import ChangePassword from '@/components/cards/find-password/change-password';
import FindPassword from '@/components/cards/find-password/find-password';
import FindPasswordEmail from '@/components/cards/find-password/find-password-email';

function DemoContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex items-center justify-center [&>div]:w-full',
        className
      )}
      {...props}
    />
  );
}

export default function HomePage() {
  return (
    <div className="hidden items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3">
      {/* 민재 컴포넌트 확인용 */}
      <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
        <DemoContainer>
          <MyProfile />
        </DemoContainer>
        <DemoContainer>
          <EditProfile />
        </DemoContainer>
      </div>

      {/* 여진 컴포넌트 확인용 */}
      <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
        <DemoContainer>
          <Signin />
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
