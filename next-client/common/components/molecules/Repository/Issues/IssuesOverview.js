import { Button } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsFillTagsFill } from "react-icons/bs";
import { GoMilestone } from "react-icons/go";
import { MdAddCircle } from "react-icons/md";

const IssuesOverview = () => {
  const router = useRouter();
  const { user, repository } = router.query;
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Button
        style={{ marginRight: "5px" }}
        variant="primary"
        variant="outline-primary"
      >
        <Link href={`/${user}/${repository}/labels`}>
          <a style={{ textDecoration: "none" }}>
            <BsFillTagsFill size={18} /> Labels
          </a>
        </Link>
      </Button>
      <Button
        style={{ marginRight: "5px", marginLeft: "5px" }}
        variant="primary"
        variant="outline-primary"
      >
        <Link href={`/${user}/${repository}/milestones`}>
          <a style={{ textDecoration: "none" }}>
            <GoMilestone size={18} /> Milestones
          </a>
        </Link>
      </Button>
      <Button style={{ marginLeft: "5px" }} variant="primary">
        <MdAddCircle size={24} /> Add new issue
      </Button>
    </div>
  );
};

export default IssuesOverview;
