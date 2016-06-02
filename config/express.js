'use strict';

/**
 * Module dependencies.
 */
var fs = require('fs'),
	http = require('http'),
	express = require('express'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	compress = require('compression'),
	methodOverride = require('method-override'),
	morgan = require('morgan'),
	cookieParser = require('cookie-parser'),
	flash = require('connect-flash'),
	config = require('./config'),
	consolidate = require('consolidate'),
	path = require('path'),
	passport = require('passport'),
	fixUrlEncoding = require('./middleware/fix-url-encoding'),
	setLocals = require('./middleware/set-locals'),
	responseInterceptor = require('./middleware/response-interceptor');

function log(msg){
	console.log('[config_express] ' + msg);
}

module.exports = function() {
	var userid = '';
	// Initialize express app
	var app = express();


	// Setting application local variables
	app.locals.title = config.app.title;
	app.locals.description = config.app.description;
	app.locals.keywords = config.app.keywords;
	app.locals.jsFiles = config.getJavaScriptAssets();
	app.locals.cssFiles = config.getCSSAssets();


	// Passing the request url to environment locals
	log(': using: setLocals');
	app.use(setLocals);
	
	// prepare reponse interceptor before routing
	app.use(responseInterceptor);
	
	// Fix the url encoding 
	log(': using: fixUrlEncoding');
	app.use(fixUrlEncoding);

	// Should be placed before express.static
	log(': using: compress');
	app.use(compress({
		filter: function(req, res) {
			return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
		},
		level: 9
	}));
	
	// Setting the app router and static folders
	// Place before session configuration to avoid session information being deserialized on static files
	var oneDay = 86400000;
	log(': using: static');
	app.use('/', express.static(path.resolve('./public'), { maxAge: oneDay }));

	// Showing stack errors
	log(': setting: showStackError: true');
	app.set('showStackError', true);

	// Set swig as the template engine
	app.engine('server.view.html', consolidate[config.templateEngine]);

	// Set views path and view engine
	log(': setting: view engine');
	app.set('view engine', 'server.view.html');
	log(': setting: views');
	app.set('views', path.join(__dirname, '../app/views'));

	// Environment dependent middleware
	if (process.env.NODE_ENV !== 'production') {
		// Disable views cache
		app.set('view cache', false);

	} else {
		app.locals.cache = 'memory';
	}
	


	// Request body parsing middleware should be above methodOverride
	log(': using: bodyParser');
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());
	

	// CookieParser should be above session
	log(': using: cookieParser');
	app.use(cookieParser());
	

	// Session storage
	log(': using: session');
	app.use(session({
		saveUninitialized: true,
		resave: false,
		rolling: true,
		secret: config.sessionSecret,
		//store: new SequelizeStore({db: db}),
		proxy: true // if you do SSL outside of node.
	}));
	
	// use passport session
	log(': using: passport');
	app.use(passport.initialize());
	app.use(passport.session());


	// connect flash for flash messages
	log(': using: flash');
	app.use(flash());

	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));

	}

	// Globbing routing files
	log(': globbing: routes');
	config.getGlobbedFiles(path.join(__dirname, '../app/routes/**/*.js')).forEach(function(routePath) {
		log({foundRouteFile: routePath});
		require(path.resolve(routePath))(app);
	});

	// Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
	app.use(function(err, req, res, next) {
		// If the error object doesn't exists
		if (!err) {return next();}

		// Log it
		console.error(err.stack);

		if (process.env.NODE_ENV !== 'production'){
			// Just send the stack back if we are in development mode
			res.status(500).send(err.stack);
		} else{
			// Nice Error page
			res.status(500).render('500', {
				error: err.stack
			});
		}

	});

	// Assume 404 since no middleware responded
	app.use(function(req, res) {
		log({urlNotFound: req.originalUrl});
		res.status(404).send({
			url: req.originalUrl,
			error: 'Not Found'
		});
	});

	// Return Express server instance
	return app;
};