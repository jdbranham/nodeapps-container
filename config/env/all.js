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
				'public/lib/bootswatch-dist/css/bootstrap.css'
			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-cookies/angular-cookies.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-touch/angular-touch.js',
				'public/lib/angular-sanitize/angular-sanitize.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/string/dist/string.js',
				'public/lib/jquery/jquery.js',
				'public/lib/bootswatch-dist/js/bootstrap.js',
				'public/lib/bootbox/bootbox.js',
				'public/lib/moment/moment.js'
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		html: ['public/modules/**/*.html'],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
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