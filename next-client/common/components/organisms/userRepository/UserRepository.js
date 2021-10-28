import { Row, Col, Tabs, Tab } from 'react-bootstrap';
import Link from 'next/link';

import RepositoryCode from './../../molecules/repository/code/RepositoryCode';
import IssuesOverview from './../../molecules/repository/issues/IssuesOverview';
import PullRequestsOverview from './../../molecules/repository/pulls/PullRequestsOverview';
import RepositoryInsights from './../../molecules/repository/insights/RepositoryInsights';
import RepositorySettings from './../../molecules/repository/settings/RepositorySettings';

const UserRepository = ({ username, repositoryName }) => {
	// TODO: Get a user profile information with username attribute !!
	return (
		<>
			<Row className="justify-content-md-center">
				<Col md={10}>
					<div className="mb-3">
						<h4>
							<Link href={`/${username}`}>
								<a style={{ textDecoration: 'none', color: '#444' }}>
									{username}
								</a>
							</Link>{' '}
							/ {repositoryName}
						</h4>
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
							<PullRequestsOverview />
						</Tab>
						<Tab eventKey="insights" title="Insights">
							<RepositoryInsights />
						</Tab>
						<Tab eventKey="settings" title="Settings">
							<RepositorySettings />
						</Tab>
					</Tabs>
				</Col>
			</Row>
		</>
	);
};

export default UserRepository;
