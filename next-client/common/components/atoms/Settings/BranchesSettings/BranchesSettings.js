import { Card, FormControl, InputGroup, Button } from 'react-bootstrap';

const BranchesSettings = () => {
	return (
		<>
			<Card border="light" style={{ width: '100%' }}>
				<Card.Header>Default branch</Card.Header>
				<Card.Body>
					<Card.Text>
						The default branch is considered the “base” branch in your
						repository, against which all pull requests and code commits are
						automatically made, unless you specify a different branch
					</Card.Text>
					{/* TODO: Add a section for default branch & icon to trigger modal with changing options */}
				</Card.Body>
			</Card>
			<br />
		</>
	);
};

export default BranchesSettings;
