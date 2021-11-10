import RepositoryListItem from '../../../atoms/RepositoryListItem/RepositoryListItem';
import { Button, Modal, Form } from 'react-bootstrap';
import { MdAddCircle } from "react-icons/md";
import {useState} from 'react';

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
								<Form.Control type="name" placeholder="Enter name of repository" />
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Description of repository</Form.Label>
								<Form.Control as="textarea" rows={3} placeholder="Describe your repository"/>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="danger" onClick={handleClose}>
							Cancel
						</Button>
						<Button variant="success" onClick={handleClose}>
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
