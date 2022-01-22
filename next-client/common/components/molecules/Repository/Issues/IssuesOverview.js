import { Button, Modal, Form } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsFillTagsFill } from "react-icons/bs";
import { GoMilestone } from "react-icons/go";
import { MdAddCircle } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import { addIssue } from "../../../../services/progresstrackapp/issuesService";

const IssuesOverview = () => {
  const [newIssueName, setNewIssueName] = useState("");
  const handleAddingIssueName = (newIssueName) => {
    setNewIssueName(newIssueName);
  };

  const [issues, setNewIssueList] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setNewIssueName("");
  };

  const handleShow = () => setShow(true);
  const notify = () => toast.success("Successfully created new issue!");
  const notifyError = () => toast.error("Check if you entered all fields!");
  const router = useRouter();
  const { user, repository } = router.query;

  const addNewIssue = async () => {
    let createdIssue = await addIssue(newIssueName, user, repository);
    if (createdIssue) {
      notify();
      handleClose();
      //setNewIssueList(await getAllMilestones(repository));
    } else {
      notifyError();
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Button
        style={{ marginRight: "5px" }}
        variant="primary"
        variant="outline-primary"
      >
        <Link href={`/${user}/${repository}/labels`}>
          <a style={{ textDecoration: "none" }}>
            <BsFillTagsFill size={18} /> Labels
          </a>
        </Link>
      </Button>
      <Button
        style={{ marginRight: "5px", marginLeft: "5px" }}
        variant="primary"
        variant="outline-primary"
      >
        <Link href={`/${user}/${repository}/milestones`}>
          <a style={{ textDecoration: "none" }}>
            <GoMilestone size={18} /> Milestones
          </a>
        </Link>
      </Button>
      <Button
        style={{ marginLeft: "5px" }}
        variant="primary"
        onClick={() => {
          handleShow();
        }}
      >
        <MdAddCircle size={24} /> Add new issue
      </Button>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Add new issue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name of issue</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name of issue"
                onChange={(e) => {
                  handleAddingIssueName(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={addNewIssue}>
            Save Changes
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position="top-right" autoClose={3000}></ToastContainer>
      {issues?.map((issueItem) => {
        return (
          <div key={issueItem.pk}>
            {/* <IssueListItem issue={issueItem} /> */}
          </div>
        );
      })}
    </div>
  );
};

export default IssuesOverview;
