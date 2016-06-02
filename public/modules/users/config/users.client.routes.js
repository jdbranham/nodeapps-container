'use strict';

// Setting up route
angular.module('users').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		// login state routing
		$stateProvider.
		state('login', {
			url: '/login',
			templateUrl: 'modules/users/views/login.client.view.html',
			isPublic: true
		});
		
		$stateProvider.
		state('resetPassword', {
			url: '/resetPassword',
			templateUrl: 'modules/users/views/passwordReset.client.view.html',
			isPublic: true
		});
		
		$stateProvider.
		state('changePassword', {
			url: '/changePassword',
			templateUrl: 'modules/users/views/passwordChange.client.view.html',
			isPublic: true
		});

		// logout state routing
		$stateProvider.
		state('logout', {
			url: '/logout',
			templateUrl: 'modules/users/views/logout.client.view.html'
		});
	}
]);