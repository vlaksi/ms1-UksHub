import { useEffect, useState } from 'react';
import { Row, Col, Tabs, Tab } from 'react-bootstrap';
import UserOverview from '../../molecules/User/Overview/UserOverview';
import UserRepositories from '../../molecules/User/Repositories/UserRepositories';
import { getUserById } from '../../../services/useractivity/userService';

const UserLanding = ({ userId }) => {
  const [user, setUser] = useState();

  useEffect(async () => {
    if (!userId) return;
    let userById = await getUserById(userId);
    setUser(userById);
  }, [userId]);

  return (
    <>
      {user ? (
        <Row className="justify-content-md-center">
          <Col md={10}>
            <div className="mb-5">
              <h4> Welcome to the {user.first_name} profile page </h4>
            </div>
            <Tabs
              defaultActiveKey="profile"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="profile" title="Overview">
                <UserOverview userFirstName={user.first_name} />
              </Tab>
              <Tab eventKey="repositories" title="Repositories">
                <UserRepositories author_id={userId} />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      ) : (
        <h5>
          User with id: {userId} does not exist in our system, try another one
        </h5>
      )}
    </>
  );
};

export default UserLanding;
