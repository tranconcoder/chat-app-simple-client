import { useEffect, useState } from 'react';
import instance from '../../services/axios/index.axios';
import { RecentChatsChatItemProps } from '../../types/props';
import RecentChatsContentList from '../RecentChatsContentList';

function RecentChatSearchResult({ value }: { value: string }) {
	const [dataToRender, setDataToRender] = useState<
		RecentChatsChatItemProps[]
	>([]);

	useEffect(() => {
		if (!value) return setDataToRender([]);

		instance
			.get('/api/search/chat', {
				params: {
					search: value,
				},
			})
			.then((res) => {
				const userChatList = res.data;

				// eslint-disable-next-line
				setDataToRender(() => {
					const userChatListResult: RecentChatsChatItemProps[] = [];

					while (userChatList.length > 0) {
						const currentUserChat = userChatList.pop();

						userChatListResult.push({
							peopleId:
								currentUserChat.userId ||
								currentUserChat.googleId,
							avatar: currentUserChat.avatar,
							name: currentUserChat.fullName,
						});
					}

					return userChatListResult;
				});
			});
	}, [value]);

	return <RecentChatsContentList dataToRender={dataToRender} />;
}

export default RecentChatSearchResult;
