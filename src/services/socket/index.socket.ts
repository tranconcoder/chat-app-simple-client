import { io } from 'socket.io-client';
import { hostName } from '../../config/host.config';
import { getCookie } from '../../utils/cookie.util';

const socket = io(hostName, {
	path: '/socket',
	auth: (cb) => {
		cb({ token: getCookie('accessToken') });
	},
});

export default socket;
