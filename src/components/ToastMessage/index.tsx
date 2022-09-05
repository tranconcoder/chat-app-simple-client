import classNames from 'classnames/bind';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
	closeAllMessage,
	removeAllMessage
} from '../../redux/slices/toastMessage.slice';
import { ToastMessageItemProps } from '../../types/props';
import ToastMessageItem from '../ToastMessageItem';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

function ToastMessage() {
	const dispatch = useAppDispatch();
	const toastMessageList = useAppSelector((state) => state.toastMessage);

	const handleRemoveAllMessage = () => {
		dispatch(closeAllMessage());

		setTimeout(() => dispatch(removeAllMessage()), 500);
	};

	return (
		<div
			className={cx('toast-message', {
				hide: toastMessageList.length === 0,
			})}
		>
			<div className={cx('toast-message-wrapper')}>
				<ul className={cx('toast-message-list')}>
					{toastMessageList.map((item: ToastMessageItemProps) => (
						<ToastMessageItem {...item} key={item.id} />
					))}
				</ul>

				{toastMessageList.length >= 3 && (
					<button
						className={cx('remove-all-message-button')}
						onClick={handleRemoveAllMessage}
					>
						<p>Xóa tất cả</p>
					</button>
				)}
			</div>
		</div>
	);
}

export default ToastMessage;
