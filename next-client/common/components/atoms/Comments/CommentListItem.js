import { Card, Badge } from "react-bootstrap";
import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

const CommentListItem = ({ comment }) => {
  return (
    <>
      <div>
        <Card style={{ width: "60%", marginTop: "5%" }}>
          <Card.Header>
            Commented by on{" "}
            <Badge bg="primary" text="light" pill>
              {comment.creation_date}
            </Badge>
          </Card.Header>
          <Card.Body>
            <Card.Text>{comment.message}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <MdEdit
              size={20}
              style={{
                marginRight: "15px",
                cursor: "pointer",
                color: "green",
                marginLeft: "90%",
              }}
            />
            <AiFillDelete
              size={18}
              style={{ cursor: "pointer", color: "red" }}
            />
          </Card.Footer>
        </Card>
      </div>
    </>
  );
};

export default CommentListItem;
