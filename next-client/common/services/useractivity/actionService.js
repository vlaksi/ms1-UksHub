import axios from 'axios';

export const createRepositoryAction = async (
	authorId,
	repositoryId,
	actionType = 'watch'
) => {
	let action;
	await axios
		.request({
			url: `/useractivity/actions/`,
			method: 'post',
			baseURL: 'http://127.0.0.1:8000/',
			headers: {'Authorization': 'JWT '+ localStorage.getItem('token')},
			data: {
				author: authorId,
				repository: repositoryId,
				action_type: actionType,
				grant_type: 'client_credentials',
				scope: 'public',
			},
		})
		.then((response) => {
			action = response.data;
		})
		.catch((err) => {
			console.log(err);
		});
	return action;
};

export const getActionByRepoAndAuthor = async (
	actionName,
	repositoryId,
	userId
) => {
	let action;
	await axios
		.request({
			url: `/useractivity/action/${actionName}/${repositoryId}/${userId}/`,
			method: 'get',
			baseURL: 'http://127.0.0.1:8000/',
			headers: {'Authorization': 'JWT '+ localStorage.getItem('token')},
			data: {
				grant_type: 'client_credentials',
				scope: 'public',
			},
		})
		.then((response) => {
			action = response.data;
		})
		.catch((err) => {
			console.log(err);
		});
	return action;
};

export const deleteActionById = async (actionId) => {
	let action;
	await axios
		.request({
			url: `/useractivity/actions/${actionId}`,
			method: 'delete',
			baseURL: 'http://127.0.0.1:8000/',
			headers: {'Authorization': 'JWT '+ localStorage.getItem('token')},
			data: {
				grant_type: 'client_credentials',
				scope: 'public',
			},
		})
		.then((response) => {
			action = response.data;
		})
		.catch((err) => {
			console.log(err);
		});
	return action;
};

export const getAllRepositoryUsersByAction = async (
	repositoryId,
	actionType = 'watch'
) => {
	let users;
	await axios
		.request({
			url: `/useractivity/users/${repositoryId}/${actionType}/`,
			method: 'get',
			baseURL: 'http://127.0.0.1:8000/',
			headers: {'Authorization': 'JWT '+ localStorage.getItem('token')},
			data: {
				grant_type: 'client_credentials',
				scope: 'public',
			},
		})
		.then((response) => {
			users = response.data;
		})
		.catch((err) => {
			console.log(err);
		});
	return users;
};

export const updateActionNewForkedRepoId = async (
	actionId,
	newForkedRepositoryId
) => {
	let action;
	await axios
		.request({
			url: `/useractivity/actions/${actionId}`,
			method: 'patch',
			baseURL: 'http://127.0.0.1:8000/',
			headers: {'Authorization': 'JWT '+ localStorage.getItem('token')},
			data: {
				new_forked_repository: newForkedRepositoryId,
				grant_type: 'client_credentials',
				scope: 'public',
			},
		})
		.then((response) => {
			action = response.data;
		})
		.catch((err) => {
			console.log(err);
		});
	return action;
};
