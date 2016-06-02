'use strict';

require('./globals');

/**
 * Module dependencies.
 */
var init = require('./config/init')(),
	config = require('./config/config'),
	chalk = require('chalk'),
	path = require('path');

// Bootstrap the process
app_require('config/process-config');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Init the express application
var app = require('./config/express')();

//Bootstrap passport config
require('./config/authentication/passport-config')();

// Bootstrap node-instrument
var instrument = require('node-instrument')({
	carbonHost: config.monitor.carbonHost,
	carbonPort: config.monitor.carbonPort,
	interval: config.monitor.interval,
	prefix: config.monitor.prefix,
	verbose: config.monitor.verbose
});
instrument.start();
instrument.add('server.restart', 1);

// Start the app by listening on <port>
app.listen(config.port);
// Expose application
exports = module.exports = app;

// Logging initialization
console.log('LRS application started on port ' + config.port);