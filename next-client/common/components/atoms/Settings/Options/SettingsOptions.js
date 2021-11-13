import { useState } from "react";
import {
  Card,
  FormControl,
  InputGroup,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const SettingsOptions = ({
  repositoryId,
  repositoryName,
  repositoryDescription,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newRepositoryName, setNewRepositoryName] = useState("");
  const [newRepositoryDescription, setNewRepositoryDescription] = useState("");

  const notifyName = () => toast.success("Successfully changed name!");
  const notifyDescription = () =>
    toast.success("Successfully changed description!");
  const notifyDeleted = () => toast.success("Successfully deleted repository!");

  const notifyError = () => toast.error("Check if you entered all fields!");

  const handleRepositoryNameChanging = (newName) => {
    setNewRepositoryName(newName);
  };

  const handleRepositoryDescriptionChanging = (newDescription) => {
    setNewRepositoryDescription(newDescription);
  };

  // TODO: move these axios calls to functions in service layer
  const updateRepositoryDescription = () => {
    axios
      .request({
        url: `/versioning/repositorys/${repositoryId}`,
        method: "patch",
        baseURL: "http://127.0.0.1:8000/",
        auth: {
          username: "anci", // This is the client_id
          password: "root", // This is the client_secret
        },
        data: {
          description: newRepositoryDescription,
          grant_type: "client_credentials",
          scope: "public",
        },
      })
      .then((response) => {
        console.log(response);
        console.log(repositoryName);
        notifyDescription();
      })
      .catch((error) => {
        console.log(error.response.data.error);
        notifyError();
      });
  };
  const updateRepositoryName = () => {
    axios
      .request({
        url: `/versioning/repositorys/${repositoryId}`,
        method: "patch",
        baseURL: "http://127.0.0.1:8000/",
        auth: {
          username: "anci", // This is the client_id
          password: "root", // This is the client_secret
        },
        data: {
          name: newRepositoryName,
          grant_type: "client_credentials",
          scope: "public",
        },
      })
      .then((response) => {
        console.log(response);
        notifyName();
      })
      .catch((error) => {
        console.log(error.response.data.error);
        notifyError();
      });
  };

  const deleteRepository = () => {
    axios
      .request({
        url: `/versioning/repositorys/${repositoryId}`,
        method: "delete",
        baseURL: "http://127.0.0.1:8000/",
        auth: {
          username: "anci", // This is the client_id
          password: "root", // This is the client_secret
        },
        data: {
          grant_type: "client_credentials",
          scope: "public",
        },
      })
      .then((response) => {
        console.log(response);
        notifyDeleted();
      });
  };

  const handleDeleteModalClose = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);
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
                updateRepositoryName();
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
                updateRepositoryDescription();
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
            onClick={() => {
              handleDeleteModalClose();
              deleteRepository();
            }}
          >
            Delete
          </Button>
          <Button variant="danger" onClick={handleDeleteModalClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SettingsOptions;
