import { Tab, Col, ListGroup, Row } from 'react-bootstrap';
import ManageAccess from '../../../atoms/Settings/ManageAccess/ManageAccess';
import SettingsOptions from '../../../atoms/Settings/Options/SettingsOptions';

const RepositorySettings = () => {
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
								<SettingsOptions />
							</Tab.Pane>
							<Tab.Pane eventKey="#link2">
								<ManageAccess />
							</Tab.Pane>
							<Tab.Pane eventKey="#link3">
								<h5> hi from branches </h5>
							</Tab.Pane>
						</Tab.Content>
					</Col>
				</Row>
			</Tab.Container>
		</>
	);
};

export default RepositorySettings;
