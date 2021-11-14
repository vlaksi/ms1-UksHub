import axios from 'axios';

export const getAllUsers = async () => {
	let users;
	await axios
		.request({
			url: `/useractivity/users/`,
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
			users = response.data;
		})
		.catch((err) => {
			console.log(err);
		});
	return users;
};

export const getUserDataForSearch = async () => {
	const users = await getAllUsers();

	let dataForSearch = [];
	users.map((user) => {
		dataForSearch.push({
			title: user.username,
			pk: user.pk,
			type: 'user',
		});
	});

	return dataForSearch;
};
