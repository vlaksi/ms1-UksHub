import { Row, Col, Tabs, Tab } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import RepositoryCode from '../../molecules/Repository/Code/RepositoryCode';
import IssuesOverview from '../../molecules/Repository/Issues/IssuesOverview';
import PullRequestsOverview from '../../molecules/Repository/Pulls/PullRequestsOverview';
import RepositoryInsights from '../../molecules/Repository/Insights/RepositoryInsights';
import RepositorySettings from '../../molecules/Repository/Settings/RepositorySettings';
import { getRepositoryById } from '../../../services/versioning/repositoryService';
import { getRepositoryBranches } from '../../../services/versioning/branchService';
import Actions from '../../atoms/Actions/Actions';
import { getUserById } from '../../../services/useractivity/userService';
import { getParsedToken } from '../../../services/authentication/token';

const UserRepository = ({ userId, repositoryId }) => {
  const [user, setUser] = useState();
  const [repository, setRepository] = useState();
  const [repositoryBranches, setRepositoryBranches] = useState();

  useEffect(async () => {
    if (!repositoryId) return;
    setRepository(await getRepositoryById(repositoryId));
    setRepositoryBranches(await getRepositoryBranches(repositoryId));
  }, [repositoryId]);

  useEffect(async () => {
    if (!userId) return;
    let userById = await getUserById(userId);
    setUser(userById);
  }, [userId]);

  return (
    <>
      {repository && user && repositoryBranches && (
        <Row className="justify-content-md-center">
          <Col md={10}>
            <div
              className="mb-3"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {/* Name of the user/repo */}
              <div>
                <h4>
                  <Link href={`/${userId}`}>
                    <a style={{ textDecoration: 'none', color: '#444' }}>
                      {user.username}
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
              <Actions username={userId} repository={repository} />
            </div>

            <Tabs
              defaultActiveKey="code"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="code" title="Code">
                <RepositoryCode />
              </Tab>
              <Tab eventKey="issues" title="Issues">
                <IssuesOverview />
              </Tab>
              <Tab eventKey="pullRequests" title="Pull requests">
                <PullRequestsOverview dbRepository={repository} />
              </Tab>
              {userId == getParsedToken().user_id && (
                <Tab eventKey="insights" title="Insights">
                  <RepositoryInsights />
                </Tab>
              )}
              {userId == getParsedToken().user_id && (
                <Tab eventKey="settings" title="Settings">
                  <RepositorySettings
                    repository={repository}
                    repositoryBranches={repositoryBranches}
                  />
                </Tab>
              )}
            </Tabs>
          </Col>
        </Row>
      )}
    </>
  );
};

export default UserRepository;
