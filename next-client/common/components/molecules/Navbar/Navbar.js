import Link from 'next/link';
import styles from './Navbar.module.scss';
import Image from 'next/image';
import SearchBar from '../../atoms/Search/SearchBar';

const Navbar = () => {
	return (
		<div>
			<nav className={styles.customNavbar}>
				<div className={styles.searchWithLogo}>
					<Image src="/logo.png" width={60} height={60} />
					<SearchBar
						placeholder="Jump to..."
						data={[
							{
								title: 'Adan',
							},
							{
								title: 'UksHub',
							},
						]}
					/>
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
};

export default Navbar;
