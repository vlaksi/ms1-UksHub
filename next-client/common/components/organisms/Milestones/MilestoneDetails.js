import RepositoryNav from "../../atoms/RepositoryNav/RepositoryNav";
import { Badge } from "react-bootstrap";

const MilestoneDetails = ({ milestoneId }) => {
  return (
    <>
      <RepositoryNav></RepositoryNav>
      <h4>
        <div style={{ display: "flex" }}>
          <Badge pill bg="primary" text="light" style={{ marginRight: "10px" }}>
            {/* #{milestone.pk} */}
          </Badge>{" "}
          {/* {issue.title} */}
        </div>
      </h4>
    </>
  );
};
export default MilestoneDetails;
