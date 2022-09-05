import classNames from 'classnames/bind';
import { CSSProperties, useEffect } from 'react';

import styles from './index.module.scss';
import pinIcon from '../../assets/images/pin-icon.svg';
import PinnedChatItem from '../PinnedChatItem';

const cx = classNames.bind(styles);

function PinnedChats() {
	useEffect(() => {}, []);

	return (
		<div className={cx('pinned-chats')}>
			<ul
				className={cx('pinned-chat-list')}
				style={{ '--pin-icon': `url(${pinIcon})` } as CSSProperties}
			>
				<PinnedChatItem seen />
				<PinnedChatItem />
				<PinnedChatItem seen />
				<PinnedChatItem seen />
			</ul>
		</div>
	);
}

export default PinnedChats;
