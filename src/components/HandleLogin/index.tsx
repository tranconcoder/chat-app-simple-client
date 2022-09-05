import { AxiosResponse } from 'axios';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { useEffect } from 'react';

import useUpdateToken from '../../hooks/useUpdateToken.hook';
import { useAppDispatch } from '../../redux/hooks';
import { setAuth } from '../../redux/slices/auth.slice';
import instance from '../../services/axios/index.axios';
import { Profile } from '../../types/common';
import { HandleLoginProps } from '../../types/props';
import { getCookie } from '../../utils/cookie.util';

function HandleLogin(props: HandleLoginProps) {
	const dispatch = useAppDispatch();
	const updateToken = useUpdateToken();

	const handleSetProfile = (data: AxiosResponse) => {
		const profile = jwtDecode<JwtPayload & Profile>(data.data.accessToken);

		dispatch(setAuth(profile));
	};

	useEffect(() => {
		const refreshToken = getCookie('refreshToken');

		if (refreshToken) {
			instance
				.get('/api/token/get-new-access-token', {
					headers: {
						Authorization: `Bearer ${refreshToken}`,
					},
				})
				.then(handleSetProfile)
				.then(() => updateToken(refreshToken))
				.catch(() => {});
		}
	}, []); // eslint-disable-line

	return null;
}

export default HandleLogin;
