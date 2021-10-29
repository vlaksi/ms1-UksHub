import { useState } from 'react';
import { Card, Button, Dropdown, Row, Col, ListGroup } from 'react-bootstrap';

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

const folders = [
	{
		name: 'content',
		files: [
			{
				name: 'model',
				files: [
					{
						name: 'some-image.jpg',
					},
				],
			},
		],
	},
	{
		name: 'django-backend',
		files: [
			{
				name: 'main.py',
			},
			{
				name: 'startup.py',
			},
		],
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
										key={branch.branchName}
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
					<ListGroup>
						{folders.map((folder) => {
							return (
								<ListGroup.Item key={folder.name}>{folder.name}</ListGroup.Item>
							);
						})}
					</ListGroup>
				</Card.Body>
				<Card.Footer className="text-muted">2 days ago</Card.Footer>
			</Card>
		</>
	);
};

export default RepositoryCode;
