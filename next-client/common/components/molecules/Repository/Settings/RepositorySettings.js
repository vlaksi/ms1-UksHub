import { useEffect, useState } from 'react';
import { Tab, Col, ListGroup, Row } from 'react-bootstrap';
import { getRepositoryBranches } from '../../../../services/versioning/branchService';
import { getRepositoryById } from '../../../../services/versioning/repositoryService';
import BranchesSettings from '../../../atoms/Settings/BranchesSettings/BranchesSettings';
import ManageAccess from '../../../atoms/Settings/ManageAccess/ManageAccess';
import SettingsOptions from '../../../atoms/Settings/Options/SettingsOptions';

const RepositorySettings = ({ repositoryId = 1 }) => {
	const [repository, setRepository] = useState('');
	const [repositoryBranches, setRepositoryBranches] = useState('');

	useEffect(async () => {
		// TODO: Move this somewhere else (ie. send a repository as a props to this component!)
		setRepository(await getRepositoryById(repositoryId));
		setRepositoryBranches(await getRepositoryBranches(repositoryId));
	}, []);

	return (
		<>
			<Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
				<Row>
					<Col sm={4}>
						<ListGroup>
							<ListGroup.Item action href="#link1">
								Options
							</ListGroup.Item>
							<ListGroup.Item action href="#link2">
								Manage Access
							</ListGroup.Item>
							<ListGroup.Item action href="#link3">
								Branches
							</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col sm={8}>
						<Tab.Content>
							<Tab.Pane eventKey="#link1">
								<SettingsOptions repositoryId={repositoryId} />
								{/* TODO: Pass real repository ID here, cause of the edit and deletion  */}
							</Tab.Pane>
							<Tab.Pane eventKey="#link2">
								<ManageAccess repository={repository} />
							</Tab.Pane>
							<Tab.Pane eventKey="#link3">
								<BranchesSettings
									repository={repository}
									repositoryBranches={repositoryBranches}
								/>
							</Tab.Pane>
						</Tab.Content>
					</Col>
				</Row>
			</Tab.Container>
		</>
	);
};

export default RepositorySettings;
