import CommentListItem from '../../atoms/Comments/CommentListItem';
import { Button, Modal, Form } from 'react-bootstrap';
import { MdAddCircle } from 'react-icons/md';
import { useState, useEffect } from 'react';
import {
  addCommentIssue,
  getAllCommentsIssues,
} from '../../../services/useractivity/commentsService';
import { ToastContainer, toast } from 'react-toastify';
import { getParsedToken } from '../../../services/authentication/token';

const Comments = ({ issueId, authorId }) => {
  const [comments, setNewCommentList] = useState([]);
  const [newCommentMessage, setNewCommentMessage] = useState('');
  const handleAddingCommentMessage = (newCommentMessage) => {
    setNewCommentMessage(newCommentMessage);
  };
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setNewCommentMessage('');
  };
  const handleShow = () => setShow(true);
  const notify = () => toast.success('Successfully created new comment!');
  const notifyError = () => toast.error('Check if you entered all fields!');

  useEffect(async () => {
    if (!issueId) return;
    let comments = await getAllCommentsIssues(issueId);
    setNewCommentList(comments);
  }, [issueId]);
  const addNewComment = async () => {
    let createdComment = await addCommentIssue(
      newCommentMessage,
      getLoggedInUserId(),
      issueId
    );

    if (createdComment) {
      notify();
      handleClose();
      setNewCommentList(await getAllCommentsIssues(issueId));
    } else {
      notifyError();
    }
  };

  const getLoggedInUserId = () => {
    return getParsedToken().user_id;
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          style={{ marginTop: '5px', marginBottom: '2%' }}
          variant="primary"
          onClick={() => {
            handleShow();
          }}
        >
          <MdAddCircle size={18} /> Add comment
        </Button>
      </div>

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
                defaultValue={newCommentMessage}
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
            <CommentListItem
              comment={commentItem}
              handleShowAddComment={handleShow}
              setNewCommentMessage={setNewCommentMessage}
            ></CommentListItem>
          </div>
        );
      })}
    </>
  );
};

export default Comments;
