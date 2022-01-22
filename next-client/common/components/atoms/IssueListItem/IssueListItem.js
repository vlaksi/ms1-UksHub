import { ListGroup, Button, Modal, Form, Badge } from "react-bootstrap";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { getUserById } from "../../../services/useractivity/userService";

const IssueListItem = ({ issue }) => {
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
            <h3>{issue.title}</h3>
            Opened
            <Badge bg="light" text="dark" pill>
              {issue.creation_date.substring(0, 10)}
            </Badge>
            by{" "}
            <Badge pill bg="light" text="dark">
              {author?.username}
            </Badge>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default IssueListItem;
