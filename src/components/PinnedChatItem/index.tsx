import classNames from 'classnames/bind';
import { PinnedChatItemProps } from '../../types/props';

import styles from './index.module.scss';
import defaultAvatar from '../../assets/images/default-avatar.png';

const cx = classNames.bind(styles);

function PinnedChatItem({ seen = false }: PinnedChatItemProps) {
	return (
		<li className={cx('pinned-chat-item', { seen })}>
			<div className={cx('user-info')}>
				<img src={defaultAvatar} alt="" />
				<span>
					Quis mollit nostrud laborum ullamco occaecat veniam eu
					aliqua nisi minim duis consectetur.
				</span>
			</div>

			<p className={cx('content')}>Eiusmod veniam elit ad adipisicing.</p>
		</li>
	);
}

export default PinnedChatItem;
