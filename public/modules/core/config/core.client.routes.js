'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html',
			isPublic: true
		}).
		state('unauthorized', {
			url: '/unauthorized',
			templateUrl: 'modules/core/views/unauthorized.client.view.html',
			isPublic: true
		});
	}
]);