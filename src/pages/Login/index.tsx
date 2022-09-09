import classNames from 'classnames/bind';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import LoginWithGoogleButton from '../../components/Common/LoginWithGoogleButton';

import jwtDecode from 'jwt-decode';
import tapoLogo from '../../assets/images/logo.png';
import Input from '../../components/Auth/Input';
import { loginValidationSchema } from '../../config/validateSchema.config';
import useUpdateToken from '../../hooks/useUpdateToken.hook';
import { setAuth } from '../../redux/slices/auth.slice';
import instance from '../../services/axios/index.axios';
import { AuthStore } from '../../types/store';
import styles from './index.module.scss';
import { addMessage } from '../../redux/slices/toastMessage.slice';
import { v4 as uuidv4 } from 'uuid';

const cx = classNames.bind(styles);

const authFormValues = {
	username: '',
	password: '',
};

function LoginPage() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const updateToken = useUpdateToken();

	const googleId = useAppSelector((state) => state.auth.googleId);
	const userId = useAppSelector((state) => state.auth.userId);

	useEffect(() => {
		if (googleId || userId) navigate('/chat');
	}, [googleId, userId]); // eslint-disable-line

	const handleSubmit = (
		values: typeof authFormValues,
		helper: FormikHelpers<typeof authFormValues>
	) => {
		instance
			.post('/auth/login', values)
			.then((res) => {
				const data = res.data;

				if (data.refreshToken) {
					const userProfile: AuthStore = jwtDecode(data.refreshToken);

					updateToken(data.refreshToken);
					dispatch(setAuth(userProfile));
				}
			})
			.catch((err) => {
				dispatch(
					addMessage({
						id: uuidv4(),
						title: 'Đăng nhập thất bại, vui lòng kiểm tra tên đăng nhập hoặc mật khẩu!',
						type: 'danger',
						state: 'showing',
					})
				);
			});
	};

	return (
		<div className={cx('login-page')}>
			<header className={cx('header-container')}>
				<div className={cx('circle')}></div>

				<img src={tapoLogo} alt="logo" />
			</header>

			<div className={cx('body')}>
				<Formik
					initialValues={authFormValues}
					validationSchema={loginValidationSchema}
					onSubmit={handleSubmit}
				>
					<Form className={cx('form')}>
						<LoginWithGoogleButton
							style={{ width: 320, maxWidth: '90vw' }}
						/>

						<p className={cx('separate')}>Hoặc</p>

						<Field
							name="username"
							placeholder="Tên đăng nhập..."
							component={Input}
							style={{ height: 50 }}
						/>

						<Field
							name="password"
							placeholder="Mật khẩu..."
							component={Input}
							style={{ height: 50 }}
							parentStyle={{ marginTop: 20 }}
							showAndHidePassword
						/>

						<button type="submit">
							<p>Đăng nhập</p>
						</button>

						<footer className={cx('form-footer')}>
							<Link to="/auth/login">Quên mật khẩu?</Link>
							<Link to="/auth/register">Đăng ký</Link>
						</footer>
					</Form>
				</Formik>
			</div>
		</div>
	);
}

export default LoginPage;
