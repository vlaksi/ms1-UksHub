import { useRouter } from 'next/router';
import RepositoryAction from '../../../../common/components/molecules/Repository/Action/RepositoryAction';

const Watchers = () => {
  const router = useRouter();
  const { user, repository } = router.query;

  return (
    <>
      <RepositoryAction
        userId={user}
        repositoryId={repository}
        actionType="fork"
      />
    </>
  );
};

export default Watchers;
