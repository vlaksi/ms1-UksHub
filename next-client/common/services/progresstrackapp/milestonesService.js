import axios from "axios";
import { getToken } from "../authentication/token";

export const addMilestone = async (
  newMilestoneName,
  newMilestoneDescription,
  newMilestoneDate,
  repoId
) => {
  let milestone = null;
  await axios
    .request({
      url: `/progresstrack/milestones/`,
      method: "post",
      baseURL: "http://127.0.0.1:8000/",
      headers: { Authorization: "JWT " + getToken() },
      data: {
        title: newMilestoneName,
        description: newMilestoneDescription,
        due_date: new Date(
          newMilestoneDate.toString(
            "YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z]"
          )
        ),
        repository: repoId,
        is_opened: true,
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

export const getAllMilestones = async (repoId) => {
  let milestones;
  await axios
    .request({
      url: `/progresstrack/repository/${repoId}/milestones`,
      method: "get",
      baseURL: "http://127.0.0.1:8000/",
      headers: { Authorization: "JWT " + getToken() },
      data: {
        grant_type: "client_credentials",
        scope: "public",
      },
    })
    .then((response) => {
      milestones = response.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return milestones;
};
export const getMilestoneById = async (milestoneId) => {
  let milestone = null;
  await axios
    .request({
      url: `/progresstrack/milestones/${milestoneId}`,
      method: "get",
      baseURL: "http://127.0.0.1:8000/",
      headers: { Authorization: "JWT " + getToken() },
      data: {
        grant_type: "client_credentials",
        scope: "public",
      },
    })
    .then((response) => {
      milestone = response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return milestone;
};
export const deleteMilestone = async (milestoneId) => {
  let success = false;
  await axios
    .request({
      url: `/progresstrack/milestones/${milestoneId}`,
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
export const updateMilestone = async (
  newMilestoneName,
  newMilestoneDescription,
  newMilestoneDate,
  milestoneId
) => {
  let success = false;
  await axios
    .request({
      url: `/progresstrack/milestones/${milestoneId}`,
      method: "patch",
      baseURL: "http://127.0.0.1:8000/",
      headers: { Authorization: "JWT " + getToken() },
      data: {
        title: newMilestoneName,
        description: newMilestoneDescription,
        due_date: new Date(
          newMilestoneDate.toString(
            "YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z]"
          )
        ),
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
export const updateMilestoneIssues = async (milestoneId, issueId) => {
  let success = false;
  await axios
    .request({
      url: `/progresstrack/milestones/${milestoneId}`,
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
export const getAllMilestoneIssues = async (milestoneId) => {
  let milestone = null;
  await axios
    .request({
      url: `/progresstrack/milestone/${milestoneId}/issues`,
      method: "get",
      baseURL: "http://127.0.0.1:8000/",
      headers: { Authorization: "JWT " + getToken() },
      data: {
        grant_type: "client_credentials",
        scope: "public",
      },
    })
    .then((response) => {
      milestone = response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return milestone;
};
export const updateMilestoneClose = async (isClosed, milestoneId) => {
  let success = false;
  await axios
    .request({
      url: `/progresstrack/milestones/${milestoneId}`,
      method: "patch",
      baseURL: "http://127.0.0.1:8000/",
      headers: { Authorization: "JWT " + getToken() },
      data: {
        is_opened: !isClosed,
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
