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
        pull_request: null,
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
