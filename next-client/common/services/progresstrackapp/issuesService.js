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
