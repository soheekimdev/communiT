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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/RTK/store';
import { logout } from '@/RTK/authSlice';

const mainMenuItems = [
  { title: '홈', url: '/', icon: Home },
  { title: '챌린지', url: '/challenges', icon: Dumbbell },
  { title: '커뮤니티', url: '/posts', icon: Users },
];

const AppSidebar = () => {
  const dispatch = useDispatch();
  const { setOpenMobile } = useSidebar(); // useSidebar hook 사용
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn); // 로그인 상태 가져오기

  const handleClick = () => {
    setOpenMobile(false); // 메뉴 클릭 시 사이드바 닫기
  };

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
                  onClick={handleClick}
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
