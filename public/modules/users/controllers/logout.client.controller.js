'use strict';


angular.module('users').controller('LogoutController', ['$scope', '$cookies', '$location', 'Authentication', 
	function($scope, $cookies, $location, Authentication) {
		//$scope.allCookies = $cookies.getAll();
		$scope.logout = function(){
			console.log('Invalidating SMSESSION cookie');
			$cookies.put('SMSESSION', 'bogus', {
				domain: '.sprint.com',
				path: '/',
				expires: new Date(1970, 1, 1)
			});
			Authentication.removeUserObject();
			$location.path('/login');
		};
		//logout();
	}
]);