import {
  addMilestone,
  getAllMilestones,
} from "../../../services/progresstrackapp/milestonesService";
import MilestoneListItem from "../../atoms/MilestoneListItem/MilestoneListItem";
import { Button, Modal, Form } from "react-bootstrap";
import { MdAddCircle } from "react-icons/md";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import RepositoryNav from "./../../atoms/RepositoryNav/RepositoryNav";
import { getParsedToken } from "../../../services/authentication/token";
import { getRepositoryCollaboratos } from "../../../services/versioning/repositoryService";

const Milestones = () => {
  const [newMilestoneName, setNewMilestoneName] = useState("");
  const handleAddingMilestoneName = (newMilestoneName) => {
    setNewMilestoneName(newMilestoneName);
  };
  const [newDescriptionName, setNewDescriptionName] = useState("");
  const handleAddingDescriptionName = (newDescriptionName) => {
    setNewDescriptionName(newDescriptionName);
  };
  const [newDate, setNewDate] = useState("");
  const handleAddingDate = (newDate) => {
    setNewDate(newDate);
  };

  const [milestones, setNewMilestoneList] = useState([]);
  const [repositoryCollaborators, setRepositoryCollaborators] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setNewMilestoneName("");
    setNewDescriptionName("");
    setNewDate("");
  };
  const handleShow = () => setShow(true);
  const notify = () => toast.success("Successfully created new milestone!");
  const notifyError = () => toast.error("Check if you entered all fields!");

  const router = useRouter();
  const { repository } = router.query;

  useEffect(async () => {
    if (!repository) return;
    let milestones = await getAllMilestones(repository);
    setNewMilestoneList(milestones);
    setRepositoryCollaborators(await getRepositoryCollaboratos(repository));
  }, [repository]);

  const isLoggedInUserCollaborator = () => {
    let loggedInUserId = getParsedToken().user_id;
    return repositoryCollaborators.find(
      (collaborator) => collaborator.collaborator_id == loggedInUserId
    );
  };

  const addNewMilestone = async () => {
    let createdMilestone = await addMilestone(
      newMilestoneName,
      newDescriptionName,
      newDate,
      repository
    );
    if (createdMilestone) {
      notify();
      handleClose();
      setNewMilestoneList(await getAllMilestones(repository));
    } else {
      notifyError();
    }
  };

  return (
    <>
      <RepositoryNav />
      {isLoggedInUserCollaborator() && (
        <Button
          style={{ marginBottom: "10px" }}
          variant="primary"
          onClick={() => {
            handleShow();
          }}
        >
          <MdAddCircle size={18} /> Add milestone
        </Button>
      )}
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Add new milestone</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name of milestone</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name of milestone"
                onChange={(e) => {
                  handleAddingMilestoneName(e.target.value);
                }}
              ></Form.Control>
              <Form.Label style={{ marginTop: "15px" }}>
                Description of milestone
              </Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter description of milestone"
                as="textarea"
                rows={2}
                onChange={(e) => {
                  handleAddingDescriptionName(e.target.value);
                }}
              ></Form.Control>
              <Form.Label style={{ marginTop: "15px" }}>
                Due date of milestone
              </Form.Label>

              <Form.Control
                type="date"
                title="Choose due date"
                onChange={(e) => {
                  handleAddingDate(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={addNewMilestone}>
            Save Changes
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position="top-right" autoClose={3000}></ToastContainer>
      {milestones?.map((milestoneItem) => {
        return (
          <div key={milestoneItem.pk}>
            <MilestoneListItem milestone={milestoneItem} />
          </div>
        );
      })}
    </>
  );
};

export default Milestones;
