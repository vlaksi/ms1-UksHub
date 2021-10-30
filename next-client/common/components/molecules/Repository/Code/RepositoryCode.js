import { useState } from 'react';
import { Card, Dropdown, ListGroup } from 'react-bootstrap';
import { BsFillFolderFill } from 'react-icons/bs';
import { AiOutlineFile } from 'react-icons/ai';

const backendFolder = {
	name: 'django-backend',
	folders: [],
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
	folders: [
		{
			name: 'model',
			files: [
				{
					name: 'some-image.jpg',
				},
			],
		},
	],
	files: [],
};

const files = [
	{
		name: 'index.html',
	},
	{
		name: 'README.md',
	},
];

const folders = [backendFolder];

const branches = [
	{
		branchName: 'main',
		folders: folders,
		files: files,
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

// 3. Enable click on folder which

const RepositoryCode = () => {
	const [activeBranch, setActiveBranch] = useState(branches[0]);
	const [activeFolders, setActiveFolders] = useState(branches[0].folders);
	const [activeFiles, setActiveFiles] = useState(branches[0].files);

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
											setActiveFiles(branch.files);
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
						{activeFiles?.map((file) => {
							return (
								<ListGroup.Item
									action
									key={file.name}
									onClick={() => {
										setActiveFolders(file.folders);
									}}
								>
									<AiOutlineFile /> {file.name}
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
