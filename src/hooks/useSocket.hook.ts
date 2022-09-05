import { io } from 'socket.io-client';
import { hostName } from '../config/host.config';
import { getCookie } from '../utils/cookie.util';

const socket = io(hostName, {
	path: '/socket',
	extraHeaders: {
		authorization: `Bearer ${getCookie('accessToken')}`,
	},
});

export default function useSocket() {
	return socket;
}
