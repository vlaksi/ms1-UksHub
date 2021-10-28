import { Row, Col, Form, Button } from 'react-bootstrap';

const Login = () => {
	return (
		<Row className="justify-content-md-center">
			<Col md={4}>
				<Form className="mt-5">
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control type="email" placeholder="Enter email" />
						<Form.Text className="text-muted">
							We'll never share your email with anyone else.
						</Form.Text>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" />
					</Form.Group>

					<Button variant="success" type="submit" className="mt-2 mb-5">
						Login
					</Button>
				</Form>
			</Col>
		</Row>
	);
};

export default Login;
