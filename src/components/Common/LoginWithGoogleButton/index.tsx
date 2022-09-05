import classNames from 'classnames/bind';
import { ButtonHTMLAttributes } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useLogin } from '../../../hooks/useLogin.hook';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

interface LoginWithGoogleButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {}

function LoginWithGoogleButton({
	onClick,
	...allAttributes
}: LoginWithGoogleButtonProps) {
	const { triggerLogin } = useLogin();

	const handleClick = (e: any) => {
		onClick && onClick(e);
		triggerLogin();
	};

	return (
		<button
			{...allAttributes}
			className={cx('login-with-google')}
			onClick={handleClick}
			type="button"
		>
			<FcGoogle />
			<span>Đăng nhập với Google</span>
		</button>
	);
}

export default LoginWithGoogleButton;
