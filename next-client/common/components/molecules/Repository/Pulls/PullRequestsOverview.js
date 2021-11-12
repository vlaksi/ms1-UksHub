import { Button, Card, Modal, Form} from 'react-bootstrap';
import { BsFillTagsFill } from "react-icons/bs";
import { GoMilestone } from "react-icons/go";
import { MdAddCircle, MdArrowForwardIos } from "react-icons/md";
import {useState} from 'react';

const PullRequestsOverview = () => {
	const [show, setShow] = useState(false);
	const handleClose = () => {setShow(false);}
	const handleShow = () => setShow(true);

	const [newPullRequestName, setNewPullRequestName] = useState('');
	const handlePullRequestNameAdding = (newName) => {
		setNewPullRequestName(newName);
	};

	const [newCompareBranch, setNewCompareBranch] = useState('');
	const handleCompareBranchAdding = (newCompareBranch) => {
		setNewCompareBranch(newCompareBranch);
	};

	const [newBaseBranch, setNewBaseBranch] = useState('');
	const handleBaseBranchAdding = (newBaseBranch) => {
		setNewBaseBranch(newBaseBranch);
	};


	return (
		<>
			<div style={{display: 'flex', justifyContent: 'flex-end'}}>
				<Button style={{marginRight: '5px'}} variant="primary" variant="outline-primary"><BsFillTagsFill size={18}/> Labels</Button>
				<Button style={{marginRight: '5px', marginLeft: '5px'}} variant="primary" variant="outline-primary"><GoMilestone size={18}/> Milestones</Button>
				<Button style={{marginLeft: '5px'}} variant="primary" onClick={handleShow}><MdAddCircle size={24}/> Add pull request</Button>
				
				<Modal show={show} onHide={handleClose} backdrop="static">
					<Modal.Header closeButton>
						<Modal.Title>Add new pull request</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group className="mb-3">
								<Form.Label>Name of pull request</Form.Label>
								<Form.Control type="name" placeholder="Enter name of pull request"
									onChange={(e) => {
										handlePullRequestNameAdding(e.target.value);}}
								>
								</Form.Control>
								<Form.Label>Compare branch</Form.Label>
								<Form.Control type="name" placeholder="Enter compare branch"
									onChange={(e) => {
										handleCompareBranchAdding(e.target.value);}}
								>
								</Form.Control>
								<Form.Label>Base branch</Form.Label>
								<Form.Control type="name" placeholder="Enter base branch"
									onChange={(e) => {
										handleBaseBranchAdding(e.target.value);}}
								>
								</Form.Control>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="success"
						>
							Save Changes
						</Button>
						<Button variant="danger" onClick={handleClose}>
							Cancel
						</Button>
						
						
					</Modal.Footer>
				</Modal>
				
			</div>
			<div style={{display:'flex'}} >
				<Card border="primary">
					<Card.Body>
						<Card.Title>Name of pull request</Card.Title>
						<Card.Text>
							#36 Opened 12/10/2021 by vaksi
							<Button variant="primary" size="sm" style={{marginLeft: '15px'}}>Show details<MdArrowForwardIos/></Button>
						</Card.Text>	
					</Card.Body>
				</Card>
			</div>
		</>
	);
};

export default PullRequestsOverview;
