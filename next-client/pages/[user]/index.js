import { useRouter } from 'next/router';
import UserLanding from '../../common/components/organisms/UserLanding/UserLanding';

const User = () => {
	const router = useRouter();
	const { user } = router.query;
	if (typeof window !== "undefined") {
		var token = localStorage.getItem('token')
	}
	if (token) {
		return (
			<>
				<UserLanding username={user} />
			</>
		);
	} else {
		return (
			<>
				<h1>You need to log in</h1>
			</>
		);
	}
};

export default User;
