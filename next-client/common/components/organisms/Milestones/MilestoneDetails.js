import RepositoryNav from "../../atoms/RepositoryNav/RepositoryNav";
import { Badge, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getMilestoneById } from "../../../services/progresstrackapp/milestonesService";
import UserSearch from "../../atoms/UserSearch/UserSearch";
import { useRouter } from "next/router";
import { getIssueDataForMilestoneIssueSearch } from "../../../services/progresstrackapp/issuesService";

const MilestoneDetails = ({ milestoneId }) => {
  const [milestone, setMilestone] = useState("");
  const [issueDataForSearch, setIssueDataForSearch] = useState([]);
  const [milestonesIssue, setMilestonesIssue] = useState([]);

  const router = useRouter();
  const { repository } = router.query;

  useEffect(async () => {
    if (!milestoneId) return;
    let milestone = await getMilestoneById(milestoneId);
    setMilestone(milestone);
  }, [milestoneId]);

  useEffect(async () => {
    if (!repository) return;
    //setMilestonesIssue(await getAllIssueLabels(issueId));

    setIssueDataForSearch(
      await getIssueDataForMilestoneIssueSearch(repository)
    );
  }, [repository]);

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
          ></UserSearch>
        </Card.Body>
      </Card>
    </>
  );
};
export default MilestoneDetails;
