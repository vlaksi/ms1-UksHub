import { Row, Col, Container } from 'react-bootstrap';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getUserById } from '../../../services/useractivity/userService';
import { BiGitRepoForked } from 'react-icons/bi';

const RepositoryListItem = ({ username, repository }) => {
	const [forkedFromUser, setForkedFromUser] = useState();

	useEffect(async () => {
		if (!repository) return;
		if (repository.forked_from_author) {
			setForkedFromUser(await getUserById(repository.forked_from_author));
		}
	}, []);
	return (
		<>
			<Container className="mt-4">
				<Row>
					<Col>
						<Link href={`/${username}/${repository.pk}`}>
							<a style={{ textDecoration: 'none', color: '#444' }}>
								<h5>{repository.name}</h5>
								{repository.forked_from_author && forkedFromUser && (
									<p style={{ fontSize: '10px', marginLeft: '20px' }}>
										<BiGitRepoForked /> Forked from some of {''}
										{forkedFromUser.username} repositories
									</p>
								)}
							</a>
						</Link>
					</Col>
					{/* TMP: Add something if we want */}
					<Col md="auto"> ~ </Col>
					<Col xs lg="2">
						/
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default RepositoryListItem;
