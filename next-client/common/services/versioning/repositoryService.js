import axios from "axios";

export const getAllRepositoriesByAuthor = async (user_id) => {
  let repositories;
  await axios
    .request({
      url: `/versioning/users/${user_id}/repositories`,
      method: "get",
      baseURL: "http://127.0.0.1:8000/",
      auth: {
        username: "anci", // This is the client_id
        password: "root", // This is the client_secret
      },
      data: {
        grant_type: "client_credentials",
        scope: "public",
      },
    })
    .then((response) => {
      repositories = response.data;
    })
    .catch((error) => {
      console.log(error.response.data.error);
    });
  return repositories;
};
