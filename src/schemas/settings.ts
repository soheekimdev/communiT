import * as z from 'zod';

export const notificationSettingsSchema = z.object({
  desktopNotification: z.boolean(),
  commentNotification: z.object({
    newComment: z.boolean(),
    likePost: z.boolean(),
    likeComment: z.boolean(),
  }),
  challengeNotification: z.object({
    inProgress: z.boolean(),
    start: z.boolean(),
    complete: z.boolean(),
    newChallenge: z.boolean(),
  }),
});

export type NotificationSettings = z.infer<typeof notificationSettingsSchema>;
