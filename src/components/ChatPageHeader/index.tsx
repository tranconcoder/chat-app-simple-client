import type { ChatPageHeaderProps } from '../../types/props';

import classNames from 'classnames/bind';

import styles from './index.module.scss';
import { ReactComponent as BackIcon } from '../../assets/images/back-icon.svg';
import { ReactComponent as CallIcon } from '../../assets/images/chat-page/call-icon.svg';
import { ReactComponent as VideoCallIcon } from '../../assets/images/chat-page/video-call-icon.svg';
import { MdMoreVert } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Avatar from '../Avatar';

const cx = classNames.bind(styles);

function ChatPageHeader({ active, avatar, name }: ChatPageHeaderProps) {
	const navigate = useNavigate();
	const handleClickBackIcon = () => navigate('/chat');

	return (
		<header className={cx('header')}>
			<BackIcon
				className={cx('back-button')}
				onClick={handleClickBackIcon}
			/>

			<Avatar active size={48} src={avatar} styles={{ marginLeft: 8 }} />

			<div className={cx('info-container')}>
				<h3 className={cx('name')}>{name}</h3>

				<span className={cx('active-status')}>Đang hoạt động</span>
			</div>

			<CallIcon className={cx('call-button')} />
			<VideoCallIcon className={cx('video-call-button')} />
			<MdMoreVert className={cx('more-button')} />
		</header>
	);
}

export default ChatPageHeader;
