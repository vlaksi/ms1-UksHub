import { Card, Button } from 'react-bootstrap';
import { MdArrowForwardIos } from 'react-icons/md';
import Link from 'next/link';
import { useRouter } from 'next/router';

const PullRequestList = ({ pullRequests }) => {
	const router = useRouter();
	const { user, repository } = router.query;

	const renderCards = (pullRequest) => {
		return (
			<div key={pullRequest.pk}>
				<Card border="primary" style={{ width: '40rem', marginTop: '15px' }}>
					<Card.Body>
						<Card.Title>{pullRequest.title}</Card.Title>
						<Card.Text>
							#36 Opened 12/10/2021 by vaksi {pullRequest.text}
						</Card.Text>
						<Button variant="primary" style={{ marginLeft: '25rem' }}>
							<Link href={`/${user}/${repository}/pulls/${pullRequest.pk}`}>
								<a style={{ textDecoration: 'none', color: 'white' }}>
									Show details <MdArrowForwardIos />{' '}
								</a>
							</Link>
						</Button>
					</Card.Body>
				</Card>
			</div>
		);
	};

	return <>{pullRequests.map(renderCards)}</>;
};

export default PullRequestList;
