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
		lib: {
			css: [
				'public/lib/bootswatch-dist/css/bootstrap.css',
				//'public/lib/bootstrap/dist/css/bootstrap-theme.css',
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
	}
};
