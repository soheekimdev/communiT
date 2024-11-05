import { Home, Dumbbell, Users, LogOut, Settings, LucideIcon } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import SidebarLink from '../ui/sidebar-link';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/RTK/store';
import { logout } from '@/RTK/authSlice';

interface BaseMenuItem {
  title: string;
  icon: LucideIcon;
}

interface LinkMenuItem extends BaseMenuItem {
  type: 'link';
  to: string;
}

interface ButtonMenuItem extends BaseMenuItem {
  type: 'button';
  onClick: () => void;
}

type MenuItem = LinkMenuItem | ButtonMenuItem;

const mainMenuItems: MenuItem[] = [
  { type: 'link', title: '홈', to: '/', icon: Home },
  { type: 'link', title: '챌린지', to: '/challenges', icon: Dumbbell },
  { type: 'link', title: '커뮤니티', to: '/posts', icon: Users },
];

const subMenuItems: MenuItem[] = [
  { type: 'link', title: '설정', to: '/settings', icon: Settings },
  {
    type: 'button',
    title: '로그아웃',
    icon: LogOut,
    onClick: () => {
      console.log('로그아웃 버튼 클릭'); // TODO: 로그아웃 로직에 연결
    },
  },
];

const AppSidebar = () => {
  const dispatch = useDispatch();
  const { setOpenMobile } = useSidebar(); // useSidebar hook 사용
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn); // 로그인 상태 가져오기

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Sidebar>
      <SidebarHeader>운동커뮤니T</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  {item.type === 'link' ? (
                    <SidebarLink type="link" to={item.to} icon={item.icon}>
                      {item.title}
                    </SidebarLink>
                  ) : (
                    <SidebarLink type="button" onClick={item.onClick} icon={item.icon}>
                      {item.title}
                    </SidebarLink>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {subMenuItems.map(item => (
            <SidebarMenuItem key={item.title}>
              {item.type === 'link' ? (
                <SidebarLink type="link" to={item.to} icon={item.icon}>
                  {item.title}
                </SidebarLink>
              ) : (
                <SidebarLink type="button" onClick={item.onClick} icon={item.icon}>
                  {item.title}
                </SidebarLink>
              )}
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              {isLoggedIn ? (
                <div
                  className="flex items-center w-full gap-4 px-2 py-2 cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="w-5 h-5" />
                  <span>로그아웃</span>
                </div>
              ) : (
                <Link
                  to="/sign-in" // 로그인 페이지로 이동
                  className="flex items-center w-full gap-4 px-2 py-2"
                >
                  <LogOut className="w-5 h-5" />
                  <span>로그인</span>
                </Link>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
