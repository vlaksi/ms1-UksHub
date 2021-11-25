import { useState } from 'react';

import { Row, Col, Form, Button } from 'react-bootstrap';

import { register } from './../../common/services/authentication/authenticationService';

const Registration = () => {
	const [passsword, setPassword] = useState();
	const [username, setUsername] = useState();
	const [first_name, setFirst_name] = useState();
	const [last_name, setLast_name] = useState();
	const [email, setEmail] = useState();

	return (
		<Row className="justify-content-md-center">
			<Col md={4}>
				<Form className="mt-5">
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>First name</Form.Label>
						<Form.Control type="text" placeholder="Enter first name" onChange={(event) => setFirst_name(event.target.value)} />
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Last name</Form.Label>
						<Form.Control type="text" placeholder="Enter last name" onChange={(event) => setLast_name(event.target.value)} />
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Email</Form.Label>
						<Form.Control type="text" placeholder="Enter email" onChange={(event) => setEmail(event.target.value)} />
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Username</Form.Label>
						<Form.Control type="text" placeholder="Enter username" onChange={(event) => setUsername(event.target.value)} />
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
					</Form.Group>

					<Button variant="success" className="mt-2 mb-5" onClick={() => register(username, passsword, first_name, last_name, email)}>
						Register
					</Button>
				</Form>
			</Col>
		</Row >
	);
};

export default Registration;
