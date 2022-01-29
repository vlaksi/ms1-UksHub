import React, { useState } from 'react';
import styles from './SearchBar.module.scss';
import { BsFillFolderFill, BsSearch } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import { MdSyncProblem } from 'react-icons/md';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { Badge } from 'react-bootstrap';

function SearchBar({ placeholder, data }) {
	const [filteredData, setFilteredData] = useState([]);
	const [wordEntered, setWordEntered] = useState('');
	const router = useRouter()
	const { user, repository } = router.query;

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
		if (e.key === 'Enter' && wordEntered !== '') {
			setWordEntered('');
			router.push({
				pathname: `/search/[search]`,
				query: { search: wordEntered },
			})
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

			{wordEntered != 0 &&
				<div className={styles.dataResult}>
					<Link key={1} href={`/search/${wordEntered}`} >
						<a className={styles.dataItem} onClick={() => { setWordEntered('') }}>
							<BsSearch style={{ marginLeft: '10px' }} />
							<p>

								<Badge pill bg="info" text="light" style={{ marginRight: '20px' }}>
									All GitHub
								</Badge>
								{wordEntered}
							</p>
						</a>
					</Link>
					{repository &&
						<Link key={2} href={`/search/${wordEntered}/${repository}/`}>
							<a className={styles.dataItem} onClick={() => { setWordEntered('') }} >
								<BsSearch style={{ marginLeft: '10px' }} />
								<p>
									<Badge pill bg="info" text="light" style={{ marginRight: '20px' }}>
										In this repository
									</Badge>
									{wordEntered}
								</p>
							</a>
						</Link>}
					{user &&
						<Link key={3} href={`/search/${wordEntered}/searchinuser/${user}/`}>
							<a className={styles.dataItem} onClick={() => { setWordEntered('') }} >
								<BsSearch style={{ marginLeft: '10px' }} />
								<p>
									<Badge pill bg="info" text="light" style={{ marginRight: '20px' }}>
										In this user
									</Badge>
									{wordEntered}
								</p>
							</a>
						</Link>}
				</div>
			}
		</div>
	);
}

export default SearchBar;
