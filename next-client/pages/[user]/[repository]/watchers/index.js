import { useRouter } from 'next/router';
import RepositoryWatchers from '../../../../common/components/molecules/Repository/Watchers/RepositoryWatchers';

const Watchers = () => {
	const router = useRouter();
	const { user, repository } = router.query;

	return (
		<>
			{/* TODO: Send user id, and get username of the user in the component */}
			<RepositoryWatchers username={user} repositoryId={repository} />
		</>
	);
};

export default Watchers;
