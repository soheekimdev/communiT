import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Challenge } from '@/types/challenge';
import { updateChallenge, likeChallenge, unlikeChallenge } from '@/api/challenges';
import { RootState } from './store';
import axios from 'axios';

type ChallengeState = {
  challenges: Challenge[];
  currentChallenge: Challenge | null;
  loading: boolean;
  error: string | null;
};

const initialState: ChallengeState = {
  challenges: [],
  currentChallenge: null,
  loading: false,
  error: null,
};

export const finishChallenge = createAsyncThunk(
  'challenge/finishChallenge',
  async (challengeId: string) => {
    const response = await updateChallenge(challengeId, { isFinished: true });
    return response;
  },
);

export const reopenChallenge = createAsyncThunk(
  'challenge/reopenChallenge',
  async (challengeId: string) => {
    const response = await updateChallenge(challengeId, { isFinished: false });
    return response;
  },
);

export const toggleChallengeLike = createAsyncThunk(
  'challenge/toggleLike',
  async ({ challengeId, isLiked }: { challengeId: string; isLiked: boolean }) => {
    try {
      if (isLiked) {
        return await unlikeChallenge(challengeId);
      } else {
        return await likeChallenge(challengeId);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          throw new Error('이미 좋아요가 처리된 챌린지입니다.');
        }
        if (error.response?.status === 404) {
          throw new Error('존재하지 않는 챌린지입니다.');
        }
      }
      throw new Error('좋아요 처리 중 오류가 발생했습니다.');
    }
  },
);

const challengeSlice = createSlice({
  name: 'challenge',
  initialState,
  reducers: {
    setCurrentChallenge: (state, action) => {
      state.currentChallenge = action.payload;
    },
    clearChallenge: state => {
      state.currentChallenge = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(finishChallenge.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(finishChallenge.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentChallenge && state.currentChallenge.id === action.payload.id) {
          state.currentChallenge = action.payload;
        }
        const index = state.challenges.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.challenges[index] = action.payload;
        }
      })
      .addCase(finishChallenge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '챌린지 종료 중 오류가 발생했습니다.';
      })
      .addCase(reopenChallenge.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reopenChallenge.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentChallenge && state.currentChallenge.id === action.payload.id) {
          state.currentChallenge = action.payload;
        }
        const index = state.challenges.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.challenges[index] = action.payload;
        }
      })
      .addCase(reopenChallenge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '챌린지 재개 중 오류가 발생했습니다.';
      })
      .addCase(toggleChallengeLike.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleChallengeLike.fulfilled, (state, action) => {
        state.loading = false;
        state.currentChallenge = action.payload;
      })
      .addCase(toggleChallengeLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '좋아요 처리 중 오류가 발생했습니다.';
      });
  },
});

export const { setCurrentChallenge, clearChallenge } = challengeSlice.actions;

export const selectCurrentChallenge = (state: RootState) => state.challenge.currentChallenge;
export const selectChallengeLoading = (state: RootState) => state.challenge.loading;
export const selectChallengeError = (state: RootState) => state.challenge.error;

export default challengeSlice.reducer;
