// next.config.js

const webpack = require('webpack');
require('dotenv').config();

module.exports = {
	distDir: 'build',
	webpack: (config) => {
		const env = Object.keys(process.env).reduce((acc, curr) => {
			acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
			return acc;
		}, {});
		// fs turn off because chartjs-to-image libary
		config.resolve.fallback = { fs: false };
		config.plugins.push(new webpack.DefinePlugin(env));

		return config;
	},
	reactStrictMode: true,
};
