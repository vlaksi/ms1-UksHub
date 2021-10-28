import { Row, Col, Tabs, Tab } from 'react-bootstrap';
import UserOverview from '../../molecules/user/overview/UserOverview';
import UserRepositories from './../../molecules/user/repositories/UserRepositories';

const UserLanding = ({ username }) => {
	// TODO: Get a user profile information with username attribute !!
	return (
		<>
			<Row className="justify-content-md-center">
				<Col md={10}>
					<div className="mb-5">
						<h4> Welcome to the {username} profile page </h4>
					</div>
					<Tabs
						defaultActiveKey="profile"
						id="uncontrolled-tab-example"
						className="mb-3"
					>
						<Tab eventKey="profile" title="Overview">
							<UserOverview />
						</Tab>
						<Tab eventKey="home" title="Repositories">
							<UserRepositories />
						</Tab>
					</Tabs>
				</Col>
			</Row>
		</>
	);
};

export default UserLanding;
