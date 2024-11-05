export interface NotificationSettings {
  desktopNotification: boolean;
  commentNotification: {
    newComment: boolean;
    likePost: boolean;
    likeComment: boolean;
  };
  challengeNotification: {
    start: boolean;
    complete: boolean;
    newChallenge: boolean;
  };
}
