import classNames from 'classnames/bind';
import ThumbnailContainer from '../LogoContainer';

import styles from './index.module.scss';
import { ReactComponent as CallIcon } from '../../../assets/images/call-icon.svg';
import thumbnail from '../../../assets/images/start-page-slide-three-thumb.svg';
import { CSSProperties } from 'react';

const cx = classNames.bind(styles);

function SlideThree() {
	return (
		<div className={cx('slide-three')}>
			<ThumbnailContainer
				Image={thumbnail}
				style={
					{
						width: 280,
						height: 300,
						'--transform': 'translate(50%, 120px)',
						zIndex: 2,
					} as CSSProperties
				}
			>
				<div className={cx('circle')}></div>
			</ThumbnailContainer>

			<div className={cx('text-box')}>
				<h2>
					<CallIcon />
					<span>Call</span>
				</h2>

				<p>
					Reach out to friends and loved ones via voice or video call
				</p>
			</div>
		</div>
	);
}

export default SlideThree;
