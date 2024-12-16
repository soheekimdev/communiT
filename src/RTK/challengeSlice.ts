import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Challenge } from '@/types/challenge';
import { updateChallenge } from '@/api/challenges';
import { RootState } from './store';

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

const challengeSlice = createSlice({
  name: 'challenge',
  initialState,
  reducers: {
    setCurrentChallenge: (state, action) => {
      state.currentChallenge = action.payload;
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
      });
  },
});

export const { setCurrentChallenge } = challengeSlice.actions;

export const selectCurrentChallenge = (state: RootState) => state.challenge.currentChallenge;
export const selectChallengeLoading = (state: RootState) => state.challenge.loading;
export const selectChallengeError = (state: RootState) => state.challenge.error;

export default challengeSlice.reducer;