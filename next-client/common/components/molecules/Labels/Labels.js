import LabelListItem from "../../atoms/LabelsListItem/LabelListItem";
import { Button, Modal, Form } from "react-bootstrap";
import { MdAddCircle } from "react-icons/md";
import { useState } from "react";

const Labels = () => {
  const labels = [
    {
      pk: 1,
      name: "frontend",
      description: "very nice",
      color: "primary",
    },
    {
      pk: 2,
      name: "backend",
      description: "important label",
      color: "danger",
    },
    {
      pk: 3,
      name: "devops",
      description: "must do",
      color: "success",
    },
  ];
  const [newLabelName, setNewLabelName] = useState("");
  const handleAddingLabelName = (newLabelName) => {
    setNewLabelName(newLabelName);
  };
  const [newDescriptionName, setNewDescriptionName] = useState("");
  const handleAddingDescriptionName = (newDescriptionName) => {
    setNewDescriptionName(newDescriptionName);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setNewLabelName("");
    //TODO: add for other fields
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        style={{ marginBottom: "10px" }}
        variant="primary"
        size="sm"
        onClick={() => {
          handleShow();
        }}
      >
        <MdAddCircle size={18} /> Add label
      </Button>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Add new label</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name of label</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name of label"
                onChange={(e) => {
                  handleAddingLabelName(e.target.value);
                }}
              ></Form.Control>
              <Form.Label style={{ marginTop: "15px" }}>
                Description of label
              </Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter description of label"
                as="textarea"
                rows={2}
                onChange={(e) => {
                  handleAddingDescriptionName(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success">Save Changes</Button>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {labels.map((labelItem) => {
        return (
          <div key={labelItem.pk}>
            <LabelListItem label={labelItem} />
          </div>
        );
      })}
    </>
  );
};

export default Labels;
