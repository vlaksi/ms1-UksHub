const issues = [
	{
		name: 'Spike: Docker Compose',
		idx: '1',
	},
	{
		name: 'EPIC: Advanced Search',
		idx: '2',
	},
];

const repositories = [
	{
		name: 'ms1-UksHub',
		issues: issues,
	},
	{
		name: 'Election-DAPP',
		issues: [],
	},
];

const users = [
	{
		username: 'pufke',
		repositories: repositories,
	},
	{
		username: 'vlaksi',
		repositories: repositories,
	},
	{
		username: 'anciz',
	},
	{
		username: 'dragana',
	},
	{
		username: 'ivana',
	},
	{
		username: 'milana',
	},
];

export function getDataForSearch() {
	let dataForSearch = [];

	users.map((user) => {
		dataForSearch.push({
			title: user.username,
			route: user.username,
			type: 'user',
		});
		user.repositories?.map((repository) => {
			dataForSearch.push({
				title: user.username + '/' + repository.name,
				route: user.username + '/' + repository.name,
				type: 'repository',
			});

			repository.issues?.map((issue) => {
				dataForSearch.push({
					title: user.username + '/' + repository.name + '/' + issue.name,
					route: user.username + '/' + repository.name + '/issues/' + issue.idx,
					type: 'issue',
				});
			});
		});
	});

	return dataForSearch;
}
