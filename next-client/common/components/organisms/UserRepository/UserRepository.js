import { Row, Col, Tabs, Tab, Button, ButtonGroup } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AiOutlineEye, AiOutlineStar, AiOutlineBranches } from 'react-icons/ai';

import RepositoryCode from '../../molecules/Repository/Code/RepositoryCode';
import IssuesOverview from '../../molecules/Repository/Issues/IssuesOverview';
import PullRequestsOverview from '../../molecules/Repository/Pulls/PullRequestsOverview';
import RepositoryInsights from '../../molecules/Repository/Insights/RepositoryInsights';
import RepositorySettings from '../../molecules/Repository/Settings/RepositorySettings';
import { getRepositoryById } from '../../../services/versioning/repositoryService';
import { getRepositoryBranches } from '../../../services/versioning/branchService';

const UserRepository = ({ username, repositoryId }) => {
	// TODO: Get a user profile information with username attribute !!
	const [repository, setRepository] = useState();
	const [repositoryBranches, setRepositoryBranches] = useState();

	useEffect(async () => {
		if (!repositoryId) return;
		setRepository(await getRepositoryById(repositoryId));
		setRepositoryBranches(await getRepositoryBranches(repositoryId));
	}, [repositoryId]);

	return (
		<>
			{repository && repositoryBranches && (
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
									<Link href={`/${username}`}>
										<a style={{ textDecoration: 'none', color: '#444' }}>
											{username}
										</a>
									</Link>{' '}
									/{' '}
									<Link href={`/${username}/${repository.pk}`}>
										<a style={{ textDecoration: 'none', color: '#444' }}>
											{repository.name}
										</a>
									</Link>{' '}
								</h4>
							</div>
							{/* Actions */}
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
								}}
							>
								<div style={{ marginRight: '5px' }}>
									<ButtonGroup aria-label="Basic example">
										<Button variant="outline-secondary">
											<AiOutlineEye size={22} /> Watch
										</Button>
										<Link href={`/${username}/${repository.pk}/watchers`}>
											<Button variant="outline-secondary">0</Button>
										</Link>
									</ButtonGroup>
								</div>
								<div style={{ marginRight: '5px', marginLeft: '5px' }}>
									<ButtonGroup aria-label="Basic example">
										<Button variant="outline-secondary">
											<AiOutlineStar size={22} /> Star
										</Button>
										<Button variant="outline-secondary">0</Button>
									</ButtonGroup>
								</div>
								<div style={{ marginLeft: '5px' }}>
									<ButtonGroup aria-label="Basic example">
										<Button variant="outline-secondary">
											<AiOutlineBranches size={22} /> Fork
										</Button>
										<Button variant="outline-secondary">0</Button>
									</ButtonGroup>
								</div>
							</div>
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
								<RepositorySettings
									repository={repository}
									repositoryBranches={repositoryBranches}
								/>
							</Tab>
						</Tabs>
					</Col>
				</Row>
			)}
		</>
	);
};

export default UserRepository;
