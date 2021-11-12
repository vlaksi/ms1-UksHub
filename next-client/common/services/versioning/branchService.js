import axios from 'axios';

export const getDefaultBranch = async (branchId) => {
	let branch;
	await axios
		.request({
			url: `/versioning/branchs/${branchId}`,
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
			branch = response.data;
			console.log('branch: ', branch);
		})
		.catch((err) => {
			console.log(err);
		});
	return branch;
};
