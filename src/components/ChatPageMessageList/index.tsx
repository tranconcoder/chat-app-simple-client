import classNames from 'classnames/bind';
import { useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useCheckMyId } from '../../hooks/useCheckMyId.hook';
import { ChatPageMessageListProps } from '../../types/props';
import { getSendTimeMessageTitle } from '../../utils/common.util';
import Avatar from '../Avatar';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

function ChatPageMessageList({
	messageGroupList,
	avatar,
}: ChatPageMessageListProps) {
	const chatPageMessageListContainerRef = useRef<HTMLUListElement>(null);
	const checkMessageFromMe = useCheckMyId();

	useEffect(() => {
		const chatPageMessageListContainer =
			chatPageMessageListContainerRef.current as HTMLUListElement;
		const lastChild =
			chatPageMessageListContainer.lastChild as HTMLLIElement;

		lastChild?.scrollIntoView();
	});

	return (
		<ul
			className={cx('chat-page-message-group-list')}
			ref={chatPageMessageListContainerRef}
		>
			{messageGroupList.map((messageGroup) => {
				const messageGroupSendTimeTitle = getSendTimeMessageTitle(
					messageGroup.messageList.at(-1)?.sendTime ||
						new Date().getTime()
				);

				return (
					<li
						key={uuidv4()}
						className={cx('message-group', {
							'message-from-me': checkMessageFromMe(
								messageGroup.peopleId
							),
						})}
					>
						{!checkMessageFromMe(messageGroup.peopleId) && (
							<Avatar src={avatar} size={30} active />
						)}

						<ul className={cx('message-content-list')}>
							<li className={cx('timestamps')}>
								{messageGroupSendTimeTitle}
							</li>

							{messageGroup.messageList.map((message, index) => (
								<li
									key={index}
									className={cx(
										'message-content-item',
										message.emoji
									)}
								>
									{message.content}
								</li>
							))}
						</ul>
					</li>
				);
			})}
		</ul>
	);
}

export default ChatPageMessageList;
