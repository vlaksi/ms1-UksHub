import { Card, Button } from "react-bootstrap";
import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

const Comments = () => {
  return (
    <>
      <div>
        <Card style={{ width: "60%", marginTop: "5%" }}>
          <Card.Body>
            <Card.Title>
              Comment{" "}
              <MdEdit
                size={20}
                style={{
                  marginRight: "15px",
                  cursor: "pointer",
                  color: "green",
                  marginLeft: "70%",
                }}
              />
              <AiFillDelete
                size={18}
                style={{ cursor: "pointer", color: "red" }}
              />
            </Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Comments;
