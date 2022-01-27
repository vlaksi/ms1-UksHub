import RepositoryNav from "../../atoms/RepositoryNav/RepositoryNav";
import { Badge } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getMilestoneById } from "../../../services/progresstrackapp/milestonesService";

const MilestoneDetails = ({ milestoneId }) => {
  const [milestone, setMilestone] = useState("");

  useEffect(async () => {
    if (!milestoneId) return;
    let milestone = await getMilestoneById(milestoneId);
    setMilestone(milestone);
  }, [milestoneId]);
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
    </>
  );
};
export default MilestoneDetails;
