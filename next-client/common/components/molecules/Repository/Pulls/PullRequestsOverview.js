import { Button, Card, Badge} from 'react-bootstrap';
import { BsFillTagsFill } from "react-icons/bs";
import { GoMilestone } from "react-icons/go";
import { MdAddCircle, MdArrowForwardIos } from "react-icons/md";

const PullRequestsOverview = () => {
	return (
		<>
			<div style={{display: 'flex', justifyContent: 'flex-end'}}>
				<Button style={{marginRight: '5px'}} variant="primary" variant="outline-primary"><BsFillTagsFill size={18}/> Labels</Button>
				<Button style={{marginRight: '5px', marginLeft: '5px'}} variant="primary" variant="outline-primary"><GoMilestone size={18}/> Milestones</Button>
				<Button style={{marginLeft: '5px'}} variant="primary"><MdAddCircle size={24}/> Add pull request</Button>
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
