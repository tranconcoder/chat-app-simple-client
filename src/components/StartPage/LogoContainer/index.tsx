import classNames from 'classnames/bind';

import { ImgHTMLAttributes, ReactElement } from 'react';
import logo from '../../../assets/images/logo.png';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

interface ThumbnailContainerProps extends ImgHTMLAttributes<HTMLImageElement> {
	Image?: string;
	animation?: 'firstAnimation' | 'appearAnimation';
	children?: ReactElement;
}

function ThumbnailContainer({
	Image = logo,
	animation = 'appearAnimation',
	children,
	...allAttribute
}: ThumbnailContainerProps) {
	return (
		<section
			className={cx('logo-container', {
				'first-animation': animation === 'firstAnimation',
			})}
		>
			<div className={cx('circle')}></div>

			<img {...allAttribute} src={Image} alt="thumbnail" />

			{children}
		</section>
	);
}

export default ThumbnailContainer;
