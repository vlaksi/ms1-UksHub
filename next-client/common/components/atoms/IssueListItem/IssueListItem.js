import { ListGroup, Button, Modal, Form, Badge } from "react-bootstrap";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { getUserById } from "../../../services/useractivity/userService";

const IssueListItem = ({ issue }) => {
  const router = useRouter();
  const { user, repository } = router.query;

  const [author, setAuthor] = useState();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleDeleteModalClose = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
  };
  const [issueName, setIssueName] = useState(issue.title);
  const handleChangingIssueName = (issueName) => {
    setIssueName(issueName);
  };

  useEffect(async () => {
    let user = await getUserById(issue.author);
    setAuthor(user);
  }, []);

  return (
    <div>
      <ListGroup as="ol">
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div>
            <h3>{issue.title}</h3>
            Opened
            <Badge bg="light" text="dark" pill>
              {issue.creation_date.substring(0, 10)}
            </Badge>
            by{" "}
            <Badge pill bg="light" text="dark">
              {author?.username}
            </Badge>
          </div>
          <div style={{ display: "flex" }}>
            <Button
              variant="outline-success"
              style={{ marginRight: "15px" }}
              onClick={() => {
                handleShow();
              }}
            >
              <MdModeEditOutline
                style={{ marginBottom: "4px" }}
              ></MdModeEditOutline>
              Edit issue
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="static">
              <Modal.Header closeButton>
                <Modal.Title>Edit this issue</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Name of issue</Form.Label>
                    <Form.Control
                      type="name"
                      defaultValue={issue.title}
                      onChange={(e) => {
                        handleChangingIssueName(e.target.value);
                      }}
                    ></Form.Control>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="success"
                  onClick={async () => {
                    //await updateNewMilestone();
                  }}
                >
                  Save Changes
                </Button>
                <Button variant="danger" onClick={handleClose}>
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>
            <Button
              variant="outline-danger"
              style={{ marginRight: "15px" }}
              onClick={handleShowDeleteModal}
            >
              <MdDelete style={{ marginBottom: "4px" }}></MdDelete>
              Delete issue
            </Button>
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
                <p>Are you sure you want to delete this issue ?</p>
              </Modal.Body>

              <Modal.Footer>
                <Button
                  variant="success"
                  onClick={async () => {
                    //await deleteChosenMilestone();
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
          </div>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default IssueListItem;
