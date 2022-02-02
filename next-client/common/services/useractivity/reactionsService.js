import axios from "axios";
import { getToken } from "../authentication/token";

export const getAllReactionsByCommentId = async (commentId) => {
  let reactions;
  await axios
    .request({
      url: `/useractivity/reactions/comment/${commentId}`,
      method: "get",
      baseURL: "http://127.0.0.1:8000/",
      headers: { Authorization: "JWT " + getToken() },
      data: {
        grant_type: "client_credentials",
        scope: "public",
      },
    })
    .then((response) => {
      reactions = response.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return reactions;
};

export const addReaction = async (authorId, reactionType, commentId) => {
  let reaction = null;
  await axios
    .request({
      url: `/useractivity/reactions/`,
      method: "post",
      baseURL: "http://127.0.0.1:8000/",
      headers: { Authorization: "JWT " + getToken() },
      data: {
        author: authorId,
        type: reactionType,
        comment: commentId,
        grant_type: "client_credentials",
        scope: "public",
      },
    })
    .then((response) => {
      reaction = response.data;
    })
    .catch((error) => {
      console.log(error.response.data.error);
    });

  return reaction;
};

export const deleteReactionByCommentAndUserId = async (
  commentId,
  userId,
  reactionType
) => {
  let success = false;
  await axios
    .request({
      url: `/useractivity/reactions/comments/${commentId}/user/${userId}/type/${reactionType}`,
      method: "delete",
      baseURL: "http://127.0.0.1:8000/",
      headers: { Authorization: "JWT " + getToken() },
      data: {
        grant_type: "client_credentials",
        scope: "public",
      },
    })
    .then((response) => {
      console.log(response);
      success = true;
    })
    .catch((error) => {
      console.log(error.response.data.error);
    });
  return success;
};
