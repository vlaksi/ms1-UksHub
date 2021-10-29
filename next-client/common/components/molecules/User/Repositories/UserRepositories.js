import RepositoryListItem from '../../../atoms/RepositoryListItem/RepositoryListItem';

// TODO: Get this repositories for passed username
const repositories = [
	{
		name: 'ms1-UksHub',
	},
	{
		name: 'Election-DAPP',
	},
];

const UserRepositories = ({ username }) => {
	return (
		<>
			{repositories.map((repository) => {
				return (
					<RepositoryListItem
						key={repository.name}
						username={username}
						name={repository.name}
					/>
				);
			})}
		</>
	);
};

export default UserRepositories;
