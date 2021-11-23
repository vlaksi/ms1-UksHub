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
			auth: {
				username: 'admin', // This is the client_id
				password: 'root', // This is the client_secret
			},
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
			auth: {
				username: 'admin', // This is the client_id
				password: 'root', // This is the client_secret
			},
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
