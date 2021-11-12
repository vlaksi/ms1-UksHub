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
			console.log('branch: ', repository);
		})
		.catch((err) => {
			console.log(err);
		});
	return repository;
};
