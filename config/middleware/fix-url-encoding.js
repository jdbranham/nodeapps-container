'use strict';

var S = require('string');

module.exports = function(req, res, next){
	var urlString = S(res.locals.url);

	/*	if(urlString.contains('/#!/login') || urlString.contains('/auth/')){
			return next();
		}*/
		if(urlString.contains('%23') || urlString.contains('%21')){
			var redirectUrl = urlString.replaceAll('%23', '#');
			return res.redirect(redirectUrl.replaceAll('%21', '!').s);
		}
		else {return next();}
};