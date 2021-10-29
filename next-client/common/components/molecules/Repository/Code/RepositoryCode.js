import { useState } from 'react';
import { Card, Button, Dropdown } from 'react-bootstrap';

const branches = [
	{
		branchName: 'main',
	},
	{
		branchName: 'develop',
	},
	{
		branchName: 'feature/yyy',
	},
];

const RepositoryCode = () => {
	const [branchName, setBranchName] = useState(branches[0].branchName);

	return (
		<>
			<Card>
				<Card.Header>
					<Dropdown>
						<Dropdown.Toggle variant="dark" id="dropdown-basic">
							{branchName}
						</Dropdown.Toggle>

						<Dropdown.Menu>
							{branches.map((branch) => {
								return (
									<Dropdown.Item
										onClick={() => {
											setBranchName(branch.branchName);
										}}
									>
										{branch.branchName}
									</Dropdown.Item>
								);
							})}
						</Dropdown.Menu>
					</Dropdown>
				</Card.Header>
				<Card.Body>
					<Card.Title>Special title treatment</Card.Title>
					<Card.Text>
						With supporting text below as a natural lead-in to additional
						content.
					</Card.Text>
				</Card.Body>
				<Card.Footer className="text-muted">2 days ago</Card.Footer>
			</Card>
		</>
	);
};

export default RepositoryCode;
