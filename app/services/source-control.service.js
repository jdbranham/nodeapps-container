'use strict';


var exec = require('child_process').exec,
	fs = require('fs'),
	path = require('path'),
	when = require('when'),
	S = require('string'),
	util = require('util'),
	config = app_require('config/config'),
	childProcs = {},
	bufferedResponse = new Buffer('', 'utf-8');

var log = function(msg){
	console.log(msg);
};
var getApps = function(){
	return config.sourceControl.apps;
};

var isAppCheckedOut = function(app){
	console.log(app);
	var promise = when.promise(function(resolve, reject){
		fs.stat(app_resolve(app.path), function(err, stats){
			if(err){
				reject(app);
			} else if(stats.isDirectory()){
				resolve(app);
			} else {
				reject(new Error('Unknown Error'));
			}
		});
	});
	return promise;
};

var createChildProcess = function(command, app){
	if(childProcs[app.path]){
		return;
	}
	log('Creating child process using command: ' + command);
	var child = exec(command);
	child.stdout.on('data', function(data) {
	    bufferedResponse.write(data, 'utf-8');
	});
	child.stderr.on('data', function(data) {
	    bufferedResponse.write(data, 'utf-8');
	});
	child.on('close', function(code) {
	    bufferedResponse.write('Exiting child process: ' + code, 'utf-8');
	    delete childProcs[app.path];
	});
	childProcs[app.path] = {app: app, process: child};
};

var handleAppCheckedOut = function(app){
	var command = S(config.sourceControl.commands.update).template({path: app.path}).s;
	createChildProcess(command, app);
};

var handleAppNotCheckedOut = function(app){
	var command = S(config.sourceControl.commands.checkout).template({path: app.path, url: app.scmUrl}).s;
	createChildProcess(command, app);
};

module.exports = {
		update: function(){
			log('using configuration: ');
			log(config.sourceControl);
			var promise = when.promise(function(resolve, reject) {
				var apps = getApps();
				if(apps.length === 0){
					reject(new Error('There are no apps configured.'));
				} else {
					log(apps);
					for (var index = 0; index<apps.length; index++){
						var app = apps[index];
						isAppCheckedOut(app).then(handleAppCheckedOut, handleAppNotCheckedOut);
					}
				    resolve(bufferedResponse);
				}
			});
			return promise;
		},
		status: function(){
			var promise = when.promise(function(resolve, reject){
				var statusText = 'Configuration: \n' + 
					util.inspect(config.sourceControl) + '\n' + 
					'Processing: ' + '\n' +
					util.inspect(childProcs) + '\n' +
					bufferedResponse.toString();
				resolve(statusText);
			});
			return promise;
		},
		clearLog: function(){
			var promise = when.promise(function(resolve, reject){
				bufferedResponse.slice(0, bufferedResponse.length);
				resolve(bufferedResponse);
			});
			return promise;
		}
};