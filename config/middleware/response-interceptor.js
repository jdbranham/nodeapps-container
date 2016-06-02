'use strict';
var instrument = require('node-instrument')(),
	S = require('string'),
	config = require('../config');

function log(msg){
	if(config.logging.reponseInterceptor){
		console.log('[response interceptor] ' + msg);
	}
}


 
/* Calculate the time in ms that it took to handle this request */
function recordResponseTime(req, res, next) {
    var elapsedTime = Date.now() - res.locals.startTime;
    if(req.route){
    	var cleanedPath = S(req.route.path).replaceAll('/', '.')// replace slashed with dots for correct graphite organization
    		.replaceAll(' ', '') // no spaces
    		.replaceAll('..', '.') // no empty nodes
    		.ensureRight('.') // make sure there is a dot before the metric name
    		.ensureLeft('route.root');

        log('cleaned path: ' + cleanedPath);
        
        instrument.add(cleanedPath + 'invocation_count', 1); // increment the count metric
        instrument.add(cleanedPath + 'status_' + res.statusCode + '_count', 1); // increment the count metric
        instrument.add(cleanedPath + 'invocation_time', elapsedTime); // increment the elapsed time so we can get an average in graphite
    }
    return next && next();
}

function intercept(req, res, next){
	log('using ResponseInterceptor');
	res.on('finish', function(){
		// do not pass the 'next' parameter of 'intercept' as the callback in the event handlers
		recordResponseTime(req, res);
	});
	return next && next();
}

module.exports = intercept;