import { useEffect, useState } from 'react';
import { getRepositoryById } from '../../../../services/versioning/repositoryService';
import Link from 'next/link';
import UserItem from '../../../atoms/UserItem/UserItem';

const userMockup = [
	{
		username: 'vlaksi',
	},
	{
		username: 'anciz',
	},
];

const RepositoryWatchers = ({ username, repositoryId }) => {
	// TODO: Find a way how to only get once upon repository eg.
	const [repository, setRepository] = useState();

	useEffect(async () => {
		if (!repositoryId) return;
		setRepository(await getRepositoryById(repositoryId));
	}, [repositoryId]);

	return (
		<>
			{repository && (
				<>
					{/* Name of the user/repo */}
					<div>
						<h4>
							<Link href={`/${username}`}>
								<a style={{ textDecoration: 'none', color: '#444' }}>
									{username}
								</a>
							</Link>{' '}
							/{' '}
							<Link href={`/${username}/${repository.pk}`}>
								<a style={{ textDecoration: 'none', color: '#444' }}>
									{repository.name}
								</a>
							</Link>{' '}
						</h4>
					</div>
					<hr></hr>
					{userMockup.map((user) => {
						return <UserItem key={user.username} user={user} />;
					})}
				</>
			)}
		</>
	);
};

export default RepositoryWatchers;
