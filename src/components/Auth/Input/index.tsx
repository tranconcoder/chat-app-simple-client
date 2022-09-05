import classNames from 'classnames/bind';
import { FieldProps } from 'formik';

import { CSSProperties, InputHTMLAttributes, useEffect, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { BiErrorCircle } from 'react-icons/bi';
import useDebounce from '../../../hooks/useDebounce.hook';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

function Input({
	field,
	form,
	meta,
	showAndHidePassword = false,
	parentStyle = {},
	debounce,
	...props
}: FieldProps & {
	showAndHidePassword?: boolean;
	parentStyle?: CSSProperties;
	debounce?: {
		callback: (value: string) => any;
		duration: number;
	};
} & InputHTMLAttributes<HTMLInputElement>) {
	const [touched, setTouched] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const debounceValue = useDebounce(field.value, debounce?.duration || 500);

	const toggleShowPassword = () => setShowPassword(!showPassword);
	const handleBlur = (e: any) => {
		field.onBlur(e);
		setTouched(true);
	};
	const handleChange = (e: any) => {
		field.onChange(e);
		setTouched(true);
	};

	useEffect(() => {
		debounce?.callback(field.value);
	}, [debounceValue]); // eslint-disable-line

	return (
		<div className={cx('input-container')} style={parentStyle}>
			<div>
				<input
					{...props}
					{...field}
					type={
						showAndHidePassword
							? showPassword
								? 'text'
								: 'password'
							: props.type || 'text'
					}
					name={field.name}
					value={field.value}
					onChange={handleChange}
					onBlur={handleBlur}
				/>

				{showAndHidePassword && (
					<div
						className={cx('toggle-password')}
						onClick={toggleShowPassword}
					>
						{showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
					</div>
				)}
			</div>

			{form.errors[field.name] && !!(touched || form.submitCount) && (
				<p className={cx('error-message')}>
					<BiErrorCircle />
					<span>{form.errors[field.name] as string}</span>
				</p>
			)}
		</div>
	);
}

export default Input;
