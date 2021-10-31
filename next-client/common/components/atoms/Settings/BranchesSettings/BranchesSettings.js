import { useState } from 'react';
import { Card, ListGroup, Badge } from 'react-bootstrap';
import { BiTransfer } from 'react-icons/bi';

const BranchesSettings = () => {
	// TODO: Get a name of default branch
	const [defaultBranch, setDefaultBranch] = useState('main');

	return (
		<>
			<Card border="light" style={{ width: '100%' }}>
				<Card.Header>Default branch</Card.Header>
				<Card.Body>
					<Card.Text>
						The default branch is considered the “base” branch in your
						repository, against which all pull requests and code commits are
						automatically made, unless you specify a different branch
					</Card.Text>
					<ListGroup>
						<ListGroup.Item
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<Badge bg="secondary"> {defaultBranch} </Badge>
							<BiTransfer
								style={{ marginRight: '5px', cursor: 'pointer' }}
								onClick={() => {
									alert('TODO: Switch branch modal');
								}}
							/>
						</ListGroup.Item>
					</ListGroup>
				</Card.Body>
			</Card>
			<br />
		</>
	);
};

export default BranchesSettings;
