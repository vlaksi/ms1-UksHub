import { useState } from 'react';
import { Card, FormControl, InputGroup, Button, Modal } from 'react-bootstrap';
import SearchBar from '../../Search/SearchBar';

const SettingsOptions = () => {
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const handleDeleteModalClose = () => setShowDeleteModal(false);
	const handleShowDeleteModal = () => setShowDeleteModal(true);
	return (
		<>
			<Card border="light" style={{ width: '100%' }}>
				<Card.Header>Settings</Card.Header>
				<Card.Body>
					<Card.Title>Repository name</Card.Title>
					<InputGroup className="mb-3 mt-3">
						<FormControl
							placeholder="Repository name"
							aria-label="Repository name"
							aria-describedby="basic-addon2"
						/>
						<Button
							variant="success"
							id="button-addon2"
							onClick={() => {
								alert('TODO: API call to rename repository');
							}}
						>
							Rename
						</Button>
					</InputGroup>
				</Card.Body>
			</Card>
			<br />

			<Card border="danger" style={{ width: '100%' }}>
				<Card.Header>Danger Zone</Card.Header>
				<Card.Body
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<Card.Title>Delete this repository</Card.Title>
					<Button variant="danger" onClick={handleShowDeleteModal}>
						Danger
					</Button>
				</Card.Body>
			</Card>

			{/* Delete repository */}
			<Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
				<Modal.Header closeButton>
					<Modal.Title>Delete confirmation</Modal.Title>
				</Modal.Header>
				<Modal.Body
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: ' baseline',
					}}
				>
					<p>Are you sure you want to delete this repository ?</p>
				</Modal.Body>

				<Modal.Footer>
					<Button
						variant="success"
						onClick={() => {
							handleDeleteModalClose();
							alert('TODO: Add an API to delete this repository');
						}}
					>
						Delete
					</Button>
					<Button variant="danger" onClick={handleDeleteModalClose}>
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default SettingsOptions;
