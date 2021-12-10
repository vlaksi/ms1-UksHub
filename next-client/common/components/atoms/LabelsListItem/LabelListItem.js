import { ListGroup, Badge, Button, Modal, Form } from "react-bootstrap";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { useState } from "react";

const LabelListItem = ({ label }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleDeleteModalClose = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
  };

  const [labelName, setLabelName] = useState("magarac");
  const handleChangingLabelName = (labelName) => {
    setLabelName(labelName);
  };

  const [labelDescription, setLabelDescription] = useState("konj");
  const handleChangingLabelDescription = (labelDescription) => {
    setLabelDescription(labelDescription);
  };

  return (
    <ListGroup as="ol">
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">
            <Badge bg={label.color} pill>
              {label.name}
            </Badge>
          </div>
          {label.description}
        </div>
        <div style={{ display: "flex" }}>
          <Button
            variant="outline-success"
            style={{ marginRight: "15px" }}
            size="sm"
            onClick={() => {
              handleShow();
            }}
          >
            <MdModeEditOutline
              style={{ marginBottom: "4px" }}
            ></MdModeEditOutline>
            Edit label
          </Button>

          <Modal show={show} onHide={handleClose} backdrop="static">
            <Modal.Header closeButton>
              <Modal.Title>Edit this label</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Name of label</Form.Label>
                  <Form.Control
                    type="name"
                    defaultValue={labelName}
                    onChange={(e) => {
                      handleChangingLabelName(e.target.value);
                    }}
                  ></Form.Control>
                  <Form.Label style={{ marginTop: "15px" }}>
                    Description of label
                  </Form.Label>
                  <Form.Control
                    type="name"
                    defaultValue={labelDescription}
                    as="textarea"
                    rows={2}
                    onChange={(e) => {
                      handleChangingLabelDescription(e.target.value);
                    }}
                  ></Form.Control>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success">Save Changes</Button>
              <Button variant="danger" onClick={handleClose}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
          <Button
            variant="outline-danger"
            size="sm"
            style={{ marginRight: "15px" }}
            onClick={handleShowDeleteModal}
          >
            <MdDelete style={{ marginBottom: "4px" }}></MdDelete>
            Delete label
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
              <p>Are you sure you want to delete this label ?</p>
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="success"
                onClick={async () => {
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
  );
};

export default LabelListItem;
