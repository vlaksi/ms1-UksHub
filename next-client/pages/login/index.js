import { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

import { login } from './../../common/services/authentication/authenticationService';


const Login = () => {
	const [passsword, setPassword] = useState();
	const [username, setUsername] = useState();
	return (
		<Row className="justify-content-md-center">
			<Col md={4}>
				<Form className="mt-5">
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Email address*</Form.Label>
						<Form.Control type="username" placeholder="Enter username" onChange={(event) => setUsername(event.target.value)} />
						<Form.Text className="text-muted">
							We'll never share your username with anyone else.
						</Form.Text>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Password*</Form.Label>
						<Form.Control type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
					</Form.Group>

					<Button variant="success" className="mt-2 mb-5" onClick={() => login(username, passsword)}
					>
						Login
					</Button>
				</Form>
			</Col>
		</Row >
	);
};

export default Login;
