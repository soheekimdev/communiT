import { zodResolver } from '@hookform/resolvers/zod';
import { Control, useForm, Path } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { notificationSettingsSchema } from '@/schemas/settingsSchema';

type NotificationFormValues = z.infer<typeof notificationSettingsSchema>;

type SettingItem = {
  label: string;
  field:
    | keyof NotificationFormValues['commentNotification']
    | keyof NotificationFormValues['challengeNotification'];
};

type SwitchItemProps = {
  control: Control<NotificationFormValues>;
  name: Path<NotificationFormValues>;
  label: string;
  description?: string;
};

type SettingsSectionProps = {
  title: string;
  items: SettingItem[];
  control: Control<NotificationFormValues>;
  baseFieldName: keyof NotificationFormValues;
};

const SwitchItem = ({ control, name, label, description }: SwitchItemProps) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <FormLabel className="text-base">{label}</FormLabel>
          {description && <FormDescription>{description}</FormDescription>}
        </div>
        <FormControl>
          <Switch checked={field.value as boolean} onCheckedChange={field.onChange} />
        </FormControl>
      </FormItem>
    )}
  />
);

const SettingsSection = ({ title, items, control, baseFieldName }: SettingsSectionProps) => (
  <div className="space-y-4">
    <h3 className="text-lg font-medium">{title}</h3>
    <div className="space-y-4">
      {items.map(({ label, field }) => (
        <SwitchItem
          key={field}
          control={control}
          name={`${baseFieldName}.${field}` as Path<NotificationFormValues>}
          label={label}
        />
      ))}
    </div>
  </div>
);

const defaultValues: NotificationFormValues = {
  desktopNotification: true,
  commentNotification: {
    newComment: true,
    likePost: true,
    likeComment: true,
  },
  challengeNotification: {
    start: true,
    complete: true,
    newChallenge: true,
  },
};

const settingsSections: Array<Omit<SettingsSectionProps, 'control'>> = [
  {
    title: '게시글/댓글 알림',
    baseFieldName: 'commentNotification',
    items: [
      { label: '내 게시글에 달린 댓글', field: 'newComment' },
      { label: '내 게시글을 추천함', field: 'likePost' },
      { label: '내 댓글을 추천함', field: 'likeComment' },
    ],
  },
  {
    title: '챌린지 알림',
    baseFieldName: 'challengeNotification',
    items: [
      { label: '챌린지 시작', field: 'start' },
      { label: '챌린지 종료', field: 'complete' },
      { label: '관심 카테고리의 새로운 챌린지', field: 'newChallenge' },
    ],
  },
];

const NotificationForm = () => {
  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues,
  });

  const onSubmit = async (data: NotificationFormValues) => {
    console.log('설정 저장 버튼 클릭', data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[600px] space-y-8">
        <SwitchItem
          control={form.control}
          name="desktopNotification"
          label="데스크톱 알림 표시"
          description="이 브라우저에서 알림 받기"
        />

        {settingsSections.map(section => (
          <SettingsSection key={section.title} {...section} control={form.control} />
        ))}

        <Button type="submit">설정 저장</Button>
      </form>
    </Form>
  );
};

export default NotificationForm;
