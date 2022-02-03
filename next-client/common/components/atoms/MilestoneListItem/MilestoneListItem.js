import { ListGroup, Button, Modal, Form, Badge } from "react-bootstrap";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import {
  deleteMilestone,
  updateMilestone,
} from "../../../services/progresstrackapp/milestonesService";
import Link from "next/link";
import { getRepositoryCollaboratos } from "../../../services/versioning/repositoryService";
import { getParsedToken } from "../../../services/authentication/token";

const MilestoneListItem = ({ milestone }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleDeleteModalClose = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
  };
  const [repositoryCollaborators, setRepositoryCollaborators] = useState([]);

  const [milestoneName, setMilestoneName] = useState(milestone.title);
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

  useEffect(async () => {
    if (!repository) return;
    setRepositoryCollaborators(await getRepositoryCollaboratos(repository));
  }, [repository]);

  const deleteChosenMilestone = async () => {
    let isSuccessfulDeleted = await deleteMilestone(milestone.pk);
    if (isSuccessfulDeleted) {
      window.location.href = `http://localhost:3000/${user}/${repository}/milestones`;
      notifyDeleted();
    }
  };

  const updateNewMilestone = async () => {
    let isSuccessfulUpdated = await updateMilestone(
      milestoneName,
      milestoneDescription,
      milestoneDate,
      milestone.pk
    );
    if (isSuccessfulUpdated) {
      notifyUpdated();
      handleClose();
      window.location.href = `http://localhost:3000/${user}/${repository}/milestones`;
    } else {
      notifyError();
    }
  };
  const isLoggedInUserCollaborator = () => {
    let loggedInUserId = getParsedToken().user_id;
    return repositoryCollaborators.find(
      (collaborator) => collaborator.collaborator_id == loggedInUserId
    );
  };
  return (
    <ListGroup as="ol">
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div>
          <h3>
            {" "}
            <Link href={`/${user}/${repository}/milestones/${milestone.pk}`}>
              <a style={{ textDecoration: "none" }}>{milestone.title}</a>
            </Link>
          </h3>
          <p>
            Due by{" "}
            <Badge bg="light" text="dark" pill>
              {milestone.due_date.substring(0, 10)}
            </Badge>
            {milestone.is_opened === true ? (
              <Badge pill bg="success" text="light">
                opened
              </Badge>
            ) : (
              <Badge pill bg="danger" text="light">
                closed
              </Badge>
            )}
          </p>
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
          {isLoggedInUserCollaborator() && (
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
          )}

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
                    onChange={(e) => {
                      handleChangingMilestoneName(e.target.value);
                    }}
                  ></Form.Control>
                  <Form.Label style={{ marginTop: "15px" }}>
                    Description of milestone
                  </Form.Label>
                  <Form.Control
                    type="name"
                    defaultValue={milestone.description}
                    as="textarea"
                    rows={2}
                    onChange={(e) => {
                      handleChangingMilestoneDescription(e.target.value);
                    }}
                  ></Form.Control>
                  <Form.Label style={{ marginTop: "15px" }}>
                    Due date of milestone
                  </Form.Label>
                  <Form.Control
                    type="date"
                    defaultValue={milestone.due_date}
                    title="Choose date"
                    onChange={(e) => {
                      handleChangingMilestoneDate(e.target.value);
                    }}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="success"
                onClick={async () => {
                  await updateNewMilestone();
                }}
              >
                Save Changes
              </Button>
              <Button variant="danger" onClick={handleClose}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
          {isLoggedInUserCollaborator() && (
            <Button
              variant="outline-danger"
              style={{ marginRight: "15px" }}
              onClick={handleShowDeleteModal}
            >
              <MdDelete style={{ marginBottom: "4px" }}></MdDelete>
              Delete milestone
            </Button>
          )}
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
                onClick={async () => {
                  await deleteChosenMilestone();
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

export default MilestoneListItem;
