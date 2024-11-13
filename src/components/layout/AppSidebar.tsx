import { Home, Dumbbell, Users, LogIn, LogOut, Settings, LucideIcon } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import SidebarLink from '../ui/sidebar-link';
import { useSelector } from 'react-redux';
import { RootState } from '@/RTK/store';
import { logout } from '@/RTK/authSlice';
import { useAppDispatch } from '@/RTK/hooks';

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

const subMenuItems: MenuItem[] = [{ type: 'link', title: '설정', to: '/settings', icon: Settings }];

const AppSidebar = () => {
  const dispatch = useAppDispatch();
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
            {isLoggedIn ? (
              <SidebarLink type="button" icon={LogOut} onClick={handleLogout}>
                로그아웃
              </SidebarLink>
            ) : (
              <SidebarLink type="link" to="/sign-in" icon={LogIn}>
                로그인
              </SidebarLink>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
