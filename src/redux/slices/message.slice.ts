import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { MessageStore, MessageStoreItem } from '../../types/store';

// Define the initial state using that type
const initialState: MessageStore = [];

export const messagesSlice = createSlice({
	name: 'messages',
	initialState,
	reducers: {
		setMessageList(state, action: PayloadAction<MessageStore>) {
			return action.payload;
		},

		addMessage(state, action: PayloadAction<MessageStoreItem>) {
			// if people is exist on MessageStore
			state.forEach((message, index, messageList) => {
				if (action.payload.id === message.id) {
					// merge new messageList to old messageList
					messageList[index].messageList = [
						...messageList[index].messageList,
						...action.payload.messageList,
					];

					return state;
				}
			});

			// if people not exist on MessageStore
			state.push(action.payload);
		},
	},
});

export const { setMessageList } = messagesSlice.actions;

export default messagesSlice.reducer;
