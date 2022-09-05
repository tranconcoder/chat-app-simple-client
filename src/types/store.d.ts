import { ObjectAnyKey } from './common';

export interface AuthStore {
	googleId: string;
	userId: string;
	firstName: string;
	lastName: string;
	displayName: string;
	email: string;
	avatar: string;
	gender: 'Male' | 'Female' | '';
	birthDay: {
		day?: number;
		month?: number;
		year?: number;
	};
}

export interface MessageStoreItem extends ObjectAnyKey {
	id: string;
	avatar: string;
	messageList: {
		content: string;
		sendTime: number;
		seen: boolean;
	}[];
}

export interface MessageStore extends Array<MessageStoreItem> {
	[index: number]: MessageStoreItem;
}
