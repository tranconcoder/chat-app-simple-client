import { IoMdSend } from 'react-icons/io';
import { MdEmojiEmotions } from 'react-icons/md';
import styles from './index.module.scss';

import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useSocket from '../../hooks/useSocket.hook';
import { useAppSelector } from '../../redux/hooks';
import { SendMessagePayload } from '../../types/socket';
import { addNewMessage } from '../../utils/chatPage.util';
import { ChatPageMessageListToRender } from '../../types/messageSchema';

const cx = classNames.bind(styles);

function ChatPageTyping({
	handleAddNewMessage,
	handleUpdateMessageList,
}: {
	handleAddNewMessage: typeof addNewMessage;
	handleUpdateMessageList: React.Dispatch<
		React.SetStateAction<ChatPageMessageListToRender>
	>;
}) {
	const socket = useSocket();
	const params = useParams();

	const [messageValue, setMessageValue] = useState('');
	const messageInputRef = useRef<HTMLInputElement>(null);
	const googleId = useAppSelector((state) => state.auth.googleId);
	const userId = useAppSelector((state) => state.auth.userId);

	const handleChangeInput = (e: any) => {
		setMessageValue(e.target.value);
	};
	const handleSendMessage = (e: any) => {
		e.preventDefault();

		messageInputRef.current?.focus();
		setMessageValue('');

		const sendMessagePayload: SendMessagePayload = {
			to: params.id as string,
			content: messageValue,
		};

		handleAddNewMessage(
			{
				from: (userId || googleId) as string,
				to: params.id as string,
				content: messageValue,
				sendTime: new Date().getTime(),
				seen: false,
			},
			handleUpdateMessageList
		);

		socket.emit('send-message', sendMessagePayload);
	};

	return (
		<div className={cx('chat-page-typing')}>
			<form className={cx('form')}>
				<MdEmojiEmotions className={cx('emoji')} />

				<input
					ref={messageInputRef}
					className={cx('message-input')}
					type="text"
					placeholder="Send message..."
					value={messageValue}
					autoFocus
					onChange={handleChangeInput}
				/>

				<button
					onClick={handleSendMessage}
					disabled={messageValue.length === 0}
				>
					<IoMdSend
						className={cx('send-message-button', {
							active: messageValue.length > 0,
						})}
					/>
				</button>
			</form>
		</div>
	);
}

export default ChatPageTyping;
