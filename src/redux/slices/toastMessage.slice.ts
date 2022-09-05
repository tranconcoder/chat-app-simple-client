import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { ToastMessageItemProps } from '../../types/props';

interface ToastMessageStore extends Array<any> {
	[index: number]: ToastMessageItemProps;
}

// Define the initial state using that type
const initialState: ToastMessageStore = [];

export const authSlice = createSlice({
	name: 'toastMessage',
	initialState,
	reducers: {
		addMessage(state, action: PayloadAction<ToastMessageItemProps>) {
			const newToastMessageItem: ToastMessageItemProps = {
				...action.payload,
				state: 'showing',
			};

			state.push(newToastMessageItem);
		},

		closeMessage(state, action: PayloadAction<string>) {
			const messageId = action.payload;

			return state.map((messageItem) =>
				messageItem.id === messageId
					? {
							...messageItem,
							state: 'closing',
					  }
					: messageItem
			);
		},

		closeAllMessage(state) {
			return state.map((messageItem) => ({
				...messageItem,
				state: 'closing',
			}));
		},

		removeMessage(state, action: PayloadAction<string>) {
			const messageId = action.payload;

			return state.filter((messageItem) => messageItem.id !== messageId);
		},

		removeAllMessage() {
			return [];
		},
	},
});

export const {
	addMessage,
	closeMessage,
	closeAllMessage,
	removeMessage,
	removeAllMessage,
} = authSlice.actions;

export default authSlice.reducer;
