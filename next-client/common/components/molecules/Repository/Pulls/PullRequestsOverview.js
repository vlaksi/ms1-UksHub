import { Button, Modal, Form } from "react-bootstrap";
import { BsFillTagsFill } from "react-icons/bs";
import { GoMilestone } from "react-icons/go";
import { MdAddCircle } from "react-icons/md";
import { useEffect, useState } from "react";
import PullRequestList from "../../../atoms/PullRequestList/PullRequestList";
import Link from "next/link";
import { useRouter } from "next/router";
import { getRepositoryBranches } from "../../../../services/versioning/branchService";
import {
  addPullRequest,
  getPullRequestsByRepository,
} from "../../../../services/progresstrackapp/pullRequestService";
import { ToastContainer, toast } from "react-toastify";

const PullRequestsOverview = ({ dbRepository }) => {
  const router = useRouter();
  const { user, repository } = router.query;

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setNewPullRequestName("");
    //TODO: add for other fields
  };
  const handleShow = () => setShow(true);

  const notify = () => toast.success("Successfully created new pull request!");
  const notifyError = () => toast.error("Check if you entered all fields!");

  const [newPullRequest, setNewPullRequest] = useState([]);

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
    console.log(newBaseBranch);
  };

  const [allBranches, setAllBranches] = useState([]);

  const getRepositoryAllBranches = async () => {
    let branches = await getRepositoryBranches(dbRepository.pk);
    setAllBranches(branches);
  };
  const addNewPullRequest = async () => {
    let createdPullRequest = await addPullRequest(
      newPullRequestName,
      //newBaseBranch.pk,
      //newCompareBranch.pk,
      dbRepository.pk
    );

    if (createdPullRequest) {
      notify();
      handleClose();
    } else {
      notifyError();
    }
  };

  useEffect(async () => {
    if (!dbRepository.pk) return;
    setNewPullRequest(await getPullRequestsByRepository(dbRepository.pk));
  }, [dbRepository.pk]);

  console.log(getPullRequestsByRepository(dbRepository.pk));

  return (
    <>
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
            getRepositoryAllBranches();
          }}
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
                  {allBranches?.map((branch) => {
                    return <option>{branch.name}</option>;
                  })}
                </Form.Select>

                <Form.Label className="mt-3">Base branch</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => {
                    handleBaseBranchAdding(e.target.value);
                  }}
                >
                  {allBranches?.map((branch) => {
                    return <option>{branch.name}</option>;
                  })}
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={addNewPullRequest}>
              Save Changes
            </Button>
            <Button variant="danger" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <ToastContainer position="top-right" autoClose={3000}></ToastContainer>
      <PullRequestList pullRequests={newPullRequest} />
      {/* TODO: Pass a real pull requests here */}
    </>
  );
};

export default PullRequestsOverview;
