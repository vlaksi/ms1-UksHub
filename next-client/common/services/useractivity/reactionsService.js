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
