import axios from "axios";

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
      auth: {
        username: "admin", // This is the client_id
        password: "root", // This is the client_secret
      },
      data: {
        author: authorId,
        title: newPullRequestName,
        base_branch: newBaseBranch,
        compare_branch: newCompareBranch,
        repository: repositoryId,
        creation_date: "2021-11-18T17:13:40.948Z",
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
      auth: {
        username: "admin", // This is the client_id
        password: "root", // This is the client_secret
      },
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

export const deletePullRequest = async (pullRequestId) => {
  let success = false;
  await axios
    .request({
      url: `/progresstrack/pullrequests/${pullRequestId}`,
      method: "delete",
      baseURL: "http://127.0.0.1:8000/",
      auth: {
        username: "admin", // This is the client_id
        password: "root", // This is the client_secret
      },
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
