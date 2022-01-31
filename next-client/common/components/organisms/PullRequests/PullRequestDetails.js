import {
  Card,
  Button,
  Modal,
  Badge,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  deletePullRequest,
  getPullRequestById,
  updatePullRequestName,
} from "../../../services/progresstrackapp/pullRequestService";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import CommentPR from "../../molecules/Comments/CommentPR";

const PullRequestDetails = ({ pullRequestId }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pullRequest, setPullRequest] = useState("");
  const [newPullRequestName, setNewPullRequestName] = useState("");
  const handleDeleteModalClose = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  const router = useRouter();
  const { user, repository } = router.query;

  const notifyDeleted = () =>
    toast.success("Successfully deleted pull request!");

  const notifyName = () => {
    toast.success("Successfully changed title!");
  };

  const notifyError = () => {
    toast.error("Check if you entered all fields!");
  };
  const handlePullRequestNameChanging = (newName) => {
    setNewPullRequestName(newName);
  };
  const deleteChosenPullRequest = async () => {
    let isSuccessfulDeleted = await deletePullRequest(pullRequestId);
    if (isSuccessfulDeleted) {
      window.location.href = `http://localhost:3000/${user}/${repository}`;
      notifyDeleted();
    }
  };
  useEffect(async () => {
    if (!pullRequestId) return;
    let pullRequest = await getPullRequestById(pullRequestId);
    setPullRequest(pullRequest);
  }, [pullRequestId]);

  const updateNewPullRequestName = async () => {
    let isSuccessfulUpdated = await updatePullRequestName(
      newPullRequestName,
      pullRequestId
    );
    if (isSuccessfulUpdated) {
      notifyName();
    } else {
      notifyError();
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000}></ToastContainer>
      <h2>
        <div style={{ display: "flex" }}>
          <Badge pill bg="primary" text="light" style={{ marginRight: "10px" }}>
            #{pullRequest.pk}
          </Badge>{" "}
          {pullRequest.title}
        </div>
      </h2>

      <InputGroup className="mb-3">
        <FormControl
          defaultValue={pullRequest.title}
          aria-label="Pull request title"
          aria-describedby="basic-addon2"
          onChange={(e) => {
            handlePullRequestNameChanging(e.target.value);
          }}
        />
        <Button
          variant="success"
          id="button-addon2"
          onClick={async () => {
            await updateNewPullRequestName();
            setPullRequest(await getPullRequestById(pullRequestId));
          }}
        >
          Change
        </Button>
      </InputGroup>
      <div>
        <CommentPR
          pullRequestId={pullRequest.pk}
          authorId={pullRequest.author}
        ></CommentPR>
      </div>

      <Card border="danger" style={{ width: "50%" }}>
        <Card.Header>Danger Zone</Card.Header>
        <Card.Body
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Card.Title>Delete this pull request</Card.Title>
          <Button variant="danger" onClick={handleShowDeleteModal}>
            Delete
          </Button>
        </Card.Body>
      </Card>

      {/* Delete pull request */}
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
          <p>Are you sure you want to delete this pull request ?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="success"
            onClick={async () => {
              await deleteChosenPullRequest();
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
    </>
  );
};

export default PullRequestDetails;
