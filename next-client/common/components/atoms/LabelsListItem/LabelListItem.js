import { ListGroup, Button, Modal, Form } from "react-bootstrap";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { useState } from "react";
import {
  deleteLabel,
  updateLabel,
} from "../../../services/progresstrackapp/labelsService";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";

const LabelListItem = ({ label }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleDeleteModalClose = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
  };

  const [labelName, setLabelName] = useState(label.name);
  const handleChangingLabelName = (labelName) => {
    setLabelName(labelName);
  };

  const [labelDescription, setLabelDescription] = useState(label.decription);
  const handleChangingLabelDescription = (labelDescription) => {
    setLabelDescription(labelDescription);
  };

  const [labelColor, setLabelColor] = useState(label.color);
  const handleChangingLabelColor = (labelColor) => {
    setLabelColor(labelColor);
  };

  const notifyDeleted = () => toast.success("Successfully deleted label!");
  const notifyUpdated = () => toast.success("Successfully updated label!");
  const notifyError = () => toast.error("Check if you entered all fields!");

  const router = useRouter();
  const { user, repository } = router.query;

  const deleteChosenLabel = async () => {
    let isSuccessfulDeleted = await deleteLabel(label.pk);
    if (isSuccessfulDeleted) {
      window.location.href = `http://localhost:3000/${user}/${repository}/labels`;
      notifyDeleted();
    }
  };
  const updateNewLabel = async () => {
    let isSuccessfulUpdated = await updateLabel(
      labelName,
      labelDescription,
      labelColor,
      label.pk
    );
    if (isSuccessfulUpdated) {
      notifyUpdated();
    } else {
      notifyError();
    }
  };
  return (
    <ListGroup as="ol">
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2">
          <div
            className="fw-bold"
            style={{
              background: label.color,
              borderRadius: "15px",
              padding: "2px",
              color: "white",
              display: "flex",
            }}
          >
            {label.name}
          </div>
          {label.decription}
        </div>
        <br></br>

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
                    defaultValue={label.name}
                    onChange={(e) => {
                      handleChangingLabelName(e.target.value);
                    }}
                  ></Form.Control>
                  <Form.Label style={{ marginTop: "15px" }}>
                    Description of label
                  </Form.Label>
                  <Form.Control
                    type="name"
                    defaultValue={label.decription}
                    as="textarea"
                    rows={2}
                    onChange={(e) => {
                      handleChangingLabelDescription(e.target.value);
                    }}
                  ></Form.Control>
                  <Form.Label
                    style={{ marginTop: "15px" }}
                    htmlFor="exampleColorInput"
                  >
                    Colour of label
                  </Form.Label>
                  <Form.Control
                    type="color"
                    id="exampleColorInput"
                    defaultValue={label.color}
                    title="Choose your color"
                    onChange={(e) => {
                      handleChangingLabelColor(e.target.value);
                    }}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="success"
                onClick={async () => {
                  await updateNewLabel();
                  //set(await getPullRequestById(pullRequestId));
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
                  await deleteChosenLabel();
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
      <ToastContainer position="top-right" autoClose={3000}></ToastContainer>
    </ListGroup>
  );
};

export default LabelListItem;
