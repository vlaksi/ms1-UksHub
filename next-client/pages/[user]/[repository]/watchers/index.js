import { useRouter } from 'next/router';
import RepositoryAction from '../../../../common/components/molecules/Repository/Action/RepositoryAction';

const Watchers = () => {
  const router = useRouter();
  const { user, repository } = router.query;

  return (
    <>
      {/* TODO: Send user id, and get username of the user in the component */}
      <RepositoryAction
        userId={user}
        repositoryId={repository}
        actionType="watch"
      />
    </>
  );
};

export default Watchers;
