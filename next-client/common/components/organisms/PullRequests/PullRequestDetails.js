import {
  Card,
  Button,
  Modal,
  Badge,
  InputGroup,
  FormControl,
  ListGroup,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  deletePullRequest,
  getAllPullRequestAssignees,
  getPullRequestById,
  updatePullRequestAssigness,
  updatePullRequestName,
} from "../../../services/progresstrackapp/pullRequestService";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import CommentPR from "../../molecules/Comments/CommentPR";
import RepositoryNav from "../../atoms/RepositoryNav/RepositoryNav";
import { getUserDataForPullRequestAssigneesSearch } from "../../../services/useractivity/userService";
import UserSearch from "../../atoms/UserSearch/UserSearch";
import { AiFillDelete } from "react-icons/ai";

const PullRequestDetails = ({ pullRequestId }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pullRequest, setPullRequest] = useState("");
  const [newPullRequestName, setNewPullRequestName] = useState("");
  const handleDeleteModalClose = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  const [userDataForSearch, setUserDataForSearch] = useState([]);
  const [labelDataForSearch, setLabelDataForSearch] = useState([]);

  const [pullRequestAssignees, setPullRequestAssignees] = useState([]);

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

  useEffect(async () => {
    if (!repository) return;
    setPullRequestAssignees(await getAllPullRequestAssignees(pullRequestId));

    setUserDataForSearch(
      await getUserDataForPullRequestAssigneesSearch(repository)
    );
  }, [repository]);

  const isUserAlreadyAssignee = (user) => {
    return pullRequestAssignees?.find(
      (assignee) => assignee.username == user.title
    );
  };
  const getAllAssignesIds = () => {
    let currentAssignesIds = [];
    pullRequestAssignees.forEach((assigne) => {
      currentAssignesIds.push(assigne.id);
    });
    return currentAssignesIds;
  };

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
      <RepositoryNav />
      <ToastContainer position="top-right" autoClose={3000}></ToastContainer>
      <h4>
        <div style={{ display: "flex" }}>
          <Badge pill bg="primary" text="light" style={{ marginRight: "10px" }}>
            #{pullRequest.pk}
          </Badge>{" "}
          {pullRequest.title}
        </div>
      </h4>
      <div>
        <InputGroup className="mb-3" style={{ width: "40%", marginTop: "2%" }}>
          <FormControl
            size="sm"
            defaultValue={pullRequest.title}
            aria-label="Pull request title"
            aria-describedby="basic-addon2"
            onChange={(e) => {
              handlePullRequestNameChanging(e.target.value);
            }}
          />
          <Button
            size="sm"
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
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "65%" }}>
          <CommentPR
            pullRequestId={pullRequest.pk}
            authorId={pullRequest.author}
          ></CommentPR>
        </div>
        <div>
          {/* Assignes Card */}
          <Card>
            <Card.Header>Assignees</Card.Header>
            <Card.Body>
              <UserSearch
                placeholder="Add an assignee..."
                data={userDataForSearch.filter(
                  (user) => !isUserAlreadyAssignee(user)
                )}
                onSelectItem={async (selectedValue) => {
                  let currentAssignesIds = getAllAssignesIds();
                  await updatePullRequestAssigness(pullRequestId, [
                    ...currentAssignesIds,
                    selectedValue.pk,
                  ]);
                  setPullRequestAssignees(
                    await getAllPullRequestAssignees(pullRequestId)
                  );
                }}
              ></UserSearch>
            </Card.Body>
            <ListGroup variant="flush">
              {pullRequestAssignees?.map((prAssignee) => {
                return (
                  <ListGroup.Item
                    key={prAssignee.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <p> {prAssignee.username} </p>
                    </div>
                    <div>
                      {pullRequestAssignees?.length > 0 && (
                        <AiFillDelete
                          style={{
                            cursor: "pointer",
                            marginBottom: "15px",
                          }}
                          onClick={() => {
                            // setRemoveCandidate(prAssignee);
                            // handleShowDeleteModal();
                          }}
                        />
                      )}
                    </div>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Card>
        </div>
      </div>

      <Card border="danger" style={{ width: "50%", marginTop: "30%" }}>
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
