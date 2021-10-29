import styles from './Layout.module.scss';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Layout = ({ children }) => {
	return (
		<div className={styles.layoutWrapper}>
			<Navbar />
			<div>{children}</div>
			<Footer />
		</div>
	);
};

export default Layout;
