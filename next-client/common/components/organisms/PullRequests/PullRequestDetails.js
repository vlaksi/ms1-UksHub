import { Card, Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { deletePullRequest } from "../../../services/progresstrackapp/pullRequestService";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";

const PullRequestDetails = ({ pullRequestId }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleDeleteModalClose = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  const router = useRouter();
  const { user } = router.query;

  const notifyDeleted = () =>
    toast.success("Successfully deleted pull request!");

  const deleteChosenPullRequest = async () => {
    let isSuccessfulDeleted = await deletePullRequest(pullRequestId);
    if (isSuccessfulDeleted) {
      notifyDeleted();
    }
  };
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000}></ToastContainer>
      <h1>Add style for this page</h1>
      <p> PullRequestIndex: {pullRequestId}</p>
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
              // TODO: change this link
              window.location.href = `http://localhost:3000/${user}`;
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
