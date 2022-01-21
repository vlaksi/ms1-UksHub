import axios from 'axios';
import { getParsedToken, getToken } from '../authentication/token';

export const createCommit = async (branchId, subject, description) => {
  let commit = null;
  let author = getParsedToken();
  let author_id = author.user_id;
  await axios
    .request({
      url: `/versioning/commits/`,
      method: 'post',
      baseURL: 'http://127.0.0.1:8000/',
      headers: { Authorization: 'JWT ' + getToken() },
      data: {
        author: author_id,
        branch: branchId,
        subject: subject,
        description: description,
        grant_type: 'client_credentials',
        scope: 'public',
      },
    })
    .then((response) => {
      commit = response.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return commit;
};
