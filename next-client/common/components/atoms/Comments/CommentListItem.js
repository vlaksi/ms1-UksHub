import { Card, Badge, Modal, Button, Form } from "react-bootstrap";
import { MdEdit } from "react-icons/md";
import { AiFillDelete, AiFillLike } from "react-icons/ai";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { RiHeart3Fill } from "react-icons/ri";

import {
  deleteComment,
  updateComment,
} from "../../../services/useractivity/commentsService";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getUserById } from "../../../services/useractivity/userService";
import {
  addReaction,
  deleteReactionByCommentAndUserId,
  getAllReactionsByCommentId,
} from "../../../services/useractivity/reactionsService";
import { getParsedToken } from "../../../services/authentication/token";

const CommentListItem = ({
  comment,
  handleShowAddComment,
  setNewCommentMessage,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleDeleteModalClose = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const [author, setAuthor] = useState();

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
  };

  const [isCommentLikedByMe, setIsCommentLikedByMe] = useState(true);
  const [isCommentHeartByMe, setIsCommentHeartByMe] = useState(true);

  const [commentMessage, setCommentMessage] = useState(comment.message);
  const handleChangingCommentMessage = (commentMessage) => {
    setCommentMessage(commentMessage);
  };
  const [reactions, setReactions] = useState([]);

  const [showNumberOfLikes, setShowNumberOfLikes] = useState([]);
  const [showNumberOfHearts, setShowNumberOfHearts] = useState([]);

  const notifyDeleted = () => toast.success("Successfully deleted comment!");

  const notifyUpdated = () =>
    toast.success("Successfully changed comment message!");
  const notifyError = () => toast.error("Check if you entered all fields!");

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
    let newReactions = await setNumberOfLikes();
    let newReactionsHeart = await setNumberOfHearts();
    checkIsCommentLikedByMe(newReactions);
    checkIsCommentHeartByMe(newReactionsHeart);
  }, [comment?.pk]);

  const setNumberOfLikes = async () => {
    let newReactions = await getAllReactionsByCommentId(comment.pk);
    if (!newReactions) {
      setShowNumberOfLikes(0);
      return;
    }

    setReactions(newReactions);
    newReactions = newReactions.filter((reaction) => reaction.type == "like");

    let numberOfLikes = newReactions?.length;
    setShowNumberOfLikes(numberOfLikes);
    return newReactions;
  };
  const setNumberOfHearts = async () => {
    let newReactions = await getAllReactionsByCommentId(comment.pk);
    if (!newReactions) {
      setShowNumberOfHearts(0);
      return;
    }

    setReactions(newReactions);
    newReactions = newReactions.filter((reaction) => reaction.type == "heart");

    let numberOfHearts = newReactions?.length;
    setShowNumberOfHearts(numberOfHearts);
    return newReactions;
  };

  const checkIsCommentLikedByMe = (reactions) => {
    let foundReaction = reactions?.find(
      (reaction) => reaction.author == getLoggedInUserId()
    );
    if (foundReaction) {
      setIsCommentLikedByMe(true);
    } else {
      setIsCommentLikedByMe(false);
    }
  };
  const checkIsCommentHeartByMe = (reactions) => {
    let foundReaction = reactions?.find(
      (reaction) => reaction.author == getLoggedInUserId()
    );
    if (foundReaction) {
      setIsCommentHeartByMe(true);
    } else {
      setIsCommentHeartByMe(false);
    }
  };

  useEffect(async () => {
    let authorComment = await getUserById(comment.author);
    setAuthor(authorComment);
  }, []);

  const getLoggedInUserId = () => {
    return getParsedToken().user_id;
  };

  const isItMyComment = () => {
    return getLoggedInUserId() == comment.author;
  };

  return (
    <>
      <div>
        <Card style={{ marginTop: "5%" }}>
          <Card.Header>
            Commented by{" "}
            <Badge bg="primary" text="light" pill>
              {author?.username}
            </Badge>{" "}
            on{" "}
            <Badge bg="primary" text="light" pill>
              {comment.creation_date.substring(0, 10)}
            </Badge>
          </Card.Header>
          <Card.Body>
            <Card.Text>{comment.message}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {/* Reactions */}
              <div style={{ marginLeft: "10px", display: "flex" }}>
                {/* Like */}
                <div
                  style={{
                    display: "flex ",
                    marginRight: "10px",
                    alignItems: "center",
                  }}
                >
                  {isCommentLikedByMe ? (
                    // Dislike
                    <AiFillLike
                      size={18}
                      onClick={async () => {
                        let loggedInUser = getLoggedInUserId();
                        await deleteReactionByCommentAndUserId(
                          comment.pk,
                          loggedInUser,
                          "like"
                        );
                        setNumberOfLikes();
                        setIsCommentLikedByMe(false);
                      }}
                      style={{
                        color: "blue",
                        cursor: "pointer",
                        marginRight: "5px",
                      }}
                    />
                  ) : (
                    // Like
                    <AiFillLike
                      size={18}
                      onClick={async () => {
                        let loggedInUser = getLoggedInUserId();
                        await addReaction(loggedInUser, "like", comment.pk);
                        setNumberOfLikes();
                        setIsCommentLikedByMe(true);
                      }}
                      style={{
                        cursor: "pointer",
                        marginRight: "5px",
                      }}
                    />
                  )}

                  {showNumberOfLikes}
                </div>

                {/* Heart */}
                <div
                  style={{
                    display: "flex ",
                    marginLeft: "5px",
                    alignItems: "center",
                  }}
                >
                  {isCommentHeartByMe ? (
                    <RiHeart3Fill
                      size={20}
                      onClick={async () => {
                        let loggedInUser = getLoggedInUserId();
                        await deleteReactionByCommentAndUserId(
                          comment.pk,
                          loggedInUser,
                          "heart"
                        );
                        setNumberOfHearts();
                        setIsCommentHeartByMe(false);
                      }}
                      style={{
                        cursor: "pointer",
                        color: "red",
                        marginRight: "5px",
                      }}
                    />
                  ) : (
                    <RiHeart3Fill
                      size={20}
                      onClick={async () => {
                        let loggedInUser = getLoggedInUserId();
                        await addReaction(loggedInUser, "heart", comment.pk);
                        setNumberOfHearts();
                        setIsCommentHeartByMe(true);
                      }}
                      style={{
                        cursor: "pointer",
                        color: "black",
                        marginRight: "5px",
                      }}
                    />
                  )}
                  {showNumberOfHearts}
                </div>
              </div>

              {/* Actions */}
              <div>
                {isItMyComment() && (
                  <MdEdit
                    size={20}
                    style={{
                      cursor: "pointer",
                      color: "green",
                    }}
                    onClick={() => {
                      handleShow();
                    }}
                  />
                )}

                {isItMyComment() && (
                  <AiFillDelete
                    size={18}
                    style={{
                      cursor: "pointer",
                      color: "red",
                      marginLeft: "10px",
                      marginRight: "10px",
                    }}
                    onClick={handleShowDeleteModal}
                  />
                )}

                <BsFillChatQuoteFill
                  size={15}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setNewCommentMessage('" ' + comment.message + ' "');
                    handleShowAddComment();
                  }}
                />
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
              display: "flex",
              justifyContent: "space-between",
              alignItems: " baseline",
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
