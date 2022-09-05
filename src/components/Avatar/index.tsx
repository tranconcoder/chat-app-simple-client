import classNames from 'classnames/bind';
import { CSSProperties } from 'react';

import styles from './index.module.scss';
import defaultAvatar from '../../assets/images/default-avatar.png';

const cx = classNames.bind(styles);

function Avatar({
	src,
	size,
	active = false,
	styles,
}: {
	src: string;
	size: number;
	active?: boolean;
	styles?: CSSProperties;
}) {
	const style = {
		...styles,
		'--size': `${size}px`,
	} as CSSProperties;

	return (
		<div className={cx('avatar-container', { active })} style={style}>
			<img
				src={src}
				referrerPolicy="no-referrer"
				alt="avatar"
				onError={({ currentTarget }) => {
					currentTarget.src = defaultAvatar;
				}}
			/>

			<div className={cx('active-dot')}></div>
		</div>
	);
}

export default Avatar;
