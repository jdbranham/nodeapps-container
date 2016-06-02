'use strict';

angular.module('core').filter('utc', [
	function() {
		return function(date) {
			return new moment(date).utc().format('YYYY-MM-DD');
		};
	}
]);