import RepositoryListItem from '../../../atoms/RepositoryListItem/RepositoryListItem';
import { Button, Modal, Form } from 'react-bootstrap';
import { MdAddCircle } from "react-icons/md";
import {useState} from 'react';
import axios from 'axios';

// TODO: Get this repositories for passed username
const repositories = [
	{
		name: 'ms1-UksHub',
	},
	{
		name: 'Election-DAPP',
	},

];

const UserRepositories = ({ username }) => {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [newRepositoryName, setNewRepositoryName] = useState('');
	const handleRepositoryNameAdding = (newName) => {
		setNewRepositoryName(newName);
	};

	const [newRepositoryDescription, setNewRepositoryDescription] = useState('');
	const handleRepositoryDescriptionAdding = (newDescription) => {
		setNewRepositoryDescription(newDescription);
	};


	const addRepositoryName = () => {
		axios
			.request({
				url: `/versioning/repositorys/`,
				method: 'post',
				baseURL: 'http://127.0.0.1:8000/',
				auth: {
					username: 'anci', // This is the client_id
					password: 'root', // This is the client_secret
				},
				data: {
					name: newRepositoryName,
					description: newRepositoryDescription,
					grant_type: 'client_credentials',
					scope: 'public',
				},
			})
			.then((respose) => {
				console.log(respose);
				handleClose();
			});
	};

	return (
		<>

			<div style={{display: 'flex', justifyContent: 'flex-end'}}>
				<Button variant="outline-primary" onClick={handleShow}>	<MdAddCircle size={24}/> Add repository</Button>

				<Modal show={show} onHide={handleClose} backdrop="static">
					<Modal.Header closeButton>
						<Modal.Title>Add new repository</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group className="mb-3">
								<Form.Label>Name of repository</Form.Label>
								<Form.Control type="name" placeholder="Enter name of repository"
									 onChange={(e) => {
										handleRepositoryNameAdding(e.target.value);}}>
								</Form.Control>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Description of repository</Form.Label>
								<Form.Control as="textarea" rows={3} placeholder="Describe your repository"
									 onChange={(e) => {
										handleRepositoryDescriptionAdding(e.target.value);}}
								>

								</Form.Control>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="danger" onClick={handleClose}>
							Cancel
						</Button>
						<Button variant="success"
							onClick={() => {
								addRepositoryName();
							}}
						>
							Save Changes
						</Button>
					</Modal.Footer>
				</Modal>
			</div>


			{repositories.map((repository) => {
				return (
					<RepositoryListItem
						key={repository.name}
						username={username}
						name={repository.name}
					/>
				);
			})}
		</>
	);
};

export default UserRepositories;
