import axios from "axios";
import { getToken } from "../authentication/token";

export const addPullRequest = async (
  newPullRequestName,
  newBaseBranch,
  newCompareBranch,
  repositoryId,
  authorId
) => {
  let pullRequest = null;
  await axios
    .request({
      url: `/progresstrack/pullrequests/`,
      method: "post",
      baseURL: "http://127.0.0.1:8000/",
      headers: { Authorization: "JWT " + getToken() },
      data: {
        author: authorId,
        title: newPullRequestName,
        base_branch: newBaseBranch,
        compare_branch: newCompareBranch,
        repository: repositoryId,
        creation_date: new Date(),
        // creation_date: "2021-11-18T17:13:40.948Z",
        grant_type: "client_credentials",
        scope: "public",
      },
    })
    .then((response) => {
      pullRequest = response.data;
    })
    .catch((error) => {
      console.log(error.response.data.error);
    });

  return pullRequest;
};

export const getPullRequestsByRepository = async (repositoryId) => {
  let pullRequests = null;
  await axios
    .request({
      url: `/progresstrack/repository/${repositoryId}/pullrequests`,
      method: "get",
      baseURL: "http://127.0.0.1:8000/",
      headers: { Authorization: "JWT " + getToken() },
      data: {
        grant_type: "client_credentials",
        scope: "public",
      },
    })
    .then((response) => {
      pullRequests = response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return pullRequests;
};

export const updatePullRequestName = async (
  newPullRequestName,
  pullRequestId
) => {
  let success = false;
  await axios
    .request({
      url: `/progresstrack/pullrequests/${pullRequestId}`,
      method: "patch",
      baseURL: "http://127.0.0.1:8000/",
      headers: { Authorization: "JWT " + getToken() },
      data: {
        title: newPullRequestName,
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

export const getPullRequestById = async (pullRequestId) => {
  let pullRequest = null;
  await axios
    .request({
      url: `/progresstrack/pullrequests/${pullRequestId}`,
      method: "get",
      baseURL: "http://127.0.0.1:8000/",
      headers: { Authorization: "JWT " + getToken() },
      data: {
        grant_type: "client_credentials",
        scope: "public",
      },
    })
    .then((response) => {
      pullRequest = response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return pullRequest;
};

export const deletePullRequest = async (pullRequestId) => {
  let success = false;
  await axios
    .request({
      url: `/progresstrack/pullrequests/${pullRequestId}`,
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
export const getAllPullRequestAssignees = async (pullRequestId) => {
  let pullRequest = null;
  await axios
    .request({
      url: `/progresstrack/pullrequest/${pullRequestId}/assignes`,
      method: "get",
      baseURL: "http://127.0.0.1:8000/",
      headers: { Authorization: "JWT " + getToken() },
      data: {
        grant_type: "client_credentials",
        scope: "public",
      },
    })
    .then((response) => {
      pullRequest = response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return pullRequest;
};
export const updatePullRequestAssigness = async (
  pullRequestId,
  userAccountId
) => {
  let success = false;
  await axios
    .request({
      url: `/progresstrack/pullrequests/${pullRequestId}`,
      method: "patch",
      baseURL: "http://127.0.0.1:8000/",
      headers: { Authorization: "JWT " + getToken() },
      data: {
        assigness: userAccountId,
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
export const getAllPullRequestLabels = async (pullRequestId) => {
  let issue = null;
  await axios
    .request({
      url: `/progresstrack/pullrequest/${pullRequestId}/labels`,
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
export const getAllPullRequestIssues = async (pullRequestId) => {
  let issue = null;
  await axios
    .request({
      url: `/progresstrack/pullrequest/${pullRequestId}/issues`,
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
export const updatePullRequestLabels = async (pullRequestId, labelId) => {
  let success = false;
  await axios
    .request({
      url: `/progresstrack/pullrequests/${pullRequestId}`,
      method: "patch",
      baseURL: "http://127.0.0.1:8000/",
      headers: { Authorization: "JWT " + getToken() },
      data: {
        labels: labelId,
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
export const updatePullRequestIssues = async (pullRequestId, issueId) => {
  let success = false;
  await axios
    .request({
      url: `/progresstrack/pullrequests/${pullRequestId}`,
      method: "patch",
      baseURL: "http://127.0.0.1:8000/",
      headers: { Authorization: "JWT " + getToken() },
      data: {
        issues: issueId,
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
