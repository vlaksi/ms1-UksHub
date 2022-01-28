import RepositoryNav from "../../atoms/RepositoryNav/RepositoryNav";
import {
  Badge,
  Card,
  ListGroup,
  Modal,
  Button,
  ProgressBar,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  getAllMilestoneIssues,
  getMilestoneById,
  updateMilestoneClose,
  updateMilestoneIssues,
} from "../../../services/progresstrackapp/milestonesService";
import { GiConfirmed } from "react-icons/gi";
import UserSearch from "../../atoms/UserSearch/UserSearch";
import { useRouter } from "next/router";
import { getIssueDataForMilestoneIssueSearch } from "../../../services/progresstrackapp/issuesService";
import { AiFillDelete } from "react-icons/ai";
import IssueListItem from "../../atoms/IssueListItem/IssueListItem";

const MilestoneDetails = ({ milestoneId }) => {
  const [milestone, setMilestone] = useState("");
  const [issueDataForSearch, setIssueDataForSearch] = useState([]);
  const [milestonesIssue, setMilestonesIssue] = useState([]);
  const [removeIssue, setRemoveIssue] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleDeleteModalClose = async () => {
    setShowDeleteModal(false);
    setShowPercentage(await getPercents());
  };
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  const [showPercentage, setShowPercentage] = useState("");

  const getPercents = async () => {
    let allIssuesById = await getAllMilestoneIssues(milestoneId);
    let allIssues = allIssuesById.length;

    console.log("Svi issues su:", allIssuesById);

    let onlyClosedIssues = allIssuesById.filter(
      (issue) => issue.is_opened === false
    );

    console.log("Svi closed issues:", onlyClosedIssues);
    let countClosedIssues = onlyClosedIssues.length;

    console.log("Broj zatvorenih issues je:", countClosedIssues);
    let percents = ((countClosedIssues / allIssues) * 100).toFixed(0);

    console.log("Procenti", percents);

    return percents;
  };

  useEffect(async () => {
    if (!milestone?.pk) return;
    setShowPercentage(await getPercents());
  }, [milestone?.pk]);

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
      <div style={{ width: "15%" }}>
        <ProgressBar
          now={showPercentage}
          label={`${showPercentage}%`}
        ></ProgressBar>
      </div>

      <div style={{ marginTop: "35px", width: "75%" }}>
        {milestonesIssue?.map((issueItem) => {
          return (
            <div key={issueItem.pk}>
              <IssueListItem issue={issueItem} />
            </div>
          );
        })}
      </div>
      <Card style={{ width: "20%", marginLeft: "85%", marginTop: "2px" }}>
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
              setShowPercentage(await getPercents());
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
              await updateMilestoneClose(true, milestoneId);
              setMilestone(await getMilestoneById(milestone.pk));
            }}
          >
            <GiConfirmed size={20}></GiConfirmed> Close milestone
          </Button>
        ) : (
          <p>
            <Button
              variant="outline-primary"
              onClick={async () => {
                await updateMilestoneClose(false, milestoneId);
                setMilestone(await getMilestoneById(milestone.pk));
              }}
            >
              <GiConfirmed size={20}></GiConfirmed> Reopen milestone
            </Button>
          </p>
        )}
      </div>
    </>
  );
};
export default MilestoneDetails;
