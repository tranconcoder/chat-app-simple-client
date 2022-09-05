import styles from './index.module.scss';

import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import ChatPageHeader from '../../components/ChatPageHeader';
import ChatPageMessageList from '../../components/ChatPageMessageList';
import ChatPageTyping from '../../components/ChatPageTyping';
import useSocket from '../../hooks/useSocket.hook';
import instance from '../../services/axios/index.axios';
import { ChatPageMessageListToRender } from '../../types/messageSchema';
import { SendMessageResponse } from '../../types/socket';
import { addNewMessage, renderMessages } from '../../utils/chatPage.util';

const cx = classNames.bind(styles);

function ChatPage() {
	const params = useParams();
	const socket = useSocket();
	const [searchParams] = useSearchParams();
	const peopleChatAvatar = searchParams.get('avatar') as string;

	const [messageList, setMessageList] = useState<ChatPageMessageListToRender>(
		[]
	);

	useEffect(() => {
		socket.connect();

		return function () {
			socket.disconnect();
		};
	}, []);

	useEffect(() => {
		instance
			.get('/api/chat/get-chats', {
				params: {
					peopleChatId: params.id,
				},
			})
			.then((data) => {
				const messageList = data.data;

				renderMessages(messageList, setMessageList);
			});
	}, []);

	useEffect(() => {
		const handleReceiveMessage = (data: SendMessageResponse) => {
			addNewMessage(data, setMessageList);
		};

		socket.on('receive-message', handleReceiveMessage);

		return () => {
			socket.removeListener('receive-message', handleReceiveMessage);
		};
	}, []);

	return (
		<div className={cx('chat-page')}>
			<ChatPageHeader
				avatar={peopleChatAvatar}
				active
				name="Trần Văn Còn"
			/>

			<ChatPageMessageList
				avatar={peopleChatAvatar}
				messageGroupList={messageList}
			/>

			<ChatPageTyping
				handleAddNewMessage={addNewMessage}
				handleUpdateMessageList={setMessageList}
			/>
		</div>
	);
}

export default ChatPage;
