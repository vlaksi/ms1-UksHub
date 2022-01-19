import axios from 'axios';
import { getToken } from '../authentication/token';

export const getBranchFolders = async (branchId) => {
  let folders;
  await axios
    .request({
      url: `/versioning/branch/${branchId}/folders`,
      method: 'get',
      baseURL: 'http://127.0.0.1:8000/',
      headers: { Authorization: 'JWT ' + getToken() },
      data: {
        grant_type: 'client_credentials',
        scope: 'public',
      },
    })
    .then((response) => {
      folders = response.data;
    })
    .catch((error) => {
      console.log(error.response.data.errorrr);
    });
  return folders;
};

export const getBranchFiles = async (branchId) => {
  let files;
  await axios
    .request({
      url: `/versioning/branch/${branchId}/files`,
      method: 'get',
      baseURL: 'http://127.0.0.1:8000/',
      headers: { Authorization: 'JWT ' + getToken() },
      data: {
        grant_type: 'client_credentials',
        scope: 'public',
      },
    })
    .then((response) => {
      files = response.data;
    })
    .catch((error) => {
      console.log(error.response.data.errorrr);
    });
  return files;
};
