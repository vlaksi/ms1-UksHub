import { useEffect, useState } from 'react';
import {
  Card,
  FormControl,
  InputGroup,
  Button,
  Modal,
  ListGroup,
  Dropdown,
} from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';
import { getUserDataForSearch } from '../../../../services/useractivity/userService';
import {
  createCollaboration,
  deleteCollaborationById,
  getAllCollaboratorsRoles,
  getRepositoryCollaboratos,
  updateCollaboratorRole,
} from '../../../../services/versioning/repositoryService';
import UserSearch from '../../UserSearch/UserSearch';

const ManageAccess = ({ repository }) => {
  const [removeCandidate, setRemoveCandidate] = useState('');
  const [repositoryCollaborators, setRepositoryCollaborators] = useState([]);
  const [repositoryRoles, setRepositoryRoles] = useState([]);
  const [bufferRole, setBufferRole] = useState();
  const [editCollaborator, setEditCollaborator] = useState('');
  const [userDataForSearch, setUserDataForSearch] = useState([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditModalClose = () => setShowEditModal(false);
  const handleShowEditModal = () => setShowEditModal(true);

  const handleDeleteModalClose = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  useEffect(async () => {
    if (!repository) return;
    setRepositoryCollaborators(await getRepositoryCollaboratos(repository.pk));
    setRepositoryRoles(await getAllCollaboratorsRoles());
    setUserDataForSearch(await getUserDataForSearch());
  }, [repository]);

  const isUserAlreadyCollaborator = (user) => {
    return repositoryCollaborators.find(
      (collaborator) => collaborator.username == user.title
    );
  };

  return (
    <>
      <Card border="light" style={{ width: '100%' }}>
        <Card.Header>Collaborators</Card.Header>
        <Card.Body>
          <UserSearch
            placeholder="Add a collaborator..."
            data={userDataForSearch.filter(
              (user) => !isUserAlreadyCollaborator(user)
            )}
            onSelectItem={async (selectedValue) => {
              console.log(selectedValue);
              await createCollaboration(selectedValue.pk, repository.pk);
              setRepositoryCollaborators(
                await getRepositoryCollaboratos(repository.pk)
              );
            }}
          />

          <ListGroup variant="flush">
            {repositoryCollaborators.map((collaborator) => {
              return (
                <ListGroup.Item
                  key={collaborator.username}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ display: 'flex' }}>
                    <p> {collaborator.username} </p>
                    <p style={{ marginLeft: '5px', opacity: '0.5' }}>
                      ({collaborator.role})
                    </p>
                  </div>
                  {/* Disable changing and deleting author collaboration type */}
                  {repository.author != collaborator.collaborator_id && (
                    <div>
                      <MdEdit
                        style={{ marginRight: '15px', cursor: 'pointer' }}
                        onClick={() => {
                          setEditCollaborator(collaborator);
                          handleShowEditModal();
                        }}
                      />
                      {repositoryCollaborators.length > 1 && (
                        <AiFillDelete
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            setRemoveCandidate(collaborator);
                            handleShowDeleteModal();
                          }}
                        />
                      )}
                    </div>
                  )}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Card.Body>
      </Card>
      <br />

      {/* Edit role of the collaborator */}
      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change default branch </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: ' baseline',
          }}
        >
          <div
            style={{
              display: 'flex',
            }}
          >
            <p>
              Choose another role for the
              <b style={{ marginLeft: '5px' }}>{editCollaborator.username}</b>
            </p>
          </div>
          <Dropdown className="mt-1">
            <Dropdown.Toggle
              style={{ marginLeft: '5px' }}
              variant="secondary"
              id="dropdown-basic"
            >
              {bufferRole ? bufferRole.name : 'choose role'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {repositoryRoles.map((repositoryRole) => {
                return (
                  <Dropdown.Item
                    key={repositoryRole.pk}
                    onClick={() => {
                      setBufferRole(repositoryRole);
                    }}
                  >
                    {repositoryRole.name}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="success"
            onClick={async () => {
              handleEditModalClose();
              await updateCollaboratorRole(
                editCollaborator.collaboration_id,
                bufferRole.pk
              );
              setRepositoryCollaborators(
                await getRepositoryCollaboratos(repository.pk)
              );
            }}
          >
            Update
          </Button>
          <Button variant="danger" onClick={handleEditModalClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete collaborator */}
      <Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Remove confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: ' baseline',
          }}
        >
          <p>
            Are you sure you want to remove <b>{removeCandidate.username} </b>{' '}
            from repository ?
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              setRepositoryCollaborators(
                repositoryCollaborators.filter(
                  (collaborator) =>
                    collaborator.username != removeCandidate.username
                )
              );
              handleDeleteModalClose();
              deleteCollaborationById(removeCandidate.collaboration_id);
              console.log(removeCandidate);
            }}
          >
            Remove
          </Button>
          <Button variant="danger" onClick={handleDeleteModalClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ManageAccess;
