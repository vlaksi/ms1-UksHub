import {
	Card,
	FormControl,
	InputGroup,
	Button,
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
						{collaborators.map((collaborator) => {
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
												alert('TODO: Delete modal with confirmation');
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
		</>
	);
};

export default ManageAccess;
