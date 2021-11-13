import React, { useState } from 'react';
import styles from './UserSearch.module.scss';
import { BsFillFolderFill } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import { MdSyncProblem } from 'react-icons/md';
import Link from 'next/link';

function UserSearch({ placeholder, data, onSelectItem }) {
	const [filteredData, setFilteredData] = useState([]);
	const [wordEntered, setWordEntered] = useState('');

	const handleFilter = (event) => {
		const searchWord = event.target.value;
		setWordEntered(searchWord);
		const newFilter = data.filter((value) => {
			return value.title.toLowerCase().includes(searchWord.toLowerCase());
		});

		if (searchWord === '') {
			setFilteredData([]);
		} else {
			setFilteredData(newFilter);
		}
	};

	return (
		<div className={styles.searchBarWrapper}>
			<div className={styles.searchInputs}>
				<input
					type="text"
					placeholder={placeholder}
					value={wordEntered}
					onChange={handleFilter}
				/>
			</div>
			{filteredData.length != 0 && (
				<div className={styles.dataResult}>
					{filteredData.slice(0, 15).map((value, key) => {
						return (
							<div
								key={value.title}
								className={styles.dataItem}
								onClick={() => {
									onSelectItem(value);
									setFilteredData([]);
								}}
							>
								{value.type === 'repository' && (
									<BsFillFolderFill style={{ marginLeft: '10px' }} />
								)}

								{value.type === 'user' && (
									<FaUserCircle style={{ marginLeft: '10px' }} />
								)}

								{value.type === 'issue' && (
									<MdSyncProblem style={{ marginLeft: '10px' }} />
								)}

								<p>{value.title} </p>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}

export default UserSearch;
