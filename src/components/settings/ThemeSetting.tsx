import { Sun, Moon, Laptop } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type Theme = 'light' | 'dark' | 'system';

export function ThemeSetting() {
  const { theme, setTheme } = useTheme();

  const themeOptions = [
    { value: 'light', label: '라이트 모드', icon: Sun },
    { value: 'dark', label: '다크 모드', icon: Moon },
    { value: 'system', label: '시스템 설정', icon: Laptop },
  ];

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">테마 설정</h3>
      <RadioGroup
        value={theme}
        onValueChange={value => setTheme(value as Theme)}
        className="grid gap-4"
      >
        {themeOptions.map(option => {
          const Icon = option.icon;
          return (
            <label key={option.value} className="flex items-center gap-3 cursor-pointer">
              <RadioGroupItem value={option.value} />
              <Icon className="w-5 h-5 text-primary" />
              <span>{option.label}</span>
            </label>
          );
        })}
      </RadioGroup>
    </div>
  );
}
