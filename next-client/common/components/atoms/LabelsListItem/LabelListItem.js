import { ListGroup, Badge, Button, Modal } from "react-bootstrap";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { useState } from "react";

const LabelListItem = ({ label }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleDeleteModalClose = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

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
          >
            <MdModeEditOutline
              style={{ marginBottom: "4px" }}
            ></MdModeEditOutline>
            Edit label
          </Button>

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
