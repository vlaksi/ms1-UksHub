import { useState } from 'react';
import { Card, Button, Dropdown, Row, Col, ListGroup } from 'react-bootstrap';

const backendFolder = {
	name: 'django-backend',
	files: [
		{
			name: 'main.py',
		},
		{
			name: 'startup.py',
		},
	],
};

const contentFolder = {
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
};

const folders = [backendFolder];

const branches = [
	{
		branchName: 'main',
		folders: folders,
	},
	{
		branchName: 'develop',
		folders: folders,
	},
	{
		branchName: 'feature/yyy',
		folders: [contentFolder, ...folders],
	},
];

const RepositoryCode = () => {
	const [activeBranch, setActiveBranch] = useState(branches[0]);

	return (
		<>
			<Card>
				<Card.Header>
					<Dropdown>
						<Dropdown.Toggle variant="dark" id="dropdown-basic">
							{activeBranch.branchName}
						</Dropdown.Toggle>

						<Dropdown.Menu>
							{branches.map((branch) => {
								return (
									<Dropdown.Item
										key={branch.branchName}
										onClick={() => {
											setActiveBranch(branch);
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
						{activeBranch.folders.map((folder) => {
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
