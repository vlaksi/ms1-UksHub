import { ListGroup, Badge } from "react-bootstrap";

const LabelListItem = ({ label }) => {
  return (
    <ListGroup as="ol">
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">
            <Badge variant="primary" pill>
              {label.name}
            </Badge>
          </div>
          {label.description}
        </div>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default LabelListItem;
