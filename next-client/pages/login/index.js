import { useState } from 'react';
import Router from 'next/router'
import { Row, Col, Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

import { login } from './../../common/services/authentication/authenticationService';


const Login = () => {
	const [passsword, setPassword] = useState();
	const [username, setUsername] = useState();
	const [validated, setValidated] = useState(false);

	const handleSubmit = (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}
		if (form.checkValidity() === true) {
			event.preventDefault();
			event.stopPropagation();
			document.body.style.cursor = 'wait';
			login(username, passsword).then((response) => {
				if (typeof window !== "undefined") {
					localStorage.setItem('token', response.data.access)
				}
				setValidated(true);
				document.body.style.cursor = 'default';
				Router.push('/home')
			}).catch((error) => {
				document.body.style.cursor = 'default';
				console.log(error.response)
				if (error.response.data.detail) {
					toast.error('' + error.response.data.detail)
				}
				return null;
			});
		}
		setValidated(true);
	};

	return (
		<Row className="justify-content-md-center">
			<ToastContainer position="top-right" autoClose={3000}></ToastContainer>
			<Col md={4}>
				<Form className="mt-5" noValidate validated={validated} onSubmit={handleSubmit}>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Username</Form.Label>
						<Form.Control required type="username" placeholder="Enter username" onChange={(event) => setUsername(event.target.value)} />
						<Form.Control.Feedback type="invalid">
							Please provide a valid state.
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Password*</Form.Label>
						<Form.Control required type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
						<Form.Control.Feedback type="invalid">
							Please provide a valid state.
						</Form.Control.Feedback>
					</Form.Group>

					<Button variant="primary" className="mt-2 mb-5" type="submit"
					>
						Login
					</Button>
				</Form>
			</Col>
		</Row >
	);
};

export default Login;
