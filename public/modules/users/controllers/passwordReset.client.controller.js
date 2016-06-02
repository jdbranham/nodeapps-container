'use strict';


angular.module('users').controller('PasswordResetController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		var user = $scope.user = Authentication.user;

		$scope.resetPassword = function(){
			Authentication.resetPassword($scope.username).
			then(function(response){
				//success response
				console.log('success', response);
				$scope.successMessage = 'Your password has been reset and sent to your email';
			}).catch(function(errResponse){
				// failure response
				console.log('failure', errResponse);
				$scope.errorMessage = errResponse;
			});
		};
	}
]);