import classNames from 'classnames/bind';

import styles from './index.module.scss';
import tapoLogo from '../../assets/images/logo.png';
import { useAppSelector } from '../../redux/hooks';

const cx = classNames.bind(styles);

function ChatMenuPageHeader() {
	const avatar = useAppSelector((state) => state.auth.avatar);

	return (
		<header className={cx('chat-page-header')}>
			<div className={cx('header-container')}>
				<div className={cx('tapo')}>
					<img src={tapoLogo} alt="tapo-logo" />
					<span>Tapo</span>
				</div>

				<div className={cx('user')}>
					<img src={avatar} alt="avatar" />
				</div>
			</div>
		</header>
	);
}

export default ChatMenuPageHeader;
