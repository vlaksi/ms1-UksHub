import { useState, useEffect } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { AiOutlineEye, AiOutlineStar, AiOutlineBranches } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';

import Link from 'next/link';
import {
  createRepositoryAction,
  deleteActionById,
  getActionByRepoAndAuthor,
  updateActionNewForkedRepoId,
} from '../../../services/useractivity/actionService';
import {
  addRepository,
  deleteRepository,
} from '../../../services/versioning/repositoryService';
import { getParsedToken } from '../../../services/authentication/token';

const Actions = ({ username, repository }) => {
  const notify = (message = 'Successfully!') => toast.success(` ${message} `);
  const notifyError = () => toast.error('Smth went wrong!');
  const [loggedInUserId, setLoggedInUserId] = useState(
    getParsedToken().user_id
  );

  const [isUserWatchRepo, setIsUserWatchRepo] = useState(false);
  const [isUserStarRepo, setIsUserStarRepo] = useState(false);
  const [isUserForkRepo, setIsUserForkRepo] = useState(false);

  const [watchAction, setWatchAction] = useState();
  const [starAction, setStarAction] = useState();
  const [forkAction, setForkAction] = useState();

  useEffect(async () => {
    if (!repository) return;

    // Watch
    let watchAction = await getActionByRepoAndAuthor(
      'watch',
      repository.pk,
      loggedInUserId
    );
    if (watchAction?.pk) {
      setIsUserWatchRepo(true);
      setWatchAction(watchAction);
    }

    // Star
    let starAction = await getActionByRepoAndAuthor(
      'star',
      repository.pk,
      loggedInUserId
    );
    if (starAction?.pk) {
      setIsUserStarRepo(true);
      setStarAction(starAction);
    }

    // Fork
    let forkAction = await getActionByRepoAndAuthor(
      'fork',
      repository.pk,
      loggedInUserId
    );
    if (forkAction?.pk) {
      setIsUserForkRepo(true);
      setForkAction(forkAction);
    }
  }, []);

  const watchRepository = async () => {
    setIsUserWatchRepo(true);
    setWatchAction(
      await createRepositoryAction(loggedInUserId, repository.pk, 'watch')
    );
    notify('Successfully watched repository!');
  };

  const unWatchRepository = () => {
    setIsUserWatchRepo(false);
    deleteActionById(watchAction.pk);
    notify('Successfully deleted repository!');
  };

  const starRepository = async () => {
    setIsUserStarRepo(true);
    setStarAction(
      await createRepositoryAction(loggedInUserId, repository.pk, 'star')
    );
    notify('Successfully stared repository!');
  };

  const unStarRepository = () => {
    setIsUserStarRepo(false);
    deleteActionById(starAction.pk);
    notify('Successfully deleted repository!');
  };

  const forkRepository = async () => {
    setIsUserForkRepo(true);
    let createdForkAction = await createRepositoryAction(
      loggedInUserId,
      repository.pk,
      'fork'
    );
    setForkAction(createdForkAction);
    let forkedRepository = await addRepository(
      repository.name,
      repository.description,
      loggedInUserId,
      repository.default_branch,
      repository.author
    );
    let updatedForkAction = await updateActionNewForkedRepoId(
      createdForkAction.pk,
      forkedRepository.pk
    );
    setForkAction(updatedForkAction);
    notify('Successfully forked repository!');
  };

  const unForkRepository = () => {
    setIsUserForkRepo(false);
    deleteActionById(forkAction.pk);
    notify('Successfully deleted repository!');
    console.log('forkAction: ', forkAction);
    // TODO: Delete that repository also !!!
    deleteRepository(forkAction.new_forked_repository);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000}></ToastContainer>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Watch */}
        <div style={{ marginRight: '5px' }}>
          <ButtonGroup aria-label="Basic example">
            {isUserWatchRepo ? (
              <Button
                style={{ backgroundColor: '#c3c3c3' }}
                variant="outline-secondary"
                onClick={() => {
                  unWatchRepository();
                }}
              >
                <AiOutlineEye size={22} /> Unwatch
              </Button>
            ) : (
              <Button
                variant="outline-secondary"
                onClick={() => {
                  watchRepository();
                }}
              >
                <AiOutlineEye size={22} /> Watch
              </Button>
            )}
            <Link href={`/${username}/${repository.pk}/watchers`}>
              <Button variant="outline-secondary">
                <FiMoreHorizontal />
              </Button>
            </Link>
          </ButtonGroup>
        </div>
        {/* Star */}
        <div style={{ marginRight: '5px', marginLeft: '5px' }}>
          <ButtonGroup aria-label="Basic example">
            {isUserStarRepo ? (
              <Button
                variant="outline-secondary"
                style={{ backgroundColor: '#c3c3c3' }}
                onClick={() => {
                  unStarRepository();
                }}
              >
                <AiOutlineStar size={22} /> Unstar
              </Button>
            ) : (
              <Button
                variant="outline-secondary"
                onClick={() => {
                  starRepository();
                }}
              >
                <AiOutlineStar size={22} /> Star
              </Button>
            )}
            <Link href={`/${username}/${repository.pk}/stargazers`}>
              <Button variant="outline-secondary">
                <FiMoreHorizontal />
              </Button>
            </Link>
          </ButtonGroup>
        </div>
        {/* Fork */}
        <div style={{ marginLeft: '5px' }}>
          <ButtonGroup aria-label="Basic example">
            {isUserForkRepo ? (
              <Button
                variant="outline-secondary"
                style={{ backgroundColor: '#c3c3c3' }}
                onClick={() => {
                  unForkRepository();
                }}
              >
                <AiOutlineBranches size={22} /> Unfork
              </Button>
            ) : (
              <Button
                variant="outline-secondary"
                onClick={() => {
                  forkRepository();
                }}
              >
                <AiOutlineBranches size={22} /> Fork
              </Button>
            )}

            <Link href={`/${username}/${repository.pk}/forks`}>
              <Button variant="outline-secondary">
                <FiMoreHorizontal />
              </Button>
            </Link>
          </ButtonGroup>
        </div>
      </div>
    </>
  );
};

export default Actions;
