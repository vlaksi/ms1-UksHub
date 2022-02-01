import { ListGroup, Badge } from "react-bootstrap";

import { useState, useEffect } from "react";

import { useRouter } from "next/router";
import Link from "next/link";
import { getUserById } from "../../../services/useractivity/userService";

const SearchIssueListItem = ({ issue }) => {
  const router = useRouter();
  const { user, repository } = router.query;
  const [author, setAuthor] = useState();

  useEffect(async () => {
    let user = await getUserById(issue.author);
    setAuthor(user);
  }, []);

  return (
    <div>
      <ListGroup as="ol">
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div>
            <h4>
              <Link href={`/${issue.author}/${issue.repository}/issues/${issue.pk}`}>
                <a style={{ textDecoration: "none" }}>{issue.title}</a>
              </Link>
            </h4>
            Opened
            <Badge bg="light" text="dark" pill>
              {issue.creation_date.substring(0, 10)}
            </Badge>
            by{" "}
            <Badge pill bg="light" text="dark">
              {author?.username}
            </Badge>
            {issue.is_opened === true ? (
              <Badge pill bg="success" text="light">
                opened
              </Badge>
            ) : (
              <Badge pill bg="danger" text="light">
                closed
              </Badge>
            )}
          </div>

        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default SearchIssueListItem;
