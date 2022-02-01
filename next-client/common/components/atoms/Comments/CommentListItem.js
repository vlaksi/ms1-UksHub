import { Card, Badge, Modal, Button, Form } from 'react-bootstrap';
import { MdEdit } from 'react-icons/md';
import { AiFillDelete, AiFillLike } from 'react-icons/ai';
import { BsFillChatQuoteFill } from 'react-icons/bs';
import { FcLike } from 'react-icons/fc';

import {
  deleteComment,
  updateComment,
} from '../../../services/useractivity/commentsService';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getUserById } from '../../../services/useractivity/userService';
import {
  addReaction,
  getAllReactionsByCommentId,
} from '../../../services/useractivity/reactionsService';
import { getParsedToken } from '../../../services/authentication/token';

const CommentListItem = ({ comment }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleDeleteModalClose = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const [author, setAuthor] = useState();

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
  };

  const [commentMessage, setCommentMessage] = useState(comment.message);
  const handleChangingCommentMessage = (commentMessage) => {
    setCommentMessage(commentMessage);
  };
  const [reactions, setReactions] = useState([]);

  const [showNumberOfLikes, setShowNumberOfLikes] = useState([]);

  const notifyDeleted = () => toast.success('Successfully deleted comment!');

  const notifyUpdated = () =>
    toast.success('Successfully changed comment message!');
  const notifyError = () => toast.error('Check if you entered all fields!');

  const router = useRouter();
  const { user, repository } = router.query;

  const deleteChosenComment = async () => {
    let isSuccessfulDeleted = await deleteComment(comment.pk);
    if (isSuccessfulDeleted) {
      if (comment.issue != null) {
        window.location.href = `http://localhost:3000/${user}/${repository}/issues/${comment.issue}`;
      } else {
        window.location.href = `http://localhost:3000/${user}/${repository}/pulls/${comment.pull_request}`;
      }

      notifyDeleted();
    }
  };
  const updateNewComment = async () => {
    let isSuccessfulUpdated = await updateComment(commentMessage, comment.pk);
    if (isSuccessfulUpdated) {
      notifyUpdated();
      handleClose();
      if (comment.issue != null) {
        window.location.href = `http://localhost:3000/${user}/${repository}/issues/${comment.issue}`;
      } else {
        window.location.href = `http://localhost:3000/${user}/${repository}/pulls/${comment.pull_request}`;
      }
    } else {
      notifyError();
    }
  };

  useEffect(async () => {
    if (!comment?.pk) return;

    let newReactions = await getAllReactionsByCommentId(comment.pk);
    setReactions(newReactions);
    console.log('Sve reakcije su:', newReactions);

    let numberOfLikes = newReactions?.length;
    console.log('Svi brojevi lajkova su:', numberOfLikes);
    setShowNumberOfLikes(numberOfLikes);
  }, [comment?.pk]);

  useEffect(async () => {
    let authorComment = await getUserById(comment.author);
    setAuthor(authorComment);
  }, []);

  const getNumberOfLikes = async (reactions) => {
    let numberOfLikes = reactions?.length;
    return numberOfLikes;
  };

  const getLoggedInUserId = () => {
    return getParsedToken().user_id;
  };

  return (
    <>
      <div>
        <Card style={{ marginTop: '5%' }}>
          <Card.Header>
            Commented by{' '}
            <Badge bg="primary" text="light" pill>
              {author?.username}
            </Badge>{' '}
            on{' '}
            <Badge bg="primary" text="light" pill>
              {comment.creation_date.substring(0, 10)}
            </Badge>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              {comment.message} {showNumberOfLikes}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {/* Reactions */}
              <div style={{ marginLeft: '10px' }}>
                <AiFillLike
                  size={19}
                  onClick={async () => {
                    console.log('click on like');
                    let loggedInUser = getLoggedInUserId();
                    await addReaction(loggedInUser, 'like', comment.pk);
                  }}
                  style={{
                    color: 'blue',
                    cursor: 'pointer',
                    marginRight: '10px',
                  }}
                />
                <FcLike
                  size={20}
                  onClick={() => {
                    console.log('click on heart');
                  }}
                  style={{
                    cursor: 'pointer',
                    color: 'red',
                  }}
                />
              </div>

              {/* Actions */}
              <div>
                <MdEdit
                  size={20}
                  style={{
                    cursor: 'pointer',
                    color: 'green',
                  }}
                  onClick={() => {
                    handleShow();
                  }}
                />
                <AiFillDelete
                  size={18}
                  style={{
                    cursor: 'pointer',
                    color: 'red',
                    marginLeft: '10px',
                    marginRight: '10px',
                  }}
                  onClick={handleShowDeleteModal}
                />
                <BsFillChatQuoteFill size={15} style={{ cursor: 'pointer' }} />
              </div>
            </div>
          </Card.Footer>
        </Card>
        <Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Remove confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: ' baseline',
            }}
          >
            <p>Are you sure you want to remove chosen comment?</p>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="success"
              onClick={async () => {
                await deleteChosenComment();
                handleDeleteModalClose();
              }}
            >
              Remove
            </Button>
            <Button variant="danger" onClick={handleDeleteModalClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={show} onHide={handleClose} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Edit this comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Comment message</Form.Label>
                <Form.Control
                  type="name"
                  defaultValue={comment.message}
                  onChange={(e) => {
                    handleChangingCommentMessage(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              onClick={async () => {
                await updateNewComment();
              }}
            >
              Save Changes
            </Button>
            <Button variant="danger" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default CommentListItem;
