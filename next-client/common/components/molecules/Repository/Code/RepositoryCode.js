import { useState } from 'react';
import { Card, Dropdown, ListGroup } from 'react-bootstrap';
import { BsFillFolderFill } from 'react-icons/bs';

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

// TODO: 1. Render folders with icon
// 2. Render files with icon
// 3. Enable click on folder which

const RepositoryCode = () => {
	const [activeBranch, setActiveBranch] = useState(branches[0]);
	const [activeFolders, setActiveFolders] = useState(branches[0].folders);

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
											setActiveFolders(branch.folders);
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
						{activeFolders?.map((folder) => {
							return (
								<ListGroup.Item
									action
									key={folder.name}
									onClick={() => {
										setActiveFolders(folder.folders);
									}}
								>
									<BsFillFolderFill /> {folder.name}
								</ListGroup.Item>
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
