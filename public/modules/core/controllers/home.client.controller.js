'use strict';

angular.module('core').controller('HomeController', ['$scope', '$state', '$http', 'Authentication',
	function($scope, $state, $http, Authentication) {
		/*var url;
		var user = $scope.user = Authentication.user;
		if (!Authentication.isAuthenticated()){
			return $location.path('/login');
		}*/
	
		$scope.statusText = 'Do update or get status...';
		
		$scope.doUpdate = function() {
			$http({
				method : 'POST',
				url : 'update'
			}).then(function successCallback(response) {
				$scope.statusText = response.data;
			}, function errorCallback(response) {
				$scope.error = response.data;
			});
		};
		
		$scope.getStatus = function() {
			$http({
				method : 'POST',
				url : 'status'
			}).then(function successCallback(response) {
				$scope.statusText = response.data;
			}, function errorCallback(response) {
				$scope.error = response.data;
			});
		};
		
		$scope.clearLog = function() {
			$http({
				method : 'POST',
				url : 'clearLog'
			}).then(function successCallback(response) {
				$scope.statusText = response.data;
			}, function errorCallback(response) {
				$scope.error = response.data;
			});
		};
	}
]);