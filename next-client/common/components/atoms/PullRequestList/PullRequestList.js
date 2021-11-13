import { Card, Button } from 'react-bootstrap';
import {MdArrowForwardIos} from "react-icons/md";

  const PullRequestList = ({pullRequests}) => {
    const renderCards = (card) => {
		return(
			<div>
				<Card key={card.title} border="primary" style={{ width: '40rem', marginTop:'15px' }} >
					<Card.Body>
						<Card.Title>{card.title}</Card.Title>
						<Card.Text>
							#36 Opened 12/10/2021 by vaksi {card.text}

						</Card.Text>	
						<Button variant="primary" style={{marginLeft:'25rem'}}>Show details <MdArrowForwardIos /> </Button>
					</Card.Body>
				</Card>
			</div>
		);
	  };


    return(
        <>
            {pullRequests.map(renderCards)}
        </>
    );
  };

  export default PullRequestList;