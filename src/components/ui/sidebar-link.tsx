import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SidebarMenuButton, useSidebar } from './sidebar';

interface SidebarLinkProps extends React.ComponentPropsWithoutRef<typeof Link> {
  icon: LucideIcon;
  children: React.ReactNode;
}

const SidebarLink = ({ to, icon: Icon, children, className }: SidebarLinkProps) => {
  const { setOpenMobile } = useSidebar();
  const handleClick = () => {
    setOpenMobile(false); // 모바일 버전에서 메뉴 클릭 시 사이드바 닫기
  };

  return (
    <SidebarMenuButton asChild>
      <Link
        to={to}
        onClick={handleClick}
        className={cn('flex items-center w-full gap-4 px-2 py-2', className)}
      >
        <Icon className="w-5 h-5" />
        <span>{children}</span>
      </Link>
    </SidebarMenuButton>
  );
};

export default SidebarLink;
