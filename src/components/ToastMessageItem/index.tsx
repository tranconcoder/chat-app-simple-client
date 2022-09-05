import { CSSProperties } from 'react';

import classNames from 'classnames/bind';
import { ToastMessageItemProps } from '../../types/props';

import { IoIosClose } from 'react-icons/io';
import { ReactComponent as AlertIcon } from '../../assets/images/toast-message/alert-icon.svg';
import { ReactComponent as ErrorIcon } from '../../assets/images/toast-message/error-icon.svg';
import { ReactComponent as SuccessIcon } from '../../assets/images/toast-message/success-icon.svg';
import { useAppDispatch } from '../../redux/hooks';
import { closeMessage, removeMessage } from '../../redux/slices/toastMessage.slice';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

function ToastMessageItem({
	duration = 5000,
	id,
	title,
	state,
	type,
	content,
	createTime = new Date(),
}: ToastMessageItemProps) {
	const dispatch = useAppDispatch();
	

	const styles = {
		'--padding': type !== 'paragraph' ? '20px' : '32px',
	} as CSSProperties;

	const createDay = createTime.getDate();
	const currentDay = new Date().getDate();
	const timeContent =
		createDay !== currentDay
			? `Today ${createTime.getHours()}:${createTime.getMinutes()}`
			: `${createTime.getDate()}/${createTime.getMonth()}/${createTime.getFullYear()} ${createTime.getHours()}:${createTime.getMinutes()}`;

	const Icon =
		type === 'success'
			? SuccessIcon
			: type === 'warning'
			? AlertIcon
			: ErrorIcon;

	const handleCloseToastMessage = () => {
		dispatch(closeMessage(id));

		setTimeout(() => {
			dispatch(removeMessage(id));
		}, 500);
	};

	return (
		<div
			className={cx('toast-message-item', {
				closing: state === 'closing',
			})}
			style={styles}
		>
			{type !== 'paragraph' && <Icon className={cx('icon')} />}

			<div className={cx('content-container')}>
				<h3 className={cx('title')}>{title}</h3>

				{type === 'paragraph' && (
					<p className={cx('content')}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Turpis vitae ultrices in sed. Feugiat metus amet, id sed
						volutpat enim sed. Cras vel vitae, lectus id. Egestas
						quam auctor commodo porttitor netus risus enim. Nec mi
						neque malesuada aenean euismod est lorem.
					</p>
				)}

				<span className={cx('time')}>{timeContent}</span>
			</div>

			<IoIosClose
				className={cx('close-btn')}
				onClick={handleCloseToastMessage}
			/>
		</div>
	);
}

export default ToastMessageItem;
