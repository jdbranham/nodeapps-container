'use strict';

/**
 * Module dependencies.
 */


exports.index = function(req, res) {
	return res.render('index', {
		request: req
	});
};

exports.unauthorized = function(req, res) {

	return res.render('unauthorized', {
		request: req
	});
};

exports.login = function(req, res) {

	return res.render('login', {
		request: req
	});
};