import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { RecentChatsChatItemProps, SelectedFilter } from '../../types/props';
import RecentChatsContentList from '../RecentChatsContentList';
import RecentChatsFilters from '../RecentChatsFilter';
import RecentChatsHeader from '../RecentChatsHeader';

import defaultAvatar from '../../assets/images/default-avatar.png';
import { useAppSelector } from '../../redux/hooks';
import styles from './index.module.scss';
import RecentChatSearchResult from '../RecentChatsSearchResult';
import axios from 'axios';
import instance from '../../services/axios/index.axios';

const cx = classNames.bind(styles);

function RecentChats() {
	const [filterList] = useState<SelectedFilter[]>([
		'Chats',
		'Status',
		'Calls',
	]);
	const [selectedFilter, setSelectedFilter] = useState(filterList[0]);
	const googleId = useAppSelector((state) => state.auth.googleId);
	const [searching, setSearching] = useState(false);
	const [searchInput, setSearchInput] = useState('');
	const [recentChatList, setRecentChatList] = useState<
		RecentChatsChatItemProps[]
	>([]);

	const handleClickSearchIcon = () => setSearching(!searching);
	const handleChangeSearchInput = (value: string) => {
		setSearchInput(value);
	};
	// useEffect(() => {
	// 	instance
	// 		.get('/api/chat/get-recent-chat-list')
	// 		.then((data) => setRecentChatList(data.data))
	// 		.catch((err) => console.error(err));
	// }, []);

	return (
		<div
			className={cx('recent-chats-wrapper', {
				expand: searching,
			})}
		>
			<RecentChatsHeader
				searchValue={searchInput}
				search={searching}
				toggleSearch={handleClickSearchIcon}
				changeValue={handleChangeSearchInput}
			/>

			{searching && <RecentChatSearchResult value={searchInput} />}

			{!searching && (
				<RecentChatsFilters
					selectedFilter={selectedFilter}
					setSelectedFilter={setSelectedFilter}
					filterList={filterList}
				/>
			)}

			{!searching && (
				<RecentChatsContentList
					dataToRender={recentChatList}
					selectedFilter={selectedFilter}
				/>
			)}
		</div>
	);
}

export default RecentChats;
