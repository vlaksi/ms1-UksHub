import Link from 'next/link';
import styles from './Navbar.module.scss';
import Image from 'next/image';
import SearchBar from '../../atoms/Search/SearchBar';
import { getDataForSearch } from '../../../mocks/dataForSearch';

const Navbar = () => {
	if (typeof window !== "undefined") {
		var token = localStorage.getItem('token')
	}
	if (token) {
		return (
			<div>
				<nav className={styles.customNavbar}>
					<div className={styles.searchWithLogo}>
						<Image src="/logo.png" width={60} height={60} />
						<SearchBar placeholder="Jump to..." data={getDataForSearch()} />
					</div>
					<div className={styles.links}>
						<Link href="/home">
							<a>
								<h5>Home</h5>
							</a>
						</Link>

						<Link href="/">
							<a onClick={() => {
								if (typeof window !== "undefined") {
									localStorage.setItem('token', '')
								}
								console.log('aaa')
							}}>
								<h5>Logout</h5>
							</a>
						</Link>
					</div>
				</nav>
			</div>
		);
	} else {
		return (
			<div>
				<nav className={styles.customNavbar}>
					<div className={styles.searchWithLogo}>
						<Image src="/logo.png" width={60} height={60} />
						<SearchBar placeholder="Jump to..." data={getDataForSearch()} />
					</div>
					<div className={styles.links}>
						<Link href="/">
							<a>
								<h5>Home</h5>
							</a>
						</Link>
						<Link href="/registration">
							<a>
								<h5>Registration</h5>
							</a>
						</Link>
						<Link href="/login">
							<a>
								<h5>Login</h5>
							</a>
						</Link>
					</div>
				</nav>
			</div>
		);
	}
}

export default Navbar;
