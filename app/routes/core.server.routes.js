'use strict';

var core = require('../../app/controllers/core.server.controller');
var passport = require('passport');

module.exports = function(app) {
	// Root routing
	app.route('/').get(core.index);
	app.route('/unauthorized').get(core.unauthorized);
	app.route('/login').get(core.login);
};