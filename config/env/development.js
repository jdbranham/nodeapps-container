'use strict';

var os = require('os');
var hostname = os.hostname();

module.exports = {
	app: {
		title: 'Nodeapps Container - Development Environment'
	},
	monitor:{
		carbonHost: process.env.CARBON_HOST || '127.0.0.1',
		carbonPort: process.env.CARBON_PORT || 2003,
		prefix: 'ni.' + hostname + '.nac',
		interval: 10000,
		verbose: true
	},
	assets: {
		html: ['public/modules/**/*.html'],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};
