import { Card, Button, Badge } from 'react-bootstrap';
import { MdArrowForwardIos } from 'react-icons/md';
import Link from 'next/link';
import { getUserById } from '../../../services/useractivity/userService';
import { useRouter } from 'next/router';

const PullRequestItem = ({ pullRequest }) => {
	const router = useRouter();
	const { user, repository } = router.query;
	const getUser = async () => {
		let user = await getUserById(pullRequest.author);
		let retValue;
		retValue = user.username;
		console.log(pullRequest.author);
		console.log(retValue);
	};

	return (
		<Card border="primary" style={{ width: '40rem', marginTop: '15px' }}>
			<Card.Body>
				<Card.Title
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<div style={{ display: 'flex' }}>
						<Badge
							pill
							bg="primary"
							text="light"
							style={{ marginRight: '10px' }}
						>
							#{pullRequest.pk}
						</Badge>{' '}
						{pullRequest.title}
					</div>
					<div>
						<Button variant="primary">
							<Link href={`/${user}/${repository}/pulls/${pullRequest.pk}`}>
								<a style={{ textDecoration: 'none', color: 'white' }}>
									Show details <MdArrowForwardIos />{' '}
								</a>
							</Link>
						</Button>
					</div>
				</Card.Title>
				<Card.Text>
					Opened
					<Badge pill bg="light" text="dark">
						{pullRequest.creation_date.substring(0, 10)}
					</Badge>
					by
					<Badge pill bg="light" text="dark"></Badge>
				</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default PullRequestItem;
