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

export interface AuthState {
  isLoading: boolean;
  isLoggedIn: boolean;
  user: User | null;
  error: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  account: User;
  accessToken: string;
  refreshToken: string;
}
