import { Row, Col, Form, Button } from 'react-bootstrap';

const Registration = () => {
	return (
		<Row className="justify-content-md-center">
			<Col md={4}>
				<Form className="mt-5">
					<Form.Group className="mb-3" controlId="formBasicName">
						<Form.Label>Name</Form.Label>
						<Form.Control placeholder="Enter your name" />
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control type="email" placeholder="Enter email" />
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" />
					</Form.Group>

					<Button variant="success" type="submit" className="mt-2 mb-5">
						Register
					</Button>
				</Form>
			</Col>
		</Row>
	);
};

export default Registration;
