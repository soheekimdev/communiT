import { Home, Dumbbell, Users, LogOut } from 'lucide-react';
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
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Link } from 'react-router-dom';
const mainMenuItems = [
  { title: '홈', url: '/', icon: Home },
  { title: '챌린지', url: '/challenges', icon: Dumbbell },
  { title: '커뮤니티', url: '/posts', icon: Users },
];

const AppSidebar = () => {
  const { setOpenMobile } = useSidebar(); // useSidebar hook 사용

  const handleClick = () => {
    setOpenMobile(false); // 메뉴 클릭 시 사이드바 닫기
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
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.url}
                      className="flex items-center w-full gap-4 px-2 py-2"
                      onClick={handleClick}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <ModeToggle />
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div className="flex items-center w-full gap-4 px-2 py-2 cursor-pointer">
                <LogOut className="w-5 h-5" />
                <span>로그아웃</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
