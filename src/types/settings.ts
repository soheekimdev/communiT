export interface NotificationSettings {
  desktopNotification: boolean;
  commentNotification: {
    newComment: boolean;
    likePost: boolean;
    likeComment: boolean;
  };
  challengeNotification: {
    inProgress: boolean;
    start: boolean;
    complete: boolean;
    newChallenge: boolean;
  };
}
