import { SunMoon, Sun, Moon, Laptop } from 'lucide-react';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/components/theme-provider';

type Theme = 'light' | 'dark' | 'system';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const themeOptions = [
    { value: 'light', label: '라이트 모드', icon: Sun },
    { value: 'dark', label: '다크 모드', icon: Moon },
    { value: 'system', label: '시스템 설정', icon: Laptop },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <div className="flex items-center w-full gap-4 px-2 py-2">
              <SunMoon className="w-5 h-5" />
              <span>테마 설정</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {themeOptions.map(option => {
          const Icon = option.icon;
          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => setTheme(option.value as Theme)}
              className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:scale-110"
            >
              <Icon className="w-4 h-4" />
              <span>{option.label}</span>
              {theme === option.value && (
                <span className="ml-auto text-sm font-medium text-primary">✓</span>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
