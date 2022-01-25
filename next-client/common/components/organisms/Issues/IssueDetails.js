import {
  getAllIssueAssignees,
  getIssueById,
  updateIssueAssigness,
} from "../../../services/progresstrackapp/issuesService";
import { useState, useEffect } from "react";
import { Badge, Card, ListGroup, Modal, Button } from "react-bootstrap";
import UserSearch from "../../atoms/UserSearch/UserSearch";
import { getUserDataForIssueAssigneesSearch } from "../../../services/useractivity/userService";
import { useRouter } from "next/router";
import { AiFillDelete } from "react-icons/ai";

const IssueDetails = ({ issueId }) => {
  const [issue, setIssue] = useState("");
  const [userDataForSearch, setUserDataForSearch] = useState([]);
  const [issueAssignees, setIssueAssignees] = useState([]);
  const [removeCandidate, setRemoveCandidate] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteModalClose = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  const router = useRouter();
  const { repository } = router.query;

  useEffect(async () => {
    if (!repository) return;
    setIssueAssignees(await getAllIssueAssignees(issueId));

    setUserDataForSearch(await getUserDataForIssueAssigneesSearch(repository));
  }, [repository]);

  const isUserAlreadyAssignee = (user) => {
    return issueAssignees.find((assignee) => assignee.username == user.title);
  };

  useEffect(async () => {
    if (!issueId) return;
    let issue = await getIssueById(issueId);
    setIssue(issue);
  }, [issueId]);
  return (
    <>
      {issue && (
        <>
          <h3>
            <div style={{ display: "flex" }}>
              <Badge
                pill
                bg="primary"
                text="light"
                style={{ marginRight: "10px" }}
              >
                #{issue.pk}
              </Badge>{" "}
              {issue.title}
            </div>
          </h3>
          <div>
            <Card style={{ width: "25%", marginLeft: "75%" }}>
              <Card.Header>Assignees</Card.Header>
              <Card.Body>
                <UserSearch
                  placeholder="Add an assignee..."
                  data={userDataForSearch.filter(
                    (user) => !isUserAlreadyAssignee(user)
                  )}
                  onSelectItem={async (selectedValue) => {
                    await updateIssueAssigness(issueId, [selectedValue.pk]);
                    setIssueAssignees(await getAllIssueAssignees(issueId));
                  }}
                ></UserSearch>
              </Card.Body>
              <ListGroup variant="flush">
                {issueAssignees.map((issueAssignee) => {
                  return (
                    <ListGroup.Item
                      key={issueAssignee.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ display: "flex" }}>
                        <p> {issueAssignee.username} </p>
                      </div>
                      <div>
                        {issueAssignees.length > 0 && (
                          <AiFillDelete
                            style={{ cursor: "pointer", marginBottom: "15px" }}
                            onClick={() => {
                              setRemoveCandidate(issueAssignee);
                              handleShowDeleteModal();
                            }}
                          />
                        )}
                      </div>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Card>
            <Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
              <Modal.Header closeButton>
                <Modal.Title>Remove confirmation</Modal.Title>
              </Modal.Header>
              <Modal.Body
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: " baseline",
                }}
              >
                <p>
                  Are you sure you want to remove chosen user from assignees?
                </p>
              </Modal.Body>

              <Modal.Footer>
                <Button
                  variant="success"
                  onClick={() => {
                    setIssueAssignees(
                      issueAssignees.filter(
                        (issueAssignee) =>
                          issueAssignee.username != removeCandidate.username
                      )
                    );
                    handleDeleteModalClose();
                    //deleteCollaborationById(removeCandidate.collaboration_id);
                  }}
                >
                  Remove
                </Button>
                <Button variant="danger" onClick={handleDeleteModalClose}>
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>
            <Card
              border="light"
              style={{ width: "25%", marginLeft: "75%", marginTop: "25px" }}
            >
              <Card.Header>Labels</Card.Header>
              <Card.Body>
                <UserSearch placeholder="Add a label..."></UserSearch>
              </Card.Body>
            </Card>
            <Card
              border="light"
              style={{ width: "25%", marginLeft: "75%", marginTop: "25px" }}
            >
              <Card.Header>Milestones</Card.Header>
              <Card.Body>
                <UserSearch placeholder="Add a milestone..."></UserSearch>
              </Card.Body>
            </Card>
          </div>
        </>
      )}
    </>
  );
};
export default IssueDetails;
