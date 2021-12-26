import { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { MdAddCircle } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import { addUser, deleteUser, editUser, getAllUsers } from '../../../services/useractivity/userService';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isAddMode, setIsAddMode] = useState(false);
    const [user, setUser] = useState();
    const [userId, setUserId] = useState('');
    const [userUsername, setNewUsername] = useState('');
    const [userFirstName, setNewFirstName] = useState('');
    const [userLastName, setNewLastName] = useState('');
    const [userEmail, setNewEmail] = useState('');
    const [userPassword, setNewPassword] = useState('');

    const handleClose = () => {
        setShow(false);
        setUserId('');
        setNewUsername('');
        setNewFirstName('');
        setNewLastName('');
        setNewPassword('');
        setNewEmail('');
    };
    const handleShowDeleteUserModal = (user) => {
        setShowDeleteModal(true);
        setUser(user);
    };

    const showEditUser = (user) => {
        console.log(user);
        setIsAddMode(false);
        setUserId(user.pk);
        setNewUsername(user.username);
        setNewFirstName(user.first_name);
        setNewLastName(user.first_name);
        setNewPassword('');
        setNewEmail(user.email);
        setShow(true);
    };

    const showAddUser = () => {
        setIsAddMode(true);
        setShow(true);
    };

    const notify = () => toast.success(isAddMode ? 'Successfully created new user!' : 'User successfully updated.');
    const notifyDeletedUser = () => toast.success('User successfully deleted.');
    const notifyError = () => toast.error('Check if you entered all fields!');

    const handleUsernameChange = (newUsername) => {
        setNewUsername(newUsername);
    };

    const handleFirstNameChange = (newFirstName) => {
        setNewFirstName(newFirstName);
    };

    const handleLastNameChange = (newLastName) => {
        setNewLastName(newLastName);
    };

    const handleEmailChange = (newEmail) => {
        setNewEmail(newEmail);
    };

    const handlePasswordChange = (newPassword) => {
        setNewPassword(newPassword);
    };

    const addOrUpdateUser = async () => {
        let createdUser = isAddMode ? await addUser(userUsername, userPassword, userFirstName, userLastName, userEmail) : await editUser(userId, userUsername, userPassword, userFirstName, userLastName, userEmail);

        if (!createdUser) {
            notifyError();
            return;
        } else {
            notify();
            handleClose();
            setUsers(await getAllUsers());
        }
    };

    const handleDeleteModalClose = () => setShowDeleteModal(false);

    const deleteUserCommand = async (user) => {
        await deleteUser(user.pk);
        notifyDeletedUser();
        setUser();
        setUsers(await getAllUsers());
    };

    useEffect(async () => {
        setUsers(await getAllUsers());
        setIsAddMode(true);
    }, []);

    return (
        <>
            <Button variant="outline-primary" onClick={showAddUser}>
                {' '}
                <MdAddCircle size={24} /> Add user
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>{isAddMode ? 'Add User' : 'Edit User'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Enter username"
                                value={userUsername}
                                onChange={(e) => {
                                    handleUsernameChange(e.target.value);
                                }}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Enter first name"
                                value={userFirstName}
                                onChange={(e) => {
                                    handleFirstNameChange(e.target.value);
                                }}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Enter last name"
                                value={userLastName}
                                onChange={(e) => {
                                    handleLastNameChange(e.target.value);
                                }}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={userEmail}
                                onChange={(e) => {
                                    handleEmailChange(e.target.value);
                                }}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                onChange={(e) => {
                                    handlePasswordChange(e.target.value);
                                }}
                            ></Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="success"
                        onClick={() => {
                            addOrUpdateUser();
                        }}
                    >
                        Save Changes
                    </Button>
                    <Button variant="danger" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer position="top-right" autoClose={3000}></ToastContainer>

            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Id</th>
                        <th scope="col">Username</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user, index) => {
                        return (
                            <tr key={user.pk}>
                                <td>{index + 1}</td>
                                <td>{user.pk}</td>
                                <td>{user.username}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Button variant="success" onClick={() => showEditUser(user)}>
                                        Edit
                                    </Button>{' '}
                                    <Button
                                        variant="danger"
                                        onClick={() => {
                                            handleShowDeleteUserModal(user);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Delete repository */}
            <Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: ' baseline',
                    }}
                >
                    <p>Are you sure you want to delete user "{user?.username}" ?</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="success"
                        onClick={() => {
                            deleteUserCommand(user);
                            handleDeleteModalClose();
                        }}
                    >
                        Delete
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => {
                            handleDeleteModalClose();
                        }}
                    >
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Users;
