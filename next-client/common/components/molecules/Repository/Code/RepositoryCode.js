import { useState } from 'react';
import { Card, Dropdown, ListGroup, Row } from 'react-bootstrap';
import { BsFillFolderFill } from 'react-icons/bs';
import { AiOutlineFile } from 'react-icons/ai';
import styles from './RepositoryCode.module.scss';

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

const RepositoryCode = () => {
	const [activeBranch, setActiveBranch] = useState(branches[0]);
	const [activeFolders, setActiveFolders] = useState(branches[0].folders);
	const [activeFiles, setActiveFiles] = useState(branches[0].files);
	const [activeFilesPath, setActiveFilesPath] = useState([]);

	return (
		<>
			<Card>
				<Card.Header>
					<div className={styles.repositoryHeader}>
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
												setActiveFilesPath([]);
											}}
										>
											{branch.branchName}
										</Dropdown.Item>
									);
								})}
							</Dropdown.Menu>
						</Dropdown>
						<div className={styles.filesPath}>
							{activeFilesPath.map((activePath, idx) => {
								return (
									<p key={activePath}>
										{idx === 0 ? '' : '/'} {activePath}
									</p>
								);
							})}
						</div>
					</div>
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
										setActiveFiles(folder.files);
										setActiveFilesPath([...activeFilesPath, folder.name]);
									}}
								>
									<div style={{ display: 'flex', alignItems: 'center' }}>
										<BsFillFolderFill style={{ marginRight: '8px' }} />
										{folder.name}
									</div>
								</ListGroup.Item>
							);
						})}
						{activeFiles?.map((file) => {
							return (
								<ListGroup.Item
									action
									key={file.name}
									onClick={() => {
										alert(file.name);
									}}
								>
									<div style={{ display: 'flex', alignItems: 'center' }}>
										<AiOutlineFile style={{ marginRight: '8px' }} /> {file.name}
									</div>
								</ListGroup.Item>
							);
						})}
					</ListGroup>
				</Card.Body>
				<Card.Footer className="text-muted">
					<div className={styles.repositoryFooter}>2 days ago</div>
				</Card.Footer>
			</Card>
		</>
	);
};

export default RepositoryCode;
