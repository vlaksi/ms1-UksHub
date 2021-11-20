import axios from "axios";

export const addPullRequest = async (
  newPullRequestName,
  //newBaseBranch,
  //newCompareBranch,
  repositoryId
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
        title: newPullRequestName,
        base_branch: "2",
        compare_branch: "2",
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
