import classNames from 'classnames/bind';
import ChatMenuPageHeader from '../../components/ChatMenuPageHeader';
import PinnedChats from '../../components/PinnedChat';
import RecentChats from '../../components/RecentChats';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

function ChatMenuPage() {
	return (
		<div className={cx('chat-page')}>
			<ChatMenuPageHeader />

			<PinnedChats />

			<RecentChats />
		</div>
	);
}

export default ChatMenuPage;
