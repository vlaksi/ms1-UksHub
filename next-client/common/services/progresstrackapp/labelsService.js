import axios from "axios";
import { getToken } from "../authentication/token";

export const addLabel = async (
  newLabelName,
  newLabelDescription,
  newColor,
  repoId
) => {
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
        repository: repoId,
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

export const getAllLabels = async (repoId) => {
  let labels;
  await axios
    .request({
      url: `/progresstrack/repository/${repoId}/labels`,
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
export const searchAllLables = async (search) => {
  let issues;
  await axios
    .request({
      url: `/progresstrack/labels/?search=${search}`,
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
export const updateLabel = async (
  newLabelName,
  newLabelDescription,
  newLabelColor,
  labelId
) => {
  let success = false;
  await axios
    .request({
      url: `/progresstrack/labels/${labelId}`,
      method: "patch",
      baseURL: "http://127.0.0.1:8000/",
      headers: { Authorization: "JWT " + getToken() },
      data: {
        name: newLabelName,
        decription: newLabelDescription,
        color: newLabelColor,
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
export const getLabelDataForIssueLabellingSearch = async (repositoryId) => {
  const labels = await getAllLabels(repositoryId);
  console.log(labels);

  let dataForSearch = [];
  labels?.map((label) => {
    dataForSearch.push({
      title: label.name,
      pk: label.pk,
    });
  });

  return dataForSearch;
};
