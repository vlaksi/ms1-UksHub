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

export const getAllLabels = async () => {
  let labels;
  await axios
    .request({
      url: `/progresstrack/labels/`,
      method: "get",
      baseURL: "http://127.0.0.1:8000/",
      headers: { Authorization: "JWT " + getToken() },
      data: {
        grant_type: "client_credentials",
        scope: "public",
      },
    })
    .then((response) => {
      labels = response.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return labels;
};
export const deleteLabel = async (labelId) => {
  let success = false;
  await axios
    .request({
      url: `/progresstrack/labels/${labelId}`,
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
