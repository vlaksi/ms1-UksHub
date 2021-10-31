import { useState } from 'react';
import {
	Card,
	ListGroup,
	Badge,
	Modal,
	Dropdown,
	Button,
} from 'react-bootstrap';
import { BiTransfer } from 'react-icons/bi';
import { branches } from '../../../../mocks/repository';

const BranchesSettings = () => {
	// TODO: Get a name of default branch
	const [defaultBranch, setDefaultBranch] = useState('main');
	const [bufferBranch, setBufferBranch] = useState(defaultBranch);
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

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
								onClick={handleShow}
							/>
						</ListGroup.Item>
					</ListGroup>
				</Card.Body>
			</Card>
			<br />

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Change default branch </Modal.Title>
				</Modal.Header>
				<Modal.Body
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: ' baseline',
					}}
				>
					Choose another branch to use as the default branch
					<Dropdown className="mt-1">
						<Dropdown.Toggle
							style={{ marginLeft: '5px' }}
							variant="secondary"
							id="dropdown-basic"
						>
							{bufferBranch}
						</Dropdown.Toggle>

						<Dropdown.Menu>
							{branches.map((branch) => {
								return (
									<Dropdown.Item
										key={branch.branchName}
										onClick={() => {
											setBufferBranch(branch.branchName);
										}}
									>
										{branch.branchName}
									</Dropdown.Item>
								);
							})}
						</Dropdown.Menu>
					</Dropdown>
				</Modal.Body>

				<Modal.Footer>
					<Button
						variant="success"
						onClick={() => {
							setDefaultBranch(bufferBranch);
							handleClose();
							alert(
								'TODO: Add an API call to update default branch of this repository'
							);
						}}
					>
						Update
					</Button>
					<Button variant="danger" onClick={handleClose}>
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default BranchesSettings;
