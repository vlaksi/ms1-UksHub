import { ListGroup, Badge, Button } from "react-bootstrap";
import { MdModeEditOutline, MdDelete } from "react-icons/md";

const LabelListItem = ({ label }) => {
  return (
    <ListGroup as="ol">
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">
            <Badge bg={label.color} pill>
              {label.name}
            </Badge>
          </div>
          {label.description}
        </div>
        <div style={{ display: "flex" }}>
          <Button
            variant="outline-success"
            style={{ marginRight: "15px" }}
            size="sm"
          >
            <MdModeEditOutline
              style={{ marginBottom: "4px" }}
            ></MdModeEditOutline>
            Edit label
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            style={{ marginRight: "15px" }}
          >
            <MdDelete style={{ marginBottom: "4px" }}></MdDelete>
            Delete label
          </Button>
        </div>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default LabelListItem;
