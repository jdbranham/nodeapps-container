'use strict';


angular.module('users').controller('LoginController', ['$scope', '$rootScope', '$state', 'Authentication',
	function($scope, $rootScope, $state, Authentication) {
		var user = $scope.user = Authentication.user;
		
		if(Authentication.isAuthenticated()){
			if($rootScope.returnToState && ($rootScope.returnToState !== $state.current)) {
				$state.go($rootScope.returnToState, $rootScope.returnToStateParams);
			} else {
				$state.go('home');
			}
		}
		
		$scope.login = function(){
			Authentication.authenticate($scope.username, 
				$scope.password,
				function(errResponse){
					// failure response
					console.log('failure', errResponse);
					$scope.errorMessage = errResponse.data.message;
			});
		};
		
		$scope.resetPassword = function(){
			Authentication.resetPassword($scope.username).
			then(function(response){
				//success response
				console.log('success', response);
				$scope.successMessage = response.data;
			}, function(errResponse){
				// failure response
				console.log('failure', errResponse);
				$scope.errorMessage = errResponse;
			});
		};
	}
]);