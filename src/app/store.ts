import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import authReducer from '../modules/auth/slices';

export const store = configureStore({
    reducer:{
        auth: authReducer,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
