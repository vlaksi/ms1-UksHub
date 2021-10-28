import { useRouter } from 'next/router';
import UserRepository from './../../../common/components/organisms/userRepository/UserRepository';

const UserRepositoryLanding = () => {
	const router = useRouter();
	const { user, repository } = router.query;

	return (
		<>
			<UserRepository username={user} repositoryName={repository} />
		</>
	);
};

export default UserRepositoryLanding;
