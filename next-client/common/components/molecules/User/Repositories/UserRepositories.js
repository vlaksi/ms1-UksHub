import RepositoryListItem from '../../../atoms/RepositoryListItem/RepositoryListItem';
import { Button } from 'react-bootstrap';
import { MdAddCircle } from "react-icons/md";

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

			<div style={{display: 'flex', justifyContent: 'flex-end'}}>
				<Button variant="outline-primary" >	<MdAddCircle size={24}/> Add repository</Button>
			</div>
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
