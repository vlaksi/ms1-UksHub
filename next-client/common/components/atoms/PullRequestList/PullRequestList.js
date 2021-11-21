import { Card, Button, Badge } from "react-bootstrap";
import { MdArrowForwardIos } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/router";

const PullRequestList = ({ pullRequests }) => {
  const router = useRouter();
  const { user, repository } = router.query;

  const renderCards = (pullRequest) => {
    return (
      <div key={pullRequest.pk}>
        <Card border="primary" style={{ width: "40rem", marginTop: "15px" }}>
          <Card.Body>
            <Card.Title>
              <Badge pill bg="primary" text="light">
                #{pullRequest.pk}
              </Badge>{" "}
              {pullRequest.title}
            </Card.Title>
            <Card.Text>
              Opened
              <Badge pill bg="light" text="dark">
                {pullRequest.creation_date}
              </Badge>
              by{" "}
              <Badge pill bg="light" text="dark">
                {user}
              </Badge>
            </Card.Text>
            <Button variant="primary" style={{ marginLeft: "25rem" }}>
              <Link href={`/${user}/${repository}/pulls/${pullRequest.pk}`}>
                <a style={{ textDecoration: "none", color: "white" }}>
                  Show details <MdArrowForwardIos />{" "}
                </a>
              </Link>
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  };

  return <>{pullRequests.map(renderCards)}</>;
};

export default PullRequestList;
