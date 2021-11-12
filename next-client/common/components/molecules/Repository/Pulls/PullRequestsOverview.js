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

	const cardsInfo = [
		{
		  title: "First Title",
		  text: "First Text"
		},
		{
		  title: "second Title",
		  text: "second Text"
		
		},
		{
		  title: "third Title",
		  text: "third Text"
		}
	  ];

	  const renderCards = (card,index) => {
		return(
			<div>
				<Card border="primary" style={{ width: '40rem', marginTop:'15px' }} key={index}>
					<Card.Body>
						<Card.Title>{card.title}</Card.Title>
						<Card.Text>
							#36 Opened 12/10/2021 by vaksi {card.text}
							
						</Card.Text>	
						<Button variant="primary" style={{marginLeft:'25rem'}}>Show details<MdArrowForwardIos/></Button>
					</Card.Body>
				</Card>
			</div>
		);
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
		
								<Form.Label className="mt-3">Compare branch</Form.Label>
								<Form.Select  aria-label="Default select example" 
										onChange={(e) => {
										handleCompareBranchAdding(e.target.value);}}
								>
									<option>Open this select menu</option>
									<option value="1">One</option>
									<option value="2">Two</option>
									<option value="3">Three</option>
								</Form.Select>

								<Form.Label className="mt-3">Base branch</Form.Label>
								<Form.Select aria-label="Default select example" 
										onChange={(e) => {
										handleBaseBranchAdding(e.target.value);}}
								>
									<option>Open this select menu</option>
									<option value="1">One</option>
									<option value="2">Two</option>
									<option value="3">Three</option>
								</Form.Select>
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
			{cardsInfo.map(renderCards)}
			
		</>
	);
};

export default PullRequestsOverview;
