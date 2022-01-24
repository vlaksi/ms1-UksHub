import { useEffect, useState } from 'react';
import { getRepositoryById } from '../../../../services/versioning/repositoryService';
import Link from 'next/link';
import UserItem from '../../../atoms/UserItem/UserItem';
import { getAllRepositoryUsersByAction } from '../../../../services/useractivity/actionService';
import { getUserById } from '../../../../services/useractivity/userService';

const RepositoryAction = ({ userId, repositoryId, actionType = 'watch' }) => {
  const [repository, setRepository] = useState();
  const [users, setUsers] = useState([]);
  const [author, setAuthor] = useState();

  useEffect(async () => {
    if (!repositoryId) return;
    setRepository(await getRepositoryById(repositoryId));
    setUsers(await getAllRepositoryUsersByAction(repositoryId, actionType));
    setAuthor(await getUserById(userId));
  }, [repositoryId]);

  return (
    <>
      {repository && author && (
        <>
          {/* Name of the user/repo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <h4>
                <Link href={`/${userId}`}>
                  <a style={{ textDecoration: 'none', color: '#444' }}>
                    {author.username}
                  </a>
                </Link>{' '}
                /{' '}
                <Link href={`/${userId}/${repository.pk}`}>
                  <a style={{ textDecoration: 'none', color: '#444' }}>
                    {repository.name}
                  </a>
                </Link>{' '}
              </h4>
            </div>
            <div>
              <h5> Users that {actionType} repository</h5>
            </div>
          </div>
          <hr></hr>
          {users?.map((actionUser) => {
            return <UserItem key={actionUser.username} user={actionUser} />;
          })}
        </>
      )}
    </>
  );
};

export default RepositoryAction;
