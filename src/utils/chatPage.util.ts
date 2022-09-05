import { v4 as uuidv4 } from 'uuid';
import { ChatPageMessageListToRender } from '../types/messageSchema';
import { SendMessageResponse } from '../types/socket';
import React from 'react';

const addMessageToNewGroup = (
	messageGroupList: ChatPageMessageListToRender,
	newMessage: SendMessageResponse
): ChatPageMessageListToRender => {
	return [
		...messageGroupList,
		{
			id: uuidv4(),
			peopleId: newMessage.from,
			messageList: [
				{
					content: newMessage.content,
					sendTime: newMessage.sendTime,
				},
			],
		},
	];
};

export const addNewMessage = (
	newMessage: SendMessageResponse,
	handleSetState: React.Dispatch<
		React.SetStateAction<ChatPageMessageListToRender>
	>
) => {
	handleSetState((messageList) => {
		const newMessageList = structuredClone(messageList);
		const lastMessageGroup = newMessageList.at(-1);
		const currentTime = new Date().getTime();

		if (lastMessageGroup?.peopleId === newMessage.from) {
			const lastMessage = lastMessageGroup.messageList.at(-1);
			const lastMessageSendAt = lastMessage?.sendTime || currentTime;

			if (newMessage.sendTime - lastMessageSendAt > 5 * 60 * 1000) {
				return addMessageToNewGroup(newMessageList, newMessage);
			} else {
				newMessageList.at(-1)?.messageList.push({
					content: newMessage.content,
					sendTime: newMessage.sendTime,
				});

				return newMessageList;
			}
		} else {
			return addMessageToNewGroup(newMessageList, newMessage);
		}
	});
};

export const renderMessages = (
	messageList: SendMessageResponse[],
	handleSetState: React.Dispatch<
		React.SetStateAction<ChatPageMessageListToRender>
	>
) => {
	const messageListToRender: ChatPageMessageListToRender = [];

	messageList.forEach((message, index) => {
		const lastMessage = messageList[index - 1];

		if (!lastMessage) {
			return messageListToRender.push({
				id: uuidv4(),
				peopleId: message.from,
				messageList: [
					{
						content: message.content,
						sendTime: message.sendTime,
					},
				],
			});
		}

		const lastMessageSendTime = lastMessage.sendTime;
		const newMessageSendTime = message.sendTime;

		if (
			newMessageSendTime - lastMessageSendTime > 5 * 60 * 1000 ||
			message.from !== messageListToRender.at(-1)?.peopleId
		) {
			return messageListToRender.push({
				id: uuidv4(),
				peopleId: message.from,
				messageList: [
					{
						content: message.content,
						sendTime: message.sendTime,
					},
				],
			});
		}

		messageListToRender.at(-1)?.messageList.push({
			content: message.content,
			sendTime: message.sendTime,
		});
	});

	handleSetState(messageListToRender);
};
