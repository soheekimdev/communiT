import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, MessageCircle, Search } from 'lucide-react';
import { SidebarTrigger } from '../ui/sidebar';
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

import { useSelector } from 'react-redux';
import { RootState } from '@/RTK/store';
import { useAppSelector } from '@/RTK/hooks';

const Header = () => {
  const { isLoggedIn } = useAppSelector(state => state.auth);
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex w-full items-center gap-4 h-16 px-8">
        <SidebarTrigger className="-ml-1" />

        {/* 검색바 */}
        <div className="flex flex-1 items-center justify-end space-x-2 md:justify-between">
          <div className="w-full flex-1 md:max-w-2xl">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="검색" className="pl-8" />
            </div>
          </div>
        </div>

        {/* 우측 버튼들 */}
        <div className="flex items-center gap-5">
          {isLoggedIn ? (
            <>
              <Link to="/notifications">
                <Bell />
              </Link>
              <Link to="/message-channels">
                <MessageCircle />
              </Link>
              <Link to="/my-profile">
                <Avatar size="xs">
                  <AvatarImage
                    src={user?.profileImageUrl || user?.username}
                    alt="Profile Picture"
                  />
                  <AvatarFallback>사용자</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <Link to="sign-in">
              <Button size="sm">로그인</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
