import type { ReactElement } from 'react';

export interface HandleLoginProps {}

export interface ToastMessageItemProps {
	id: string;
	state: 'showing' | 'normal' | 'closing';
	type: 'success' | 'warning' | 'danger' | 'paragraph';
	title: string;
	content?: string;
	duration?: number;
	createTime?: Date;
}

export interface PinnedChatItemProps {
	seen?: boolean;
}

type SelectedFilter = 'Chats' | 'Status' | 'Calls';
export interface RecentChatsFiltersProps {
	selectedFilter: SelectedFilter;
	setSelectedFilter: React.Dispatch<React.SetStateAction<SelectedFilter>>;
	filterList: SelectedFilter[];
}

export interface RecentChatsContentListProps {
	selectedFilter?: SelectedFilter;
	dataToRender: RecentChatsChatItemProps[];
}

export interface RecentChatsChatItemProps {
	peopleId: string;
	avatar: string;
	name: string;
	lastMessage?: string;
	lastMessageSendTime?: number;
	unSeenCount?: number;
}

export interface ChatPageHeaderProps {
	active: boolean;
	name: string;
	avatar: string;
}

export interface ChatPageMessageListProps {
	avatar: string;
	messageGroupList: {
		peopleId: string;
		messageList: {
			content: string;
			sendTime: number;
			emoji?: Emoji;
		}[];
	}[];
}
