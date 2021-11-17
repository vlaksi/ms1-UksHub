import { useState } from "react";
import {
  Card,
  FormControl,
  InputGroup,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import {
  deleteRepository,
  updateRepositoryDescription,
  updateRepositoryName,
} from "../../../../services/versioning/repositoryService";
import { useRouter } from "next/router";
import Router from "next/router";

const SettingsOptions = ({
  repositoryId,
  repositoryName,
  repositoryDescription,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newRepositoryName, setNewRepositoryName] = useState("");
  const [newRepositoryDescription, setNewRepositoryDescription] = useState("");

  const handleRepositoryNameChanging = (newName) => {
    setNewRepositoryName(newName);
  };

  const handleRepositoryDescriptionChanging = (newDescription) => {
    setNewRepositoryDescription(newDescription);
  };

  const notifyName = () => toast.success("Successfully changed name!");
  const notifyDescription = () =>
    toast.success("Successfully changed description!");
  const notifyDeleted = () => toast.success("Successfully deleted repository!");
  const notifyError = () => toast.error("Check if you entered all fields!");

  const updateNewRepositoryName = async () => {
    let isSuccessfulUpdated = await updateRepositoryName(
      newRepositoryName,
      repositoryId
    );
    if (isSuccessfulUpdated) {
      notifyName();
    } else {
      notifyError();
    }
  };
  const updateNewRepositoryDescription = async () => {
    let isSuccessfulUpdated = await updateRepositoryDescription(
      newRepositoryDescription,
      repositoryId
    );
    if (isSuccessfulUpdated) notifyDescription();
  };
  const deleteChosenRepository = async () => {
    let isSuccessfulDeleted = await deleteRepository(repositoryId);
    if (isSuccessfulDeleted) {
      notifyDeleted();
    }
  };

  const handleDeleteModalClose = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  const router = useRouter();
  const { user } = router.query;

  return (
    <>
      <Card border="light" style={{ width: "100%" }}>
        <Card.Header>Settings</Card.Header>
        <Card.Body>
          <Card.Title>Repository details</Card.Title>
          <Form.Label className="mt-3">Name</Form.Label>
          <InputGroup className="mb-3">
            <FormControl
              defaultValue={repositoryName}
              aria-label="Repository name"
              aria-describedby="basic-addon2"
              onChange={(e) => {
                handleRepositoryNameChanging(e.target.value);
              }}
            />
            <Button
              variant="success"
              id="button-addon2"
              onClick={() => {
                updateNewRepositoryName();
              }}
            >
              Change
            </Button>
          </InputGroup>

          <Form.Label>Description</Form.Label>
          <InputGroup className="mb-3">
            <FormControl
              defaultValue={repositoryDescription}
              aria-label="Repository description"
              onChange={(e) => {
                handleRepositoryDescriptionChanging(e.target.value);
              }}
            />
            <Button
              variant="success"
              id="button-addon2"
              onClick={() => {
                updateNewRepositoryDescription();
              }}
            >
              Change
            </Button>
          </InputGroup>
        </Card.Body>
      </Card>
      <br />

      <Card border="danger" style={{ width: "100%" }}>
        <Card.Header>Danger Zone</Card.Header>
        <Card.Body
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Card.Title>Delete this repository</Card.Title>
          <Button variant="danger" onClick={handleShowDeleteModal}>
            Delete
          </Button>
        </Card.Body>
      </Card>

      <ToastContainer position="top-right" autoClose={3000}></ToastContainer>

      {/* Delete repository */}
      <Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: " baseline",
          }}
        >
          <p>Are you sure you want to delete this repository ?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="success"
            onClick={async () => {
              await deleteChosenRepository();
              handleDeleteModalClose();
              // TODO: change this link
              window.location.href = `http://localhost:3000/${user}`;
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

export default SettingsOptions;
