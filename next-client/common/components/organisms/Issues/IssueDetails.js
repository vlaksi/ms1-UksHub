import {
  getAllIssueAssignees,
  getAllIssueLabels,
  getIssueById,
  updateIssueAssigness,
  updateIssueClose,
  updateIssueLabels,
} from "../../../services/progresstrackapp/issuesService";
import { useState, useEffect } from "react";
import { Badge, Card, ListGroup, Modal, Button } from "react-bootstrap";
import UserSearch from "../../atoms/UserSearch/UserSearch";
import { getUserDataForIssueAssigneesSearch } from "../../../services/useractivity/userService";
import { useRouter } from "next/router";
import { AiFillDelete } from "react-icons/ai";
import { GiConfirmed } from "react-icons/gi";
import { getLabelDataForIssueLabellingSearch } from "../../../services/progresstrackapp/labelsService";
import RepositoryNav from "../../atoms/RepositoryNav/RepositoryNav";
import Comments from "../../molecules/Comments/Comments";

const IssueDetails = ({ issueId }) => {
  const [issue, setIssue] = useState("");

  const [userDataForSearch, setUserDataForSearch] = useState([]);
  const [labelDataForSearch, setLabelDataForSearch] = useState([]);

  const [issueAssignees, setIssueAssignees] = useState([]);
  const [removeCandidate, setRemoveCandidate] = useState("");
  const [issueAddedLabels, setIssueAddedLabels] = useState([]);
  const [removeLabel, setRemoveLabel] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleDeleteModalClose = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  const [showDeleteLabelModal, setShowDeleteLabelModal] = useState(false);
  const handleDeleteLabelModalClose = () => setShowDeleteLabelModal(false);
  const handleShowDeleteLabelModal = () => setShowDeleteLabelModal(true);

  const router = useRouter();
  const { user, repository } = router.query;

  useEffect(async () => {
    if (!repository) return;
    setIssueAssignees(await getAllIssueAssignees(issueId));

    setUserDataForSearch(await getUserDataForIssueAssigneesSearch(repository));
  }, [repository]);

  const isUserAlreadyAssignee = (user) => {
    return issueAssignees.find((assignee) => assignee.username == user.title);
  };

  useEffect(async () => {
    if (!repository) return;
    setIssueAddedLabels(await getAllIssueLabels(issueId));

    setLabelDataForSearch(
      await getLabelDataForIssueLabellingSearch(repository)
    );
  }, [repository]);

  const isLabelAlreadyAdded = (label) => {
    return issueAddedLabels.find(
      (addedLabel) => addedLabel.name == label.title
    );
  };

  // Take all elements from the currentAssignesIds array (ie. take all ids, and add id of the selected user)
  const getAllAssignesIds = () => {
    let currentAssignesIds = [];
    issueAssignees.forEach((assigne) => {
      currentAssignesIds.push(assigne.id);
    });
    return currentAssignesIds;
  };

  const getAllIssueLabelsIds = () => {
    // Be careful with structure, unique id of the label is named pk, but unique id of the usser ie. assigne is id !
    let currentIssueLabelsIds = [];
    issueAddedLabels.forEach((label) => {
      currentIssueLabelsIds.push(label.pk);
    });
    return currentIssueLabelsIds;
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
          <RepositoryNav />
          <h4>
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
          </h4>
          <div>
            {" "}
            <Comments issueId={issueId} authorId={user}></Comments>
          </div>

          <div>
            {/* Assignes Card */}
            <Card style={{ width: "25%", marginLeft: "75%" }}>
              <Card.Header>Assignees</Card.Header>
              <Card.Body>
                <UserSearch
                  placeholder="Add an assignee..."
                  data={userDataForSearch.filter(
                    (user) => !isUserAlreadyAssignee(user)
                  )}
                  onSelectItem={async (selectedValue) => {
                    let currentAssignesIds = getAllAssignesIds();
                    await updateIssueAssigness(issueId, [
                      ...currentAssignesIds,
                      selectedValue.pk,
                    ]);
                    setIssueAssignees(await getAllIssueAssignees(issueId));
                  }}
                ></UserSearch>
              </Card.Body>
              <ListGroup variant="flush">
                {issueAssignees?.map((issueAssignee) => {
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

            {/* Delete assignes modal from the issue */}
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
                  onClick={async () => {
                    let currentAssignesIds = getAllAssignesIds();
                    let newAssignesIds = currentAssignesIds.filter(
                      (assigneId) => assigneId != removeCandidate.id
                    );
                    await updateIssueAssigness(issueId, newAssignesIds);
                    setIssueAssignees(await getAllIssueAssignees(issueId));

                    handleDeleteModalClose();
                  }}
                >
                  Remove
                </Button>
                <Button variant="danger" onClick={handleDeleteModalClose}>
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Labels Card */}
            <Card
              style={{ width: "25%", marginLeft: "75%", marginTop: "25px" }}
            >
              <Card.Header>Labels</Card.Header>
              <Card.Body>
                <UserSearch
                  placeholder="Add a label..."
                  data={labelDataForSearch.filter(
                    (label) => !isLabelAlreadyAdded(label)
                  )}
                  onSelectItem={async (selectedValue) => {
                    let currentIssueLabelsIds = getAllIssueLabelsIds();
                    await updateIssueLabels(issueId, [
                      ...currentIssueLabelsIds,
                      selectedValue.pk,
                    ]);
                    setIssueAddedLabels(await getAllIssueLabels(issueId));
                  }}
                ></UserSearch>
              </Card.Body>
              <ListGroup variant="flush">
                {issueAddedLabels?.map((issueAddedLabel) => {
                  return (
                    <ListGroup.Item
                      key={issueAddedLabel.pk}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ display: "flex" }}>
                        <>
                          {" "}
                          <div
                            className="fw-bold"
                            style={{
                              background: issueAddedLabel.color,
                              borderRadius: "15px",
                              padding: "4px",
                              color: "white",
                              display: "flex",
                            }}
                          >
                            {issueAddedLabel.name}
                          </div>
                        </>
                      </div>
                      <div>
                        {issueAddedLabels.length > 0 && (
                          <AiFillDelete
                            style={{ cursor: "pointer", marginBottom: "15px" }}
                            onClick={() => {
                              setRemoveLabel(issueAddedLabel);
                              handleShowDeleteLabelModal();
                            }}
                          />
                        )}
                      </div>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Card>

            {/* Delete label modal from the issue */}
            <Modal
              show={showDeleteLabelModal}
              onHide={handleDeleteLabelModalClose}
            >
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
                <p>Are you sure you want to remove chosen label from issue?</p>
              </Modal.Body>

              <Modal.Footer>
                <Button
                  variant="success"
                  onClick={async () => {
                    let currentIssueLabelsIds = getAllIssueLabelsIds();
                    let newIssueLabelsIds = currentIssueLabelsIds.filter(
                      (labelId) => labelId != removeLabel.pk
                    );

                    await updateIssueLabels(issueId, newIssueLabelsIds);
                    setIssueAddedLabels(await getAllIssueLabels(issueId));

                    handleDeleteLabelModalClose();
                  }}
                >
                  Remove
                </Button>
                <Button variant="danger" onClick={handleDeleteLabelModalClose}>
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <div>
            {issue.is_opened === true ? (
              <Button
                onClick={async () => {
                  await updateIssueClose(true, issueId);
                  setIssue(await getIssueById(issue.pk));
                }}
              >
                <GiConfirmed size={20}></GiConfirmed> Close issue
              </Button>
            ) : (
              <p>
                <Button
                  variant="outline-primary"
                  onClick={async () => {
                    await updateIssueClose(false, issueId);
                    setIssue(await getIssueById(issue.pk));
                  }}
                >
                  <GiConfirmed size={20}></GiConfirmed> Reopen issue
                </Button>
              </p>
            )}
          </div>
        </>
      )}
    </>
  );
};
export default IssueDetails;
