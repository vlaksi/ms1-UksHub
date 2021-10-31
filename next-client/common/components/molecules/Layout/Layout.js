import styles from './Layout.module.scss';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Head from 'next/head';

const Layout = ({ children }) => {
	return (
		<div className={styles.layoutWrapper}>
			<Head>
				<title>ms1~UksHub</title>
				<link rel="icon" href="/logo.png" />
			</Head>

			<Navbar />
			<div>{children}</div>
			<Footer />
		</div>
	);
};

export default Layout;
