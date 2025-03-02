import axios from 'axios';
import { getToken } from '../authentication/token';

export const getDefaultBranch = async (branchId) => {
	let branch;
	await axios
		.request({
			url: `/versioning/branchs/${branchId}`,
			method: 'get',
			baseURL: 'http://127.0.0.1:8000/',
			headers: { Authorization: 'JWT ' + getToken() },
			data: {
				grant_type: 'client_credentials',
				scope: 'public',
			},
		})
		.then((response) => {
			branch = response.data;
		})
		.catch((err) => {
			console.log(err);
		});
	return branch;
};

export const getBranchContent = async (repositoryId, branchName) => {
	let content;
	await axios
		.request({
			url: `/versioning/repository/${repositoryId}/branch/${branchName}/content`,
			method: 'get',
			baseURL: 'http://127.0.0.1:8000/',
			headers: { Authorization: 'JWT ' + getToken() },
			data: {
				grant_type: 'client_credentials',
				scope: 'public',
			},
		})
		.then((response) => {
			content = response.data;
		})
		.catch((err) => {
			console.log(err);
		});
	return content;
};

export const getCommitsBranch = async (branchId) => {
	let branch;
	await axios
		.request({
			url: `/versioning/branchs/${branchId}`,
			method: 'get',
			baseURL: 'http://127.0.0.1:8000/',
			headers: { Authorization: 'JWT ' + getToken() },
			data: {
				grant_type: 'client_credentials',
				scope: 'public',
			},
		})
		.then((response) => {
			branch = response.data;
		})
		.catch((err) => {
			console.log(err);
		});
	return branch;
};

export const getRepositoryBranches = async (repositoryId) => {
	let branches;
	await axios
		.request({
			url: `/versioning/repository/${repositoryId}/branches/`,
			method: 'get',
			baseURL: 'http://127.0.0.1:8000/',
			headers: { Authorization: 'JWT ' + getToken() },
			data: {
				grant_type: 'client_credentials',
				scope: 'public',
			},
		})
		.then((response) => {
			branches = response.data;
		})
		.catch((err) => {
			console.log(err);
		});
	return branches;
};
export const getMainBranchCommits = async (repoId) => {
	let commits;
	await axios
		.request({
			url: `/versioning/mainbranch/${repoId}/commits/`,
			method: 'get',
			baseURL: 'http://127.0.0.1:8000/',
			headers: { Authorization: 'JWT ' + getToken() },
			data: {
				grant_type: 'client_credentials',
				scope: 'public',
			},
		})
		.then((response) => {
			commits = response.data;
		})
		.catch((err) => {
			console.log(err);
		});
	return commits;
};
export const createBranch = async (repositoryId, branchName = 'main') => {
	let branch = null;
	await axios
		.request({
			url: `/versioning/branchs/`,
			method: 'post',
			baseURL: 'http://127.0.0.1:8000/',
			headers: { Authorization: 'JWT ' + getToken() },
			data: {
				name: branchName,
				repository: repositoryId,
				grant_type: 'client_credentials',
				scope: 'public',
			},
		})
		.then((response) => {
			branch = response.data;
		})
		.catch((err) => {
			console.log(err);
		});
	return branch;
};

export const deleteBranch = async (branchId) => {
	let branch = null;
	await axios
		.request({
			url: `/versioning/branchs/${branchId}`,
			method: 'delete',
			baseURL: 'http://127.0.0.1:8000/',
			headers: { Authorization: 'JWT ' + getToken() },
			data: {
				grant_type: 'client_credentials',
				scope: 'public',
			},
		})
		.then((response) => {
			branch = response.data;
		})
		.catch((err) => {
			console.log(err);
		});
	return branch;
};
