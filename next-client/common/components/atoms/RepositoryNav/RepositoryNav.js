import Link from 'next/link';

const RepositoryNav = ({ username, repository }) => {
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'baseline',
				justifyContent: 'space-between',
			}}
		>
			<div>
				<h4>
					{/* <Link href={`/${username}`}>
						<a style={{ textDecoration: 'none', color: '#444' }}>{username}</a>
					</Link>{' '}
					/{' '}
					<Link href={`/${username}/${repository.pk}`}>
						<a style={{ textDecoration: 'none', color: '#444' }}>
							{repository.name}
						</a>
					</Link>{' '} */}
				</h4>
			</div>
		</div>
	);
};

export default RepositoryNav;
