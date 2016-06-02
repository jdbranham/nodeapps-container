'use strict';

/**
 * Module dependencies.
 */
var config = require('../config'),
	passport = require('passport'),
	S = require('string');

var endsWithUnprotectedExtension = function(path){
	var unprotected = false;
	for ( var index in config.unprotectedExtensions) {
		if(config.unprotectedExtensions[index]){
			unprotected = S(path).endsWith(config.unprotectedExtensions[index]);
			if(unprotected) {return true;}
		}
	}
	return unprotected;
};

var pathIsunprotected = function(path){
	var unprotected = false;
	for ( var index in config.unprotectedPaths) {
		if(config.unprotectedPaths[index]){
			unprotected = S(path).startsWith(config.unprotectedPaths[index]);
			if(unprotected) {return true;}
		}
	}
	return unprotected;
};


var doesNotRequireAuthentication = function(path){
	return (endsWithUnprotectedExtension(path) || pathIsunprotected(path));
};

var handleAuthentication = function(req, res, next) {
	var doesNotRequireAuth = doesNotRequireAuthentication(req.path);
	if(doesNotRequireAuth || req.isAuthenticated()){
		return next();
	}
	else{
		console.log('handle-authentication: Entering handler:');
		console.log('handle-authentication: Storing req.originalUrl in the cookie: '+ req.originalUrl );
		res.cookie('redirectUrl', req.originalUrl);
		console.log('handle-authentication: using local-strategy');
		req.authType = 'local';
		passport.authenticate('local-strategy', function(err, user, message){
			if(!user){
				return res.status(401).render('index');
			} else{
				delete req.user.USER_PASSWORD;
				req.user.provider = 'local';
				return next();
			}
		})(req, res);
	}
};

module.exports = function(){
	return handleAuthentication;
};