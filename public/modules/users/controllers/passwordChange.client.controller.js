'use strict';


angular.module('users').controller('PasswordChangeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		var user = $scope.user = Authentication.user;

		$scope.changePassword = function(){
			Authentication.changePassword($scope.username, $scope.currentPassword, $scope.newPassword).
			then(function(response){
				//success response
				console.log('success', response);
				$scope.successMessage = 'Your password has been changed';
			}).catch(function(errResponse){
				// failure response
				console.log('failure', errResponse);
				$scope.errorMessage = errResponse;
			});
		};
	}
]);