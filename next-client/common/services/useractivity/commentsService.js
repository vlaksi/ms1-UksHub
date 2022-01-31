import axios from "axios";
import { getToken } from "../authentication/token";

export const addCommentIssue = async (messageComment, authorId, issueId) => {
  let comment = null;
  await axios
    .request({
      url: `/useractivity/comments/`,
      method: "post",
      baseURL: "http://127.0.0.1:8000/",
      headers: { Authorization: "JWT " + getToken() },
      data: {
        message: messageComment,
        creation_date: new Date(),
        author: authorId,
        issue: issueId,
        grant_type: "client_credentials",
        scope: "public",
      },
    })
    .then((response) => {
      comment = response.data;
    })
    .catch((error) => {
      console.log(error.response.data.error);
    });

  return comment;
};
export const addCommentPullRequest = async (
  messageComment,
  authorId,
  pullRequestId
) => {
  let comment = null;
  await axios
    .request({
      url: `/useractivity/comments/`,
      method: "post",
      baseURL: "http://127.0.0.1:8000/",
      headers: { Authorization: "JWT " + getToken() },
      data: {
        message: messageComment,
        creation_date: new Date(),
        author: authorId,
        pull_request: pullRequestId,
        grant_type: "client_credentials",
        scope: "public",
      },
    })
    .then((response) => {
      comment = response.data;
    })
    .catch((error) => {
      console.log(error.response.data.error);
    });

  return comment;
};
export const getAllCommentsIssues = async (issueId) => {
  let comments;
  await axios
    .request({
      url: `/useractivity/issue/${issueId}/comments`,
      method: "get",
      baseURL: "http://127.0.0.1:8000/",
      headers: { Authorization: "JWT " + getToken() },
      data: {
        grant_type: "client_credentials",
        scope: "public",
      },
    })
    .then((response) => {
      comments = response.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return comments;
};
export const getAllCommentsPullRequests = async (pullRequestId) => {
  let comments;
  await axios
    .request({
      url: `/useractivity/pull_request/${pullRequestId}/comments`,
      method: "get",
      baseURL: "http://127.0.0.1:8000/",
      headers: { Authorization: "JWT " + getToken() },
      data: {
        grant_type: "client_credentials",
        scope: "public",
      },
    })
    .then((response) => {
      comments = response.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return comments;
};
export const deleteComment = async (commentId) => {
  let success = false;
  await axios
    .request({
      url: `/useractivity/comments/${commentId}`,
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
export const updateComment = async (newCommentMessage, commentId) => {
  let success = false;
  await axios
    .request({
      url: `/useractivity/comments/${commentId}`,
      method: "patch",
      baseURL: "http://127.0.0.1:8000/",
      headers: { Authorization: "JWT " + getToken() },
      data: {
        message: newCommentMessage,
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
      success = false;
    });
  return success;
};
