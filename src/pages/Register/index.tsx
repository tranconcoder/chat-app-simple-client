import classNames from 'classnames/bind';

import { Field, Form, Formik, FormikHelpers } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import tapoLogo from '../../assets/images/logo.png';
import Input from '../../components/Auth/Input';
import { registerValidationSchema } from '../../config/validateSchema.config';
import { useAppDispatch } from '../../redux/hooks';
import { addMessage } from '../../redux/slices/toastMessage.slice';
import instance from '../../services/axios/index.axios';
import type { RegisterInitValues } from '../../types/formik';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

function RegisterPage() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const registerInitValues: RegisterInitValues = {
		username: '',
		password: '',
		confirmPassword: '',
		firstName: '',
		lastName: '',
		email: '',
		gender: '',
	};

	const handleSubmit = (
		values: typeof registerInitValues,
		helpers: FormikHelpers<typeof registerInitValues>
	) => {
		console.log(values);

		instance
			.post('/auth/register', values)
			.then((res) => {
				if (res.statusText !== 'OK') return;

				dispatch(
					addMessage({
						id: uuidv4(),
						title: 'Đăng ký thành công!',
						type: 'success',
						state: 'showing',
					})
				);

				navigate('/auth/login');
			})
			.catch(() => {});
	};
	const handleCheckUsername = (value: string) => {
		instance
			.get('/auth/check-user-name', {
				params: {
					username: value,
				},
			})
			.then((res) => console.log(res))
			.catch(() => {});
	};

	return (
		<div className={cx('register-page')}>
			<header className={cx('header')}>
				<div className={cx('circle')}></div>

				<img src={tapoLogo} alt="logo" />
			</header>

			<div className={cx('body')}>
				<h2 className={cx('title')}>Đăng ký</h2>

				<Formik
					initialValues={registerInitValues}
					onSubmit={handleSubmit}
					validationSchema={registerValidationSchema}
				>
					<Form className={cx('form')}>
						<Field
							name="username"
							placeholder="Tên đăng nhập..."
							component={Input}
							style={{ height: 50 }}
							parentStyle={{ marginTop: 40 }}
							debounce={{
								callback: handleCheckUsername,
								duration: 1000,
							}}
						/>

						<Field
							name="password"
							type="password"
							placeholder="Mật khẩu..."
							component={Input}
							style={{ height: 50 }}
							parentStyle={{ marginTop: 20 }}
						/>

						<Field
							name="confirmPassword"
							type="password"
							placeholder="Nhập lại mật khẩu..."
							component={Input}
							style={{ height: 50 }}
							parentStyle={{ marginTop: 20 }}
						/>

						<Field
							name="firstName"
							placeholder="Họ ..."
							component={Input}
							style={{ height: 50 }}
							parentStyle={{ marginTop: 20 }}
						/>

						<Field
							name="lastName"
							placeholder="Tên ..."
							component={Input}
							style={{ height: 50 }}
							parentStyle={{ marginTop: 20 }}
						/>

						<Field
							name="email"
							placeholder="Email ..."
							component={Input}
							style={{ height: 50 }}
							parentStyle={{ marginTop: 20 }}
						/>

						<label>
							<Field type="radio" value="male" name="gender" />
							<span>Nam</span>
						</label>

						<label>
							<Field type="radio" value="female" name="gender" />
							<span>Nữ</span>
						</label>

						<button type="submit">
							<p>Đăng ký</p>
						</button>

						<footer className={cx('form-footer')}>
							<Link to="/auth/login">
								<p>Đăng nhập</p>
							</Link>
						</footer>
					</Form>
				</Formik>
			</div>
		</div>
	);
}

export default RegisterPage;
