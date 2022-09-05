import classNames from 'classnames/bind';
import { memo } from 'react';
import { RecentChatsFiltersProps } from '../../types/props';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

function RecentChatsFilters({
	selectedFilter,
	setSelectedFilter,
	filterList,
}: RecentChatsFiltersProps) {
	return (
		<ul className={cx('filter-list')}>
			{filterList.map((filter, index) => (
				<li
					onClick={() => setSelectedFilter(filter)}
					key={index}
					className={cx({ selected: selectedFilter === filter })}
				>
					<p>{filter}</p>
				</li>
			))}
		</ul>
	);
}

export default memo(RecentChatsFilters);
