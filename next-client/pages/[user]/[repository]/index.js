import { useRouter } from 'next/router';

const UserRepository = () => {
	const router = useRouter();
	const { user, repository } = router.query;

	return (
		<>
			<p>User: {user}</p> <p>Repository: {repository}</p>
		</>
	);
};

export default UserRepository;
