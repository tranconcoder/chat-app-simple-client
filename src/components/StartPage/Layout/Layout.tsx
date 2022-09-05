import classNames from 'classnames/bind';
import { ReactElement, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { sleep } from '../../../utils/common.util';
// import { v4 as uuid } from 'uuid';

import styles from './Layout.module.scss';

const cx = classNames.bind(styles);

interface StartPageLayoutProps {
	bodyElement: ReactElement;
}

function StartPageLayout({ bodyElement }: StartPageLayoutProps) {
	const MAX_STEP = 3;

	const navigate = useNavigate();

	const location = useLocation();
	const currentStep = Number(location.pathname.split('/').at(-1));

	const [isHiding, setIsHiding] = useState(false);

	const renderStep = () => {
		const spanList = [];

		for (let index = 1; index <= MAX_STEP; index++) {
			spanList.push(
				<span
					key={index}
					onClick={() => startPageToGo(index)}
					className={cx({ active: index === currentStep })}
				></span>
			);
		}

		return spanList;
	};

	const startPageToGo = async (step: number) => {
		if (step > MAX_STEP) navigate('/auth/login');
		else {
			setIsHiding(true);

			await sleep(500);

			const newPath = `${location.pathname
				.split('/')
				.slice(0, -1)
				.join('/')}/${step}`;

			navigate(newPath);
		}
	};

	useEffect(() => setIsHiding(false), [location]);

	return (
		<div className={cx('start-page-layout')}>
			<div className={cx('body', { hide: isHiding })}>{bodyElement}</div>

			<footer className={cx('footer')}>
				<div className={cx('step')}>{renderStep()}</div>

				<button onClick={() => startPageToGo(currentStep + 1)}>
					{currentStep === MAX_STEP ? 'Get stated' : 'Skip'}
				</button>
			</footer>
		</div>
	);
}

export default StartPageLayout;
