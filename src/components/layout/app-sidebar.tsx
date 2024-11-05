import { Home, Dumbbell, Users, LogOut, Settings, LucideIcon } from 'lucide-react';
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
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
