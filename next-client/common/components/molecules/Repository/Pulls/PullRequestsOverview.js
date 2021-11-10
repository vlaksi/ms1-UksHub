import { Button} from 'react-bootstrap';
import { BsFillTagsFill } from "react-icons/bs";
import { GoMilestone } from "react-icons/go";
import { MdAddCircle } from "react-icons/md";

const PullRequestsOverview = () => {
	return (
		<>
			<div style={{display: 'flex', justifyContent: 'flex-end'}}>
				<Button style={{marginRight: '5px'}} variant="primary" variant="outline-primary"><BsFillTagsFill size={18}/> Labels</Button>
				<Button style={{marginRight: '5px', marginLeft: '5px'}} variant="primary" variant="outline-primary"><GoMilestone size={18}/> Milestones</Button>
				<Button style={{marginLeft: '5px'}} variant="primary"><MdAddCircle size={24}/> Add pull request</Button>
			</div>
		</>
	);
};

export default PullRequestsOverview;
