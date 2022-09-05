import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { copyFieldValueObj } from '../../utils/object.util';

interface IntervalStore {
	updateAccessToken: number;
	updateRefreshToken: number;
}

// Define the initial state using that type
const initialState: IntervalStore = {
	updateAccessToken: -1,
	updateRefreshToken: -1,
};

export const intervalSlice = createSlice({
	name: 'interval',
	initialState,
	reducers: {
		setIntervals(state, action: PayloadAction<Partial<IntervalStore>>) {
			copyFieldValueObj(state, action.payload);
		},
	},
});

export const { setIntervals } = intervalSlice.actions;

export default intervalSlice.reducer;
