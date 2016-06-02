'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	session = require('express-session'),
	config = app_require('config/config');

module.exports = function() {
	var logKey = 'local-strategy';
	
	console.log(logKey + ': adding local strategy to passport.');
	
	// Use local strategy
	passport.use('local-strategy', new LocalStrategy({
			usernameField: 'username',
			passwordField: 'password',
			passReqToCallback : true
		},
		function(req, username, password, done) {
			console.info(logKey + ': authenticating using local strategy');
			var err = null;
			
			if(username){
				var user = {
						username: username
				};
				
				return done(false, user);
			}
			else {
				err = logKey + ': username Not passed from passport. This should never happen.';
				console.error(err);
				return done(err);
			}
		}
	));
};