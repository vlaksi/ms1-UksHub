import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getRepositoryById } from '../../../services/versioning/repositoryService';
import { getUserById } from './../../../services/useractivity/userService';

const RepositoryNav = () => {
	const router = useRouter();
	const { user, repository } = router.query;
	const [author, setAuthor] = useState();
	const [authorRepository, setAuthorRepository] = useState();

	useEffect(async () => {
		if (!user || !repository) return;
		setAuthorRepository(await getRepositoryById(repository));
		setAuthor(await getUserById(user));
	}, [user, repository]);

	return (
		<>
			{author && authorRepository && (
				<div
					style={{
						display: 'flex',
						alignItems: 'baseline',
						justifyContent: 'space-between',
						borderBottom: '1px solid #f5f1f1',
						marginBottom: '10px',
					}}
				>
					<div>
						<h4>
							<Link href={`/${author.pk}`}>
								<a style={{ textDecoration: 'none', color: '#444' }}>
									{author.username}
								</a>
							</Link>{' '}
							/{' '}
							<Link href={`/${author.pk}/${authorRepository.pk}`}>
								<a style={{ textDecoration: 'none', color: '#444' }}>
									{authorRepository.name}
								</a>
							</Link>{' '}
						</h4>
					</div>
				</div>
			)}
		</>
	);
};

export default RepositoryNav;
