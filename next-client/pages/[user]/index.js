import { useRouter } from 'next/router';
import UserLanding from '../../common/components/organisms/userLanding/UserLanding';

const User = () => {
	const router = useRouter();
	const { user } = router.query;

	return (
		<>
			<UserLanding username={user} />
		</>
	);
};

export default User;
