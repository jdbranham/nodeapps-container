'use strict';

/**
 * Module dependencies.
 */
var service = app_require('app/services/source-control.service');

exports.index = function(req, res) {
	service.update().then(function success(bufferedResponse){
		return res.send(bufferedResponse.toString());
	}, function failure(err){
		return res.status(500).send(err);
	});
	
};

exports.status = function(req, res) {
	service.status().then(function success(statusText){
		return res.send(statusText);
	}, function failure(err){
		return res.status(500).send(err);
	});
	
};

exports.clearLog = function(req, res) {
	service.clearLog().then(function success(bufferedResponse){
		return res.send(bufferedResponse.toString());
	}, function failure(err){
		return res.status(500).send(err);
	});
	
};