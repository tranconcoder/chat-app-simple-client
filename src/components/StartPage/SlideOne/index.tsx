import classNames from 'classnames/bind';

import ThumbnailContainer from '../LogoContainer';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

function SlideOne() {
	return (
		<div className={cx('slide-one')}>
			<ThumbnailContainer animation="firstAnimation" />

			<div className={cx('text-box')}>
				<h2>Welcome</h2>
				<p>Let's help you get started</p>
			</div>
		</div>
	);
}

export default SlideOne;
