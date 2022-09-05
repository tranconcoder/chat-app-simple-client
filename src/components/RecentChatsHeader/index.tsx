import classNames from 'classnames/bind';
import { Fragment, useEffect, useState } from 'react';

import { ReactComponent as SearchIcon } from '../../assets/images/search-icon.svg';
import useDebounce from '../../hooks/useDebounce.hook';
import styles from './index.module.scss';

const cx = classNames.bind(styles);

function RecentChatsHeader({
	searchValue,
	search = false,
	toggleSearch,
	changeValue,
}: {
	searchValue: string;
	search?: boolean;
	toggleSearch: () => any;
	changeValue: (value: string) => any;
}) {
	const [valueInput, setValueInput] = useState(searchValue);
	const debounceValue = useDebounce(valueInput, 250);

	useEffect(() => changeValue(debounceValue), [debounceValue]);

	const handleChangeInput = (e: any) => {
		setValueInput(e.target.value.trimStart());
	};

	return (
		<Fragment>
			<div className={cx('separate')}></div>
			<header className={cx('header')}>
				{search ? (
					<input
						onChange={handleChangeInput}
						value={valueInput}
						autoFocus
						className={cx('search-bar')}
						type="text"
					/>
				) : (
					<span>Recent Chats</span>
				)}

				<SearchIcon onClick={toggleSearch} />
			</header>
		</Fragment>
	);
}

export default RecentChatsHeader;
