import axios from 'axios';
import { getToken } from '../authentication/token';

export const searchAllRepositories = async (search) => {
  let repositories;
  await axios
    .request({
      url: `/versioning/repositories/?search=${search}`,
      method: 'get',
      baseURL: 'http://127.0.0.1:8000/',
      headers: { Authorization: 'JWT ' + getToken() },
      data: {
        grant_type: 'client_credentials',
        scope: 'public',
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

export const getAllRepositoriesByAuthor = async (user_id) => {
  let repositories;
  await axios
    .request({
      url: `/versioning/users/${user_id}/repositories`,
      method: 'get',
      baseURL: 'http://127.0.0.1:8000/',
      headers: { Authorization: 'JWT ' + getToken() },
      data: {
        grant_type: 'client_credentials',
        scope: 'public',
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

export const searchAllRepositoriesByAuthor = async (user_id, searchword) => {
  let repositories;
  await axios
    .request({
      url: `/versioning/users/${user_id}/repositories/${searchword}`,
      method: 'get',
      baseURL: 'http://127.0.0.1:8000/',
      headers: { Authorization: 'JWT ' + getToken() },
      data: {
        grant_type: 'client_credentials',
        scope: 'public',
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

export const getRepositoryById = async (repositoryId) => {
  let repository;
  await axios
    .request({
      url: `/versioning/repositories/${repositoryId}`,
      method: 'get',
      baseURL: 'http://127.0.0.1:8000/',
      headers: { Authorization: 'JWT ' + getToken() },
      data: {
        grant_type: 'client_credentials',
        scope: 'public',
      },
    })
    .then((response) => {
      repository = response.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return repository;
};

export const addRepository = async (newRepositoryName, newRepositoryDescription, authorId, defaultBranch = 'master', forkedFromAuthorId = null) => {
  let repository = null;
  await axios
    .request({
      url: `/versioning/repositories/`,
      method: 'post',
      baseURL: 'http://127.0.0.1:8000/',
      headers: { Authorization: 'JWT ' + getToken() },
      data: {
        name: newRepositoryName,
        description: newRepositoryDescription,
        author: authorId,
        default_branch: defaultBranch,
        forked_from_author: forkedFromAuthorId,
        grant_type: 'client_credentials',
        scope: 'public',
      },
    })
    .then((response) => {
      repository = response.data;
    })
    .catch((error) => {
      console.log(error.response.data.error);
    });

  return repository;
};

export const updateRepositoryDefaultBranch = async (repositoryId, newDefaultBranchName) => {
  let updatedBranch;
  await axios
    .request({
      url: `/versioning/repositories/${repositoryId}`,
      method: 'patch',
      baseURL: 'http://127.0.0.1:8000/',
      headers: { Authorization: 'JWT ' + getToken() },
      data: {
        default_branch: newDefaultBranchName,
        grant_type: 'client_credentials',
        scope: 'public',
      },
    })
    .then((response) => {
      updatedBranch = response;
    });

  return updatedBranch;
};

export const getBranchLastCommit = async (repository_id, branchName) => {
  let files;
  await axios
    .request({
      url: `/versioning/branch/${repository_id}/${branchName}/commit/`,
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

export const getBranchCommits = async (repository_id, branchName) => {
  let files;
  await axios
    .request({
      url: `/versioning/branch/${repository_id}/${branchName}/commits/`,
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

export const updateRepositoryName = async (newRepositoryName, repositoryId) => {
  let success = false;
  await axios
    .request({
      url: `/versioning/repositories/${repositoryId}`,
      method: 'patch',
      baseURL: 'http://127.0.0.1:8000/',
      headers: { Authorization: 'JWT ' + getToken() },
      data: {
        name: newRepositoryName,
        grant_type: 'client_credentials',
        scope: 'public',
      },
    })
    .then((response) => {
      success = true;
    })
    .catch((error) => {
      console.log(error.response.data.error);
      success = false;
    });
  return success;
};


export const updateRepositoryDescription = async (newRepositoryDescription, repositoryId) => {
  let success = false;
  await axios
    .request({
      url: `/versioning/repositories/${repositoryId}`,
      method: 'patch',
      baseURL: 'http://127.0.0.1:8000/',
      headers: { Authorization: 'JWT ' + getToken() },
      data: {
        description: newRepositoryDescription,
        grant_type: 'client_credentials',
        scope: 'public',
      },
    })
    .then((response) => {
      success = true;
    })
    .catch((error) => {
      console.log(error.response.data.error);
    });

  return success;
};

export const deleteRepository = async (repositoryId) => {
  let success = false;
  await axios
    .request({
      url: `/versioning/repositories/${repositoryId}`,
      method: 'delete',
      baseURL: 'http://127.0.0.1:8000/',
      headers: { Authorization: 'JWT ' + getToken() },
      data: {
        grant_type: 'client_credentials',
        scope: 'public',
      },
    })
    .then((response) => {
      success = true;
    })
    .catch((error) => {
      console.log(error.response.data.error);
    });
  return success;
};

// TODO: Move all these collaboration stuff to the collaborationService !!
export const getRepositoryCollaboratos = async (repositoryId) => {
  let repositoryCollaborators;
  await axios
    .request({
      url: `/versioning/repository/${repositoryId}/collaborators/`,
      method: 'get',
      baseURL: 'http://127.0.0.1:8000/',
      headers: { Authorization: 'JWT ' + getToken() },
      data: {
        grant_type: 'client_credentials',
        scope: 'public',
      },
    })
    .then((response) => {
      repositoryCollaborators = response.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return repositoryCollaborators;
};

export const searchRepositoryCollaboratos = async (repositoryId, search) => {
  let repositoryCollaborators;
  await axios
    .request({
      url: `/versioning/repository/${repositoryId}/collaborators/${search}`,
      method: 'get',
      baseURL: 'http://127.0.0.1:8000/',
      headers: { Authorization: 'JWT ' + getToken() },
      data: {
        grant_type: 'client_credentials',
        scope: 'public',
      },
    })
    .then((response) => {
      repositoryCollaborators = response.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return repositoryCollaborators;
};

export const getAllCollaboratorsRoles = async () => {
  let collaboratorsRoles;
  await axios
    .request({
      url: `/versioning/collaboration/types/`,
      method: 'get',
      baseURL: 'http://127.0.0.1:8000/',
      headers: { Authorization: 'JWT ' + getToken() },
      data: {
        grant_type: 'client_credentials',
        scope: 'public',
      },
    })
    .then((response) => {
      collaboratorsRoles = response.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return collaboratorsRoles;
};

export const deleteCollaborationById = async (collaborationId) => {
  await axios
    .request({
      url: `/versioning/collaborations/${collaborationId}`,
      method: 'delete',
      baseURL: 'http://127.0.0.1:8000/',
      headers: { Authorization: 'JWT ' + getToken() },
      data: {
        grant_type: 'client_credentials',
        scope: 'public',
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

// We do not need collaborator ID or repository ID because we have collaborationId !
export const updateCollaboratorRole = async (collaborationId, newRoleId) => {
  await axios
    .request({
      url: `/versioning/collaborations/${collaborationId}`,
      method: 'patch',
      baseURL: 'http://127.0.0.1:8000/',
      headers: { Authorization: 'JWT ' + getToken() },
      data: {
        collaboration_type: newRoleId,
        grant_type: 'client_credentials',
        scope: 'public',
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createCollaboration = async (collaboratorId, repositoryId) => {
  await axios
    .request({
      url: `/versioning/collaborations/`,
      method: 'post',
      baseURL: 'http://127.0.0.1:8000/',
      headers: { Authorization: 'JWT ' + getToken() },
      data: {
        collaborator: collaboratorId,
        repository: repositoryId,
        collaboration_type: 1,
        grant_type: 'client_credentials',
        scope: 'public',
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createVisit = async (uniqueFingerprint, repositoryId, visitDate) => {
  await axios
    .request({
      url: `/versioning/visits/`,
      method: 'post',
      baseURL: 'http://127.0.0.1:8000/',
      headers: { Authorization: 'JWT ' + getToken() },
      data: {
        unique_fingerprint: uniqueFingerprint,
        repository: repositoryId,
        visit_date: visitDate,
        grant_type: 'client_credentials',
        scope: 'public',
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getRepositoryVisits = async (repositoryId) => {
  let repositoryCollaborators;
  await axios
    .request({
      url: `/versioning/visits/repositoryid/${repositoryId}`,
      method: 'get',
      baseURL: 'http://127.0.0.1:8000/',
      headers: { Authorization: 'JWT ' + getToken() },
      data: {
        grant_type: 'client_credentials',
        scope: 'public',
      },
    })
    .then((response) => {
      repositoryCollaborators = response.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return repositoryCollaborators;
};