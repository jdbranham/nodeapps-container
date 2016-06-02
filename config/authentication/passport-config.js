'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
	path = require('path'),
	config = require('../config');

/**
 * Module init function.
 */
module.exports = function() {
	var logKey = 'passport-config';
	// Serialize sessions
	//passport.serializeUser(userPersistenceService.serializeUser);

	// Deserialize sessions
	//passport.deserializeUser(userPersistenceService.deserializeUser);
	
	passport.serializeUser(function(user, done) {
	  done(null, user);
	});

	passport.deserializeUser(function(obj, done) {
	  done(null, obj);
	});
	
	// Initialize strategies
	console.log(logKey + ': globbing: passport-strategies');
	config.getGlobbedFiles(path.join(__dirname, './strategies/**/*.js')).forEach(function(strategy) {
		console.log(logKey + ': globbed-strategy: ' + strategy);
		require(path.resolve(strategy))();
	});
	
};