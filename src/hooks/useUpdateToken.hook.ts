import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setIntervals } from '../redux/slices/interval.slice';
import instance from '../services/axios/index.axios';
import { getCookie, setCookie } from '../utils/cookie.util';

export default function useUpdateToken() {
	const dispatch = useAppDispatch();
	const updateAccessTokenInterval = useAppSelector(
		(state) => state.interval.updateAccessToken
	);
	const updateRefreshTokenInterval = useAppSelector(
		(state) => state.interval.updateRefreshToken
	);

	const handleUpdateAccessToken = () => {
		const refreshToken = getCookie('refreshToken');

		instance
			.get('/api/token/get-new-access-token', {
				headers: {
					Authorization: `Bearer ${refreshToken}`,
				},
			})
			.then((data) => {
				setCookie('accessToken', data.data.accessToken, 3 * 60 * 1000);
			});
	};

	const handleUpdateRefreshToken = () => {
		const refreshToken = getCookie('refreshToken');

		instance
			.get('/api/token/get-new-refresh-token', {
				headers: {
					Authorization: `Bearer ${refreshToken}`,
				},
			})
			.then((data) => {
				setCookie(
					'refreshToken',
					data.data.refreshToken,
					1 * 60 * 60 * 1000
				);
			});
	};

	return (refreshToken?: string) => {
		setCookie(
			'refreshToken',
			refreshToken || getCookie('refreshToken'),
			1 * 60 * 60 * 1000
		);

		clearInterval(updateAccessTokenInterval);
		clearInterval(updateRefreshTokenInterval);

		handleUpdateAccessToken();
		handleUpdateRefreshToken();

		dispatch(
			setIntervals({
				updateAccessToken: setInterval(
					handleUpdateAccessToken,
					2.5 * 60 * 1000
				) as any,
				updateRefreshToken: setInterval(
					handleUpdateRefreshToken,
					50 * 60 * 1000
				) as any,
			})
		);
	};
}
