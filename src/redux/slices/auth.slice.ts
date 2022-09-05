import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { copyFieldValueObj } from '../../utils/object.util';
import type { AuthStore } from '../../types/store';
import defaultAvatar from '../../assets/images/default-avatar.png';

// Define the initial state using that type
const initialState: AuthStore = {
	googleId: '',
	userId: '',
	firstName: '',
	lastName: '',
	displayName: '',
	email: '',
	avatar: '',
	gender: '',
	birthDay: {},
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth(state, action: PayloadAction<Partial<AuthStore>>) {
			copyFieldValueObj(state, action.payload);

			if (state.avatar && !state.avatar.includes('http')) {
				state.avatar =
					process.env.REACT_APP_SERVER_DOMAIN + state.avatar;
			} 
			
			if (!state.avatar) {
				state.avatar = defaultAvatar;
			}
		},
	},
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
