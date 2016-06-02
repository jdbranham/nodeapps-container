'use strict';
var os = require('os');
var hostname = os.hostname();

module.exports = {
	app: {
		title: 'Nodeapps Container',
		description: 'An application to host/deploy node apps',
		keywords: 'AngularJS, NodeJS, Bootstrap'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'kung fu',
	sessionCollection: 'sessions',
	unprotectedPaths: ['/auth/signin', '/auth/resetPassword', '/#!', '/login', '/lib/', '/modules'],
	unprotectedExtensions: ['.hmtl',
	                        '.jpg',
	                        '.png',
	                        '.gif',
	                        '.css',
	                        '.mp3',
	                        '.mp4'],
    assets: {
		lib: {
			css: [
				'public/lib/bootswatch-dist/css/bootstrap.min.css'
				//'public/lib/bootstrap/dist/css/bootstrap-theme.min.css',
			],
			js: [
				'public/lib/angular/angular.min.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-cookies/angular-cookies.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-touch/angular-touch.js',
				'public/lib/angular-sanitize/angular-sanitize.js',
				'public/lib/angular-ui-router/release/angular-ui-router.min.js',
				'public/lib/angular-ui-utils/ui-utils.min.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
				'public/lib/string/dist/string.js',
				'public/lib/jquery/jquery.min.js',
				'public/lib/bootswatch-dist/js/bootstrap.min.js',
				'public/lib/bootbox/bootbox.js',
				'public/lib/moment/moment.js'
			]
		},
		css: 'public/dist/application.min.css',
		js: 'public/dist/application.min.js'
	},
	monitor:{
		carbonHost: process.env.CARBON_HOST || '127.0.0.1',
		carbonPort: 2003,
		prefix: 'ni.' + hostname + '.nac',
		interval: 10000,
		verbose: true
	},
	logging:{
		responseInterceptor: process.env.RESPONSE_INTERCEPTOR_LOGGING || true
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