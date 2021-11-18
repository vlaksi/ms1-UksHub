import { useEffect, useState } from 'react';
import {
	Card,
	Dropdown,
	ListGroup,
	Modal,
	Button,
	Form,
} from 'react-bootstrap';
import { BsFillFolderFill } from 'react-icons/bs';
import { AiFillHome, AiOutlineFile, AiFillPlusCircle } from 'react-icons/ai';
import styles from './RepositoryCode.module.scss';
import { branches } from '../../../../mocks/repository';

const RepositoryCode = ({ repositoryId = 1 }) => {
	const [activeBranch, setActiveBranch] = useState(branches[0]);
	const [activeFolders, setActiveFolders] = useState(branches[0].folders);
	const [activeFiles, setActiveFiles] = useState(branches[0].files);
	const [activeFilesPath, setActiveFilesPath] = useState([]);
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<Card>
				<Card.Header>
					<div className={styles.repositoryHeader}>
						<div
							style={{
								display: 'flex',
								alignItems: 'baseline',
							}}
						>
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
						<div style={{ display: 'flex' }}>
							<AiFillHome
								style={{
									cursor: 'pointer',
									marginRight: '10px',
									height: '20px',
									width: '20px',
								}}
								onClick={() => {
									setActiveFolders(activeBranch.folders);
									setActiveFiles(activeBranch.files);
									setActiveFilesPath([]);
								}}
							/>
							{/* TODO: Do not display this one to the other users, only to myself */}
							<AiFillPlusCircle
								style={{
									cursor: 'pointer',
									marginRight: '10px',
									height: '20px',
									width: '20px',
								}}
								onClick={handleShow}
							/>
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

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title> Add new content </Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group controlId="formFileMultiple" className="mb-3">
						<Form.Label>Add your files for the upload</Form.Label>
						<Form.Control type="file" multiple />
					</Form.Group>
				</Modal.Body>

				<Modal.Footer>
					<Button
						variant="success"
						onClick={() => {
							alert('suc');
						}}
					>
						Add
					</Button>
					<Button variant="danger" onClick={handleClose}>
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default RepositoryCode;
