import Link from 'next/link';
import styles from './Navbar.module.scss';
import Image from 'next/image';

const Navbar = () => {
	return (
		<div>
			<nav className={styles.customNavbar}>
				<div className="logo">
					<Image src="/logo.png" width={60} height={60} />
				</div>
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
			</nav>
		</div>
	);
};

export default Navbar;
