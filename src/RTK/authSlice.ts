import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../api/auth';
import type { User } from '../types/auth';

interface AuthState {
  isLoading: boolean;
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  error: string | null;
}

const initialState: AuthState = {
  isLoading: false,
  isLoggedIn: !!localStorage.getItem('accessToken'),
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
  token: localStorage.getItem('accessToken') || null,
  error: null,
};

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await authAPI.signin(email, password);
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.account));
      return response.account;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || '로그인에 실패했습니다.');
    }
  },
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (
    {
      email,
      password,
      confirmPassword,
      username,
    }: { email: string; password: string; confirmPassword: string; username: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await authAPI.signup(email, password, confirmPassword, username);
      return response.account;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || '회원가입에 실패했습니다.');
    }
  },
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const user = await authAPI.getCurrentUser();
      return user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || '사용자 정보 조회에 실패했습니다.');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      state.error = null;
      authAPI.logout();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    },
    setAccessToken(state, action) {
      state.token = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signIn.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
        state.token = localStorage.getItem('accessToken') || '';
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(signUp.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCurrentUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.user = null;
        state.error = action.payload as string;
      });
  },
});

export const { logout, setAccessToken, setError, clearError } = authSlice.actions;
export default authSlice.reducer;
