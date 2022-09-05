import type { RecentChatsChatItemProps } from '../../types/props';

import classNames from 'classnames/bind';

import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import { getSendTimeMessageTitle } from '../../utils/common.util';
import Avatar from '../Avatar';

const cx = classNames.bind(styles);

function RecentChatsChatItem({
	peopleId,
	avatar,
	name,
	lastMessage,
	lastMessageSendTime,
	unSeenCount = 0,
}: RecentChatsChatItemProps) {
	const navigate = useNavigate();

	const handleClickChatItem = () => {
		navigate(`/chat/${peopleId}?avatar=${avatar}`);
	};

	return (
		<li className={cx('chat-item')} onClick={handleClickChatItem}>
			<Avatar src={avatar} size={48} />

			<div className={cx('info-container')}>
				<span>{name}</span>

				{lastMessage && (
					<p className={cx({ unseen: unSeenCount > 0 })}>
						{lastMessage}
					</p>
				)}
			</div>

			<div className={cx('message-info-container')}>
				{lastMessageSendTime && (
					<span className={cx('time')}>
						{getSendTimeMessageTitle(lastMessageSendTime)}
					</span>
				)}

				{unSeenCount >= 2 && (
					<span className={cx('un-seen-count')}>
						<span>{unSeenCount >= 100 ? '99+' : unSeenCount}</span>
					</span>
				)}
			</div>
		</li>
	);
}

export default RecentChatsChatItem;
