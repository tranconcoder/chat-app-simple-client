import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authSlice from './slices/auth.slice';
import intervalSlice from './slices/interval.slice';
import toastMessageSlice from './slices/toastMessage.slice';

export const store = configureStore({
	reducer: {
		auth: authSlice,
		interval: intervalSlice,
		toastMessage: toastMessageSlice
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
