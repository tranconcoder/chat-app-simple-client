import axios from 'axios';
import { hostName } from '../../config/host.config';
import { getCookie } from '../../utils/cookie.util';

const instance = axios.create({
	baseURL: hostName,
	headers: {
		'Content-Type': 'application/json',
		authorization: getCookie('accessToken'),
	},
});

instance.interceptors.request.use(
	(config) => ({
		...config,
		headers: {
			...config.headers,
			authorization: getCookie('accessToken'),
		},
	}),
	(error) => {
		Promise.reject(error);
	}
);

export default instance;
