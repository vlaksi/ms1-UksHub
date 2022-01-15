import axios from "axios";
import { getToken } from "../authentication/token";

export const addLabel = async (newLabelName, newLabelDescription, newColor) => {
  let label = null;
  await axios
    .request({
      url: `/progresstrack/labels/`,
      method: "post",
      baseURL: "http://127.0.0.1:8000/",
      headers: { Authorization: "JWT " + getToken() },
      data: {
        name: newLabelName,
        decription: newLabelDescription,
        color: newColor,
        grant_type: "client_credentials",
        scope: "public",
      },
    })
    .then((response) => {
      label = response.data;
    })
    .catch((error) => {
      console.log(error.response.data.error);
    });

  return label;
};
