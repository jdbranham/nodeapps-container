/**
 * http://usejsdoc.org/
 */
var path = require('path');

global.app_resolve = function(name){
	return path.join(__dirname, name);
};

global.app_require = function(name) {
    return require(app_resolve(name));
};