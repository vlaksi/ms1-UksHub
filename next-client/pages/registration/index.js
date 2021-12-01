import { useState } from 'react';
import Router from 'next/router'
import { Row, Col, Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { register } from './../../common/services/authentication/authenticationService';

const Registration = () => {
	const [passsword, setPassword] = useState();
	const [username, setUsername] = useState();
	const [first_name, setFirst_name] = useState();
	const [last_name, setLast_name] = useState();
	const [email, setEmail] = useState();
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
			register(username, passsword, first_name, last_name, email).then((response) => {
				setValidated(true);
				toast.success('Success registration!')
				document.body.style.cursor = 'default';
				Router.push('/login')
			}).catch((error) => {
				document.body.style.cursor = 'default';
				if (error.response.data.email) {
					toast.error('' + error.response.data.email)
				}
				if (error.response.data.username) {
					toast.error('' + error.response.data.username)
				}
				if (error.response.data.password) {
					toast.error('' + error.response.data.password)
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
						<Form.Label>First name</Form.Label>
						<Form.Control required type="text" placeholder="Enter first name" onChange={(event) => setFirst_name(event.target.value)} />
						<Form.Control.Feedback type="invalid">
							Please provide a valid state.
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Last name</Form.Label>
						<Form.Control required type="text" placeholder="Enter last name" onChange={(event) => setLast_name(event.target.value)} />
						<Form.Control.Feedback type="invalid">
							Please provide a valid state.
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Email</Form.Label>
						<Form.Control required type="email" placeholder="Enter email" onChange={(event) => setEmail(event.target.value)} />
						<Form.Control.Feedback type="invalid">
							Please provide a valid state.
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Username</Form.Label>
						<Form.Control required type="text" placeholder="Enter username" onChange={(event) => setUsername(event.target.value)} />
						<Form.Control.Feedback type="invalid">
							Please provide a valid state.
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control required type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
						<Form.Control.Feedback type="invalid">
							Please provide a valid state.
						</Form.Control.Feedback>
					</Form.Group>

					<Button variant="primary" type="submit" className="mt-2 mb-5">
						Register
					</Button>
				</Form>
			</Col>
		</Row >
	);
};

export default Registration;
