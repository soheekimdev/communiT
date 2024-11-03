import { Home, Dumbbell, Users, LogOut, Settings } from 'lucide-react';
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

const mainMenuItems = [
  { title: '홈', url: '/', icon: Home },
  { title: '챌린지', url: '/challenges', icon: Dumbbell },
  { title: '커뮤니티', url: '/posts', icon: Users },
];

const subMenuItems = [
  { title: '설정', url: '/settings', icon: Settings },
  { title: '로그아웃', url: '/', icon: LogOut },
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
                  <SidebarLink to={item.url} icon={item.icon}>
                    {item.title}
                  </SidebarLink>
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
              <SidebarLink to={item.url} icon={item.icon}>
                {item.title}
              </SidebarLink>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
