import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import challengeReducer from './challengeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    challenge: challengeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
