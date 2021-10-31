const backendFolder = {
	name: 'django-backend',
	folders: [],
	files: [
		{
			name: 'main.py',
		},
		{
			name: 'startup.py',
		},
	],
};

const contentFolder = {
	name: 'content',
	folders: [
		{
			name: 'model',
			folders: [
				{
					name: 'c4',
					files: [],
				},
				{
					name: 'class-diagram',
					files: [],
				},
			],
			files: [
				{
					name: 'some-image.jpg',
				},
			],
		},
	],
	files: [],
};

const files = [
	{
		name: 'index.html',
	},
	{
		name: 'README.md',
	},
];

const folders = [backendFolder];

export const branches = [
	{
		branchName: 'main',
		folders: [contentFolder, ...folders],
		files: files,
	},
	{
		branchName: 'develop',
		folders: folders,
	},
	{
		branchName: 'feature/yyy',
		folders: folders,
	},
];
