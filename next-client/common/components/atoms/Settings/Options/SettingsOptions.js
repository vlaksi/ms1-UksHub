import { Card, FormControl, InputGroup, Button } from 'react-bootstrap';

const SettingsOptions = () => {
	return (
		<>
			<Card border="light" style={{ width: '100%' }}>
				<Card.Header>Settings</Card.Header>
				<Card.Body>
					<Card.Title>Repository name</Card.Title>
					<InputGroup className="mb-3 mt-3">
						<FormControl
							placeholder="Repository name"
							aria-label="Repository name"
							aria-describedby="basic-addon2"
						/>
						<Button
							variant="success"
							id="button-addon2"
							onClick={() => {
								alert('TODO: API call to rename repository');
							}}
						>
							Rename
						</Button>
					</InputGroup>
				</Card.Body>
			</Card>
			<br />

			<Card border="danger" style={{ width: '100%' }}>
				<Card.Header>Danger Zone</Card.Header>
				<Card.Body
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<Card.Title>Delete this repository</Card.Title>
					<Button
						variant="danger"
						onClick={() => {
							alert('TODO: Delete modal with confirmation');
						}}
					>
						Danger
					</Button>
				</Card.Body>
			</Card>
		</>
	);
};

export default SettingsOptions;
