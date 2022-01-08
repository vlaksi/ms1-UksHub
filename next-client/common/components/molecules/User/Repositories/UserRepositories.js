import RepositoryListItem from '../../../atoms/RepositoryListItem/RepositoryListItem';
import { Button, Modal, Form } from 'react-bootstrap';
import { MdAddCircle } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {
  addRepository,
  getAllRepositoriesByAuthor,
  updateRepositoryDefaultBranch,
} from '../../../../services/versioning/repositoryService';
import { createBranch } from '../../../../services/versioning/branchService';

const UserRepositories = ({ username, author_id }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setNewRepositoryName('');
    setNewRepositoryDescription('');
  };
  const handleShow = () => setShow(true);

  const notify = () => toast.success('Successfully created new repository!');
  const notifyError = () => toast.error('Check if you entered all fields!');

  const [newRepositoryName, setNewRepositoryName] = useState('');
  const handleRepositoryNameAdding = (newName) => {
    setNewRepositoryName(newName);
  };

  const [newRepositoryDescription, setNewRepositoryDescription] = useState('');
  const handleRepositoryDescriptionAdding = (newDescription) => {
    setNewRepositoryDescription(newDescription);
  };

  const [newRepositoryList, setNewRepositoryList] = useState([]);

  const addNewRepository = async () => {
    let createdRepository = await addRepository(
      newRepositoryName,
      newRepositoryDescription,
      '8'
    );
    //TODO: Change author id (can be read from the url via 'user' attribute)
    if (!createdRepository) {
      notifyError();
      return;
    }
    let createdDefaultBranch = await createBranch(createdRepository.pk);
    if (!createdDefaultBranch) {
      notifyError();
      return;
    }
    let updatedRepository = await updateRepositoryDefaultBranch(
      createdDefaultBranch.repository,
      createdDefaultBranch.pk
    );
    if (updatedRepository) {
      notify();
      handleClose();
      setNewRepositoryList(await getAllRepositoriesByAuthor(author_id));
    } else {
      notifyError();
    }
  };

  useEffect(async () => {
    if (!author_id) return;
    setNewRepositoryList(await getAllRepositoriesByAuthor(author_id));
  }, [author_id]);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="outline-primary" onClick={handleShow}>
          {' '}
          <MdAddCircle size={24} /> Add repository
        </Button>

        <Modal show={show} onHide={handleClose} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Add new repository</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name of repository</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name of repository"
                  onChange={(e) => {
                    handleRepositoryNameAdding(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description of repository</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Describe your repository"
                  onChange={(e) => {
                    handleRepositoryDescriptionAdding(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              onClick={() => {
                addNewRepository();
              }}
            >
              Save Changes
            </Button>
            <Button variant="danger" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <ToastContainer position="top-right" autoClose={3000}></ToastContainer>

      {newRepositoryList?.map((repository) => {
        return (
          <RepositoryListItem
            key={repository.pk}
            username={username}
            repository={repository}
          />
        );
      })}
    </>
  );
};

export default UserRepositories;
