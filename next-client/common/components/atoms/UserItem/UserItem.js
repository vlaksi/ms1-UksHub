import Link from 'next/link';
import { FaUserCircle } from 'react-icons/fa';
import styles from './UserItem.module.scss';

const UserItem = ({ user }) => {
	return (
		<div className={styles.userItemWrapper}>
			<FaUserCircle
				size={22}
				style={{ marginLeft: '15px', marginRight: '15px' }}
			/>
			{/* TODO: Route this to the user.pk instead of the username */}
			<Link href={`/${user.username}`}>
				<a style={{ textDecoration: 'none', color: '#444' }}>{user.username}</a>
			</Link>
		</div>
	);
};

export default UserItem;
