'use strict';

var controller = app_require('app/controllers/scm.server.controller');

module.exports = function(app) {
	app.route('/update').post(controller.index);
	app.route('/status').post(controller.status);
	app.route('/clearLog').post(controller.clearLog);
};