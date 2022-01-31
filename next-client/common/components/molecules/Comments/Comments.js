import CommentListItem from "../../atoms/Comments/CommentListItem";
import { Button, Modal, Form } from "react-bootstrap";
import { MdAddCircle } from "react-icons/md";
import { useState, useEffect } from "react";
import {
  addCommentIssue,
  getAllCommentsIssues,
} from "../../../services/useractivity/commentsService";
import { ToastContainer, toast } from "react-toastify";

const Comments = ({ issueId, authorId }) => {
  const [comments, setNewCommentList] = useState([]);
  const [newCommentMessage, setNewCommentMessage] = useState("");
  const handleAddingCommentMessage = (newCommentMessage) => {
    setNewCommentMessage(newCommentMessage);
  };
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setNewCommentMessage("");
  };
  const handleShow = () => setShow(true);
  const notify = () => toast.success("Successfully created new comment!");
  const notifyError = () => toast.error("Check if you entered all fields!");

  useEffect(async () => {
    if (!issueId) return;
    let comments = await getAllCommentsIssues(issueId);
    setNewCommentList(comments);
  }, [issueId]);
  const addNewComment = async () => {
    let createdComment = await addCommentIssue(
      newCommentMessage,
      authorId,
      issueId
    );
    console.log("U added comentu id issue je: ", issueId);
    if (createdComment) {
      notify();
      handleClose();
      console.log("Nakon kreiranja id issue je:", issueId);
      setNewCommentList(await getAllCommentsIssues(issueId));
    } else {
      notifyError();
    }
  };
  return (
    <>
      <Button
        style={{ marginTop: "10px", marginLeft: "75%", marginBottom: "2%" }}
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
          <Button variant="success" onClick={addNewComment}>
            Save Changes
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position="top-right" autoClose={3000}></ToastContainer>
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
