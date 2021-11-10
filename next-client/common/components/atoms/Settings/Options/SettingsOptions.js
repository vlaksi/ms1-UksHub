import { useState } from 'react';
import { Card, FormControl, InputGroup, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const SettingsOptions = ({ repositoryId }) => {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [newRepositoryName, setNewRepositoryName] = useState('');

	const handleRepositoryNameChanging = (newName) => {
		setNewRepositoryName(newName);
	};

	const updateRepositoryName = () => {
		axios
			.request({
				url: `/versioning/repositorys/${repositoryId}`,
				method: 'patch',
				baseURL: 'http://127.0.0.1:8000/',
				auth: {
					username: 'vaksi', // This is the client_id
					password: 'root', // This is the client_secret
				},
				data: {
					name: newRepositoryName,
					grant_type: 'client_credentials',
					scope: 'public',
				},
			})
			.then((respose) => {
				console.log(respose);
			});
	};

	const deleteRepository = () => {
		axios
			.request({
				url: `/versioning/repositorys/${repositoryId}`,
				method: 'delete',
				baseURL: 'http://127.0.0.1:8000/',
				auth: {
					username: 'vaksi', // This is the client_id
					password: 'root', // This is the client_secret
				},
				data: {
					grant_type: 'client_credentials',
					scope: 'public',
				},
			})
			.then((respose) => {
				console.log(respose);
			});
	};

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
							placeholder="New repository name"
							aria-label="Repository name"
							aria-describedby="basic-addon2"
							onChange={(e) => {
								handleRepositoryNameChanging(e.target.value);
							}}
						/>
						<Button
							variant="success"
							id="button-addon2"
							onClick={() => {
								updateRepositoryName();
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
							deleteRepository();
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
