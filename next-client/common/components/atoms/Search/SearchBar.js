import React, { useState } from 'react';
import styles from './SearchBar.module.scss';
import { BsFillFolderFill } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import { MdSyncProblem } from 'react-icons/md';
import Link from 'next/link';
import { searchAllIssues } from '../../../services/progresstrackapp/issuesService';
import { useRouter } from 'next/router'

function SearchBar({ placeholder, data }) {
	const [filteredData, setFilteredData] = useState([]);
	const [wordEntered, setWordEntered] = useState('');
	const router = useRouter()

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
	const handleKeyDown = async (e) => {
		if (e.key === 'Enter') {

			// let issues = await searchAllIssues(wordEntered);
			// console.log(issues)
			router.push({
				pathname: `/search/[search]`,
				query: { search: wordEntered },
			})

			// setNewIssueList(issues);
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
					onKeyDown={handleKeyDown}
				/>
			</div>
			{filteredData.length != 0 && (
				<div className={styles.dataResult}>
					{filteredData.slice(0, 15).map((value, key) => {
						return (
							<Link key={value.title} href={`/${value.route}`}>
								<a className={styles.dataItem} target="_blank">
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
								</a>
							</Link>
						);
					})}
				</div>
			)}
		</div>
	);
}

export default SearchBar;
