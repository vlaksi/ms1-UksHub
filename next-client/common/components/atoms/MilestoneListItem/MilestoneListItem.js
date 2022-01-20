import { ListGroup, Button, Modal, Form, Badge } from "react-bootstrap";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";

const MilestoneListItem = ({ milestone }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleDeleteModalClose = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
  };

  const [milestoneName, setMilestoneName] = useState(milestone.name);
  const handleChangingMilestoneName = (milestoneName) => {
    setMilestoneName(milestoneName);
  };

  const [milestoneDescription, setMilestoneDescription] = useState(
    milestone.description
  );
  const handleChangingMilestoneDescription = (milestoneDescription) => {
    setMilestoneDescription(milestoneDescription);
  };

  const [milestoneDate, setMilestoneDate] = useState(milestone.due_date);
  const handleChangingMilestoneDate = (milestoneDate) => {
    setMilestoneDate(milestoneDate);
  };

  const notifyDeleted = () => toast.success("Successfully deleted milestone!");
  const notifyUpdated = () => toast.success("Successfully updated milestone!");
  const notifyError = () => toast.error("Check if you entered all fields!");

  const router = useRouter();
  const { user, repository } = router.query;

  //   const deleteChosenLabel = async () => {
  //     let isSuccessfulDeleted = await deleteLabel(label.pk);
  //     if (isSuccessfulDeleted) {
  //       window.location.href = `http://localhost:3000/${user}/${repository}/labels`;
  //       notifyDeleted();
  //     }
  //   };
  //   const updateNewLabel = async () => {
  //     let isSuccessfulUpdated = await updateLabel(
  //       labelName,
  //       labelDescription,
  //       labelColor,
  //       label.pk
  //     );
  //     if (isSuccessfulUpdated) {
  //       notifyUpdated();
  //       handleClose();
  //       window.location.href = `http://localhost:3000/${user}/${repository}/labels`;
  //     } else {
  //       notifyError();
  //     }
  //   };
  return (
    <ListGroup as="ol">
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div>
          <h3>{milestone.title}</h3>
          <Badge bg="primary">{milestone.due_date}</Badge>
        </div>

        <div
          style={{
            padding: "2px",
            display: "flex",
            marginLeft: "15px",
          }}
        >
          {milestone.description}
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
            Edit milestone
          </Button>

          <Modal show={show} onHide={handleClose} backdrop="static">
            <Modal.Header closeButton>
              <Modal.Title>Edit this milestone</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Name of milestone</Form.Label>
                  <Form.Control
                    type="name"
                    defaultValue={milestone.title}
                    // onChange={(e) => {
                    //   handleChangingLabelName(e.target.value);
                    // }}
                  ></Form.Control>
                  <Form.Label style={{ marginTop: "15px" }}>
                    Description of milestone
                  </Form.Label>
                  <Form.Control
                    type="name"
                    defaultValue={milestone.description}
                    as="textarea"
                    rows={2}
                    // onChange={(e) => {
                    //   handleChangingLabelDescription(e.target.value);
                    // }}
                  ></Form.Control>
                  <Form.Label style={{ marginTop: "15px" }}>
                    Due date of milestone
                  </Form.Label>
                  <Form.Control
                    type="date"
                    defaultValue={milestone.due_date}
                    title="Choose date"
                    // onChange={(e) => {
                    //   handleChangingLabelColor(e.target.value);
                    // }}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="success"
                // onClick={async () => {
                //   await updateNewLabel();
                // }}
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
              <p>Are you sure you want to delete this milestone ?</p>
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="success"
                // onClick={async () => {
                //   await deleteChosenLabel();
                //   handleDeleteModalClose();
                // }}
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

export default MilestoneListItem;
