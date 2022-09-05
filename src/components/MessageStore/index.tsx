import { useEffect } from 'react';
import socket from '../../services/socket/index.socket';
import { SendMessageResponse } from '../../types/socket';

function MessageStore() {
	useEffect(() => {
		const handleReceiveMessage = (data: SendMessageResponse) => {
			console.log(data);
		};

		socket.on('receive-message', handleReceiveMessage);
	}, []);

	return null;
}

export default MessageStore;
