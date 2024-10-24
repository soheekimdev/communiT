import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { SidebarTrigger } from '../ui/sidebar';
import { Link } from 'react-router-dom';

interface HeaderProps {
  userName?: string;
}

const Header = ({ userName }: HeaderProps) => {
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
        <div className="flex items-center gap-2">
          {userName ? (
            <>
              <Link to="/notifications">
                <Button variant="ghost" size="sm">
                  알림
                </Button>
              </Link>
              <Link to="/message-channels">
                <Button variant="ghost" size="sm">
                  메시지
                </Button>
              </Link>
              <Link to="/my-profile">
                <Button variant="ghost" size="sm">
                  프로필
                </Button>
              </Link>
            </>
          ) : (
            <Button size="sm">로그인</Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
