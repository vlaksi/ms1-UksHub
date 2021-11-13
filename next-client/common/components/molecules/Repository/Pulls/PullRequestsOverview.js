import { Button, Modal, Form } from "react-bootstrap";
import { BsFillTagsFill } from "react-icons/bs";
import { GoMilestone } from "react-icons/go";
import { MdAddCircle } from "react-icons/md";
import { useState } from "react";
import PullRequestList from "../../../atoms/PullRequestList/PullRequestList";

const cardsInfo = [
  {
    title: "First Title",
    text: "First Text",
  },
  {
    title: "second Title",
    text: "second Text",
  },
  {
    title: "third Title",
    text: "third Text",
  },
];

const PullRequestsOverview = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const [newPullRequestName, setNewPullRequestName] = useState("");
  const handlePullRequestNameAdding = (newName) => {
    setNewPullRequestName(newName);
  };

  const [newCompareBranch, setNewCompareBranch] = useState("");
  const handleCompareBranchAdding = (newCompareBranch) => {
    setNewCompareBranch(newCompareBranch);
  };

  const [newBaseBranch, setNewBaseBranch] = useState("");
  const handleBaseBranchAdding = (newBaseBranch) => {
    setNewBaseBranch(newBaseBranch);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          style={{ marginRight: "5px" }}
          variant="primary"
          variant="outline-primary"
        >
          <BsFillTagsFill size={18} /> Labels
        </Button>
        <Button
          style={{ marginRight: "5px", marginLeft: "5px" }}
          variant="primary"
          variant="outline-primary"
        >
          <GoMilestone size={18} /> Milestones
        </Button>
        <Button
          style={{ marginLeft: "5px" }}
          variant="primary"
          onClick={handleShow}
        >
          <MdAddCircle size={24} /> Add pull request
        </Button>

        <Modal show={show} onHide={handleClose} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Add new pull request</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name of pull request</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name of pull request"
                  onChange={(e) => {
                    handlePullRequestNameAdding(e.target.value);
                  }}
                ></Form.Control>

                <Form.Label className="mt-3">Compare branch</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => {
                    handleCompareBranchAdding(e.target.value);
                  }}
                >
                  <option>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>

                <Form.Label className="mt-3">Base branch</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => {
                    handleBaseBranchAdding(e.target.value);
                  }}
                >
                  <option>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
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
      </div>
      <PullRequestList pullRequests={cardsInfo} />
      {/* TODO: Pass a real pull requests here */}
    </>
  );
};

export default PullRequestsOverview;
