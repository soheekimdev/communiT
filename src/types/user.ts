export interface User {
  id: string;
  email: string;
  profileImageUrl: string | null;
  mainLanguage: string | null;
  nationality: string | null;
  bio: string | null;
  externalUrls: string[];
  isEmailVerified: boolean;
  isPrivate: boolean;
  role: string;
  username: string;
  birthday: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UserState {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface AuthResponse {
  account: User;
  accessToken: string;
  refreshToken: string;
}
