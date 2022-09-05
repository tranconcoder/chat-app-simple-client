import classNames from 'classnames/bind';
import { v4 as uuidv4 } from 'uuid';

import { RecentChatsContentListProps } from '../../types/props';
import RecentChatsChatItem from '../RecentChatsChatItem';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

function RecentChatsContentList({
	selectedFilter,
	dataToRender,
}: RecentChatsContentListProps) {
	return (
		<ul className={cx('recent-chats-content-list')}>
			{dataToRender.map((chat) => (
				<RecentChatsChatItem
					key={uuidv4()}
					peopleId={chat.peopleId}
					avatar={chat.avatar}
					lastMessage={chat.lastMessage}
					lastMessageSendTime={chat.lastMessageSendTime}
					name={chat.name}
					unSeenCount={chat.unSeenCount}
				/>
			))}
		</ul>
	);
}

export default RecentChatsContentList;
