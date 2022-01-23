import axios from "axios";
import { getToken } from "../authentication/token";

export const addIssue = async (newIssueName, authorId, repoId) => {
  let milestone = null;
  await axios
    .request({
      url: `/progresstrack/issues/`,
      method: "post",
      baseURL: "http://127.0.0.1:8000/",
      headers: { Authorization: "JWT " + getToken() },
      data: {
        title: newIssueName,
        creation_date: new Date(),
        is_opened: true,
        author: authorId,
        repository: repoId,
        grant_type: "client_credentials",
        scope: "public",
      },
    })
    .then((response) => {
      milestone = response.data;
    })
    .catch((error) => {
      console.log(error.response.data.error);
    });

  return milestone;
};
export const getAllIssues = async (repoId) => {
  let issues;
  await axios
    .request({
      url: `/progresstrack/repository/${repoId}/issues`,
      method: "get",
      baseURL: "http://127.0.0.1:8000/",
      headers: { Authorization: "JWT " + getToken() },
      data: {
        grant_type: "client_credentials",
        scope: "public",
      },
    })
    .then((response) => {
      issues = response.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return issues;
};
export const deleteIssue = async (issueId) => {
  let success = false;
  await axios
    .request({
      url: `/progresstrack/issues/${issueId}`,
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
export const updateIssue = async (newIssueName, issueId) => {
  let success = false;
  await axios
    .request({
      url: `/progresstrack/issues/${issueId}`,
      method: "patch",
      baseURL: "http://127.0.0.1:8000/",
      headers: { Authorization: "JWT " + getToken() },
      data: {
        title: newIssueName,
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
export const getIssueById = async (issueId) => {
  let issue = null;
  await axios
    .request({
      url: `/progresstrack/issues/${issueId}`,
      method: "get",
      baseURL: "http://127.0.0.1:8000/",
      headers: { Authorization: "JWT " + getToken() },
      data: {
        grant_type: "client_credentials",
        scope: "public",
      },
    })
    .then((response) => {
      issue = response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return issue;
};
