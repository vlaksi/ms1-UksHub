import axios from "axios";
import { getToken } from "../authentication/token";

export const addMilestone = async (
  newMilestoneName,
  newMilestoneDescription,
  newMilestoneDate
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

export const getAllMilestones = async () => {
  let milestones;
  await axios
    .request({
      url: `/progresstrack/milestones/`,
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
