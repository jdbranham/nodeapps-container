'use strict';

var os = require('os');
var hostname = os.hostname();

module.exports = {
	monitor:{
		carbonHost: process.env.CARBON_HOST || '127.0.0.1',
		carbonPort: 2003,
		prefix: 'ni.' + hostname + '.nac',
		interval: 10000,
		verbose: true
	},
	sourceControl: {
		commands: {
			update: 'svn up {{path}}',
			checkout: 'svn co {{url}} {{path}}'
		},
		apps: [
		    {
		    	path:'deploy/app1',
		    	scmUrl: 'https://github.com/jdbranham/node-instrument.git'
		    },
		    {
		    	path:'deploy/app2',
		    	scmUrl: 'https://github.com/jdbranham/shellstatd.git'
		    }
		]
	}
};
