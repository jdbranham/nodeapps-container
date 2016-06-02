'use strict';

/**
 * Module dependencies.
 */

module.exports = function(req, res, next) {
	res.locals.hostname = req.hostname;
	res.locals.url = req.protocol + '://' + req.headers.host + req.url;
	res.locals.startTime = Date.now();
	next();
};