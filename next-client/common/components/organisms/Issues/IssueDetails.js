import { getIssueById } from "../../../services/progresstrackapp/issuesService";
import { useState, useEffect } from "react";
import { Badge } from "react-bootstrap";

const IssueDetails = ({ issueId }) => {
  const [issue, setIssue] = useState("");

  useEffect(async () => {
    if (!issueId) return;
    let issue = await getIssueById(issueId);
    setIssue(issue);
  }, [issueId]);
  return (
    <>
      <h3>
        <div style={{ display: "flex" }}>
          <Badge pill bg="primary" text="light" style={{ marginRight: "10px" }}>
            #{issue.pk}
          </Badge>{" "}
          {issue.title}
        </div>
      </h3>
    </>
  );
};
export default IssueDetails;
