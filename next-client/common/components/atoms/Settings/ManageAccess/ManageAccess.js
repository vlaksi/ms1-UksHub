import { useState } from 'react';
import {
	Card,
	FormControl,
	InputGroup,
	Button,
	Modal,
	ListGroup,
} from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';

const collaborators = [
	{
		username: 'Pufke',
	},
	{
		username: 'anciz',
	},
	{
		username: 'vlaksi',
	},
];

const ManageAccess = () => {
	const [removeCandidate, setRemoveCandidate] = useState('');
	const [repositoryCollaborators, setRepositoryCollaborators] =
		useState(collaborators);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const handleDeleteModalClose = () => setShowDeleteModal(false);
	const handleShowDeleteModal = () => setShowDeleteModal(true);

	return (
		<>
			<Card border="light" style={{ width: '100%' }}>
				<Card.Header>Collaborators</Card.Header>
				<Card.Body>
					<InputGroup className="mb-3 mt-3">
						<FormControl
							placeholder="Add a collaborator..."
							aria-label="Add a collaborator..."
							aria-describedby="basic-addon2"
						/>
						<Button
							style={{ width: '80px' }}
							variant="success"
							onClick={() => {
								alert('TODO: Call API to add a user to collaborators');
							}}
						>
							Add
						</Button>
					</InputGroup>
					<ListGroup variant="flush">
						{repositoryCollaborators.map((collaborator) => {
							return (
								<ListGroup.Item
									key={collaborator.username}
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									{collaborator.username}

									<div>
										<MdEdit
											style={{ marginRight: '15px', cursor: 'pointer' }}
											onClick={() => {
												alert('TODO: Edit modal with change role option');
											}}
										/>
										<AiFillDelete
											style={{ cursor: 'pointer' }}
											onClick={() => {
												setRemoveCandidate(collaborator);
												handleShowDeleteModal();
											}}
										/>
									</div>
								</ListGroup.Item>
							);
						})}
					</ListGroup>
				</Card.Body>
			</Card>
			<br />

			<Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
				<Modal.Header closeButton>
					<Modal.Title>Remove confirmation</Modal.Title>
				</Modal.Header>
				<Modal.Body
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: ' baseline',
					}}
				>
					<p>
						Are you sure you want to remove <b>{removeCandidate.username} </b>{' '}
						from repository ?
					</p>
				</Modal.Body>

				<Modal.Footer>
					<Button
						variant="success"
						onClick={() => {
							setRepositoryCollaborators(
								repositoryCollaborators.filter(
									(collaborator) =>
										collaborator.username != removeCandidate.username
								)
							);
							handleDeleteModalClose();
							alert(
								'TODO: Add an API call to delete collaborator from collaborators'
							);
						}}
					>
						Remove
					</Button>
					<Button variant="danger" onClick={handleDeleteModalClose}>
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ManageAccess;
