import { useRouter } from 'next/router';
import UserRepository from './../../../common/components/organisms/UserRepository/UserRepository';

const UserRepositoryLanding = () => {
	const router = useRouter();
	const { user, repository } = router.query;

	return (
		<>
			<UserRepository userId={user} repositoryId={repository} />
		</>
	);
};

export default UserRepositoryLanding;
