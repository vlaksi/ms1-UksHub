import axios from 'axios';

export const getRepositoryById = async (repositoryId) => {
	let repository;
	await axios
		.request({
			url: `/versioning/repositorys/${repositoryId}`,
			method: 'get',
			baseURL: 'http://127.0.0.1:8000/',
			auth: {
				username: 'vaksi', // This is the client_id
				password: 'root', // This is the client_secret
			},
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

export const updateRepositoryDefaultBranch = async (
	repositoryId,
	newDefaultBranchId
) => {
	let updatedBranch;
	await axios
		.request({
			url: `/versioning/repositorys/${repositoryId}`,
			method: 'patch',
			baseURL: 'http://127.0.0.1:8000/',
			auth: {
				username: 'vaksi', // This is the client_id
				password: 'root', // This is the client_secret
			},
			data: {
				default_branch: newDefaultBranchId,
				grant_type: 'client_credentials',
				scope: 'public',
			},
		})
		.then((response) => {
			updatedBranch = response;
		});

	return updatedBranch;
};

export const getRepositoryCollaboratos = async (repositoryId) => {
	let repositoryCollaborators;
	await axios
		.request({
			url: `/versioning/repository/${repositoryId}/collaborators/`,
			method: 'get',
			baseURL: 'http://127.0.0.1:8000/',
			auth: {
				username: 'vaksi', // This is the client_id
				password: 'root', // This is the client_secret
			},
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
