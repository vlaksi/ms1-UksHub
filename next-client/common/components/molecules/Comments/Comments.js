import CommentListItem from "../../atoms/Comments/CommentListItem";
import { Button, Modal, Form } from "react-bootstrap";
import { MdAddCircle } from "react-icons/md";
import { useState, useEffect } from "react";

const Comments = () => {
  const [newCommentMessage, setNewCommentMessage] = useState("");
  const handleAddingCommentMessage = (newCommentMessage) => {
    setNewCommentMessage(newCommentMessage);
  };
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  let comments = [
    {
      message:
        "Prvi komentar: Potreno je resiti sve zadatke poput filtriranja, sortiranja. AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA ",
      user: "anciz",
      creation_date: "2022-02-06",
      pk: 1,
    },
    {
      message: "Drugi komentar",
      user: "vlado",
      creation_date: "2022-02-06",
      pk: 2,
    },
  ];
  return (
    <>
      <Button
        style={{ marginTop: "10px", marginLeft: "75%" }}
        variant="primary"
        onClick={() => {
          handleShow();
        }}
      >
        <MdAddCircle size={18} /> Add comment
      </Button>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Add new comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Message of comment</Form.Label>
              <Form.Control
                type="name"
                as="textarea"
                rows={5}
                placeholder="Enter comment message"
                onChange={(e) => {
                  handleAddingCommentMessage(e.target.value);
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
      {comments?.map((commentItem) => {
        return (
          <div key={commentItem.pk}>
            <CommentListItem comment={commentItem}></CommentListItem>
          </div>
        );
      })}
    </>
  );
};

export default Comments;
