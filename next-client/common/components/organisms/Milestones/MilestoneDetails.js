import RepositoryNav from "../../atoms/RepositoryNav/RepositoryNav";
import { Badge, Card, ListGroup, Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  getAllMilestoneIssues,
  getMilestoneById,
  updateMilestoneIssues,
} from "../../../services/progresstrackapp/milestonesService";
import { GiConfirmed } from "react-icons/gi";
import UserSearch from "../../atoms/UserSearch/UserSearch";
import { useRouter } from "next/router";
import { getIssueDataForMilestoneIssueSearch } from "../../../services/progresstrackapp/issuesService";
import { AiFillDelete } from "react-icons/ai";

const MilestoneDetails = ({ milestoneId }) => {
  const [milestone, setMilestone] = useState("");
  const [issueDataForSearch, setIssueDataForSearch] = useState([]);
  const [milestonesIssue, setMilestonesIssue] = useState([]);
  const [removeIssue, setRemoveIssue] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleDeleteModalClose = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  const router = useRouter();
  const { repository } = router.query;

  useEffect(async () => {
    if (!milestoneId) return;
    let milestone = await getMilestoneById(milestoneId);
    setMilestone(milestone);
  }, [milestoneId]);

  useEffect(async () => {
    if (!repository) return;
    setMilestonesIssue(await getAllMilestoneIssues(milestoneId));

    setIssueDataForSearch(
      await getIssueDataForMilestoneIssueSearch(repository)
    );
  }, [repository]);

  const getAllIssuesIds = () => {
    let currentMilestoneIssuesIds = [];
    milestonesIssue.forEach((issue) => {
      currentMilestoneIssuesIds.push(issue.pk);
    });
    return currentMilestoneIssuesIds;
  };
  const isAlreadyAddedIssue = (issue) => {
    return milestonesIssue.find(
      (addedIssue) => addedIssue.title == issue.title
    );
  };

  return (
    <>
      <RepositoryNav></RepositoryNav>
      <h4>
        <div style={{ display: "flex" }}>
          <Badge pill bg="primary" text="light" style={{ marginRight: "10px" }}>
            #{milestone.pk}
          </Badge>{" "}
          {milestone.title}
        </div>
      </h4>
      <Card style={{ width: "25%", marginLeft: "75%", marginTop: "25px" }}>
        <Card.Header>Issues</Card.Header>
        <Card.Body>
          <UserSearch
            placeholder="Add an issue..."
            data={issueDataForSearch.filter(
              (issue) => !isAlreadyAddedIssue(issue)
            )}
            onSelectItem={async (selectedValue) => {
              let currentIssuesIds = getAllIssuesIds();
              await updateMilestoneIssues(milestoneId, [
                ...currentIssuesIds,
                selectedValue.pk,
              ]);
              setMilestonesIssue(await getAllMilestoneIssues(milestoneId));
            }}
          ></UserSearch>
        </Card.Body>
        <ListGroup variant="flush">
          {milestonesIssue?.map((milestoneIssue) => {
            return (
              <ListGroup.Item
                key={milestoneIssue.pk}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex" }}>
                  <p> {milestoneIssue.title} </p>
                </div>
                <div>
                  {milestonesIssue.length > 0 && (
                    <AiFillDelete
                      style={{ cursor: "pointer", marginBottom: "15px" }}
                      onClick={() => {
                        setRemoveIssue(milestoneIssue);
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
          <p>Are you sure you want to remove chosen issue from milestone?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="success"
            onClick={async () => {
              let currentIssuesIds = getAllIssuesIds();
              let newIssuesIds = currentIssuesIds.filter(
                (issueId) => issueId != removeIssue.pk
              );
              await updateMilestoneIssues(milestoneId, newIssuesIds);
              setMilestonesIssue(await getAllMilestoneIssues(milestoneId));

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
      <div>
        {milestone.is_opened === true ? (
          <Button
            onClick={async () => {
              //await updateIssueClose(true, issueId);
              setMilestone(await getMilestoneById(milestone.pk));
            }}
          >
            <GiConfirmed size={20}></GiConfirmed> Close issue
          </Button>
        ) : (
          <p>
            <Button
              variant="outline-primary"
              onClick={async () => {
                //await updateIssueClose(false, issueId);
                setMilestone(await getMilestoneById(milestone.pk));
              }}
            >
              <GiConfirmed size={20}></GiConfirmed> Reopen issue
            </Button>
          </p>
        )}
      </div>
    </>
  );
};
export default MilestoneDetails;
