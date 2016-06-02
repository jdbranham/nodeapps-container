'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', ['$rootScope', '$location', '$state', '$stateParams', '$http', '$cookies',
	function($rootScope, $location, $state, $stateParams, $http, $cookies) {
		var _this = this;

		_this._data = {
			user: window.user,
			authType: window.authType,
			removeUserObject: function(){
				_this._data.user = {};
			},
			authenticate: function(username, password, failure){
				var config = {
					method: 'POST',
					url: 'auth/signin',
					data: {'username': username, 'password': password},
					headers: {'Content-Type': 'application/json'}
				};
				$http(config).then(
					function(successResponse){
						_this._data.user = successResponse.data;
						console.log('success', successResponse);
						if($rootScope.returnToState && ($rootScope.returnToState !== $state.current)){
							$state.go($rootScope.returnToState, $rootScope.returnToStateParams);
						} else {
							var redirectUrl = $cookies.get('redirectUrl');
							delete $cookies.redirectUrl;
							window.location = redirectUrl || successResponse.data.redirectUrl || '/';
						}
					}, function(errResponse){
						return failure(errResponse);
					});
			},
			resetPassword: function(username){
				var config = {
						method: 'POST',
						url: 'auth/resetPassword',
						data: {'username': username },
						headers: {'Content-Type': 'application/json'}
					};
				return $http(config);
			},
			changePassword: function(username, currentPassword, newPassword){
				var config = {
						method: 'POST',
						url: 'auth/changePassword',
						data: {'username': username, 'currentPassword': currentPassword, 'newPassword': newPassword },
						headers: {'Content-Type': 'application/json'}
					};
				return $http(config);
			},
			isAuthenticated: function(){
				if(_this._data.user && _this._data.user.isAuthenticated) {return true;}
				return false;
			}
		};
	
		
		// listen for state changes
		// Redirect to login if you're not logged in
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        	if(toState.isPublic){
        		return;
        	} else if(!_this._data.isAuthenticated() && !toState.isPublic) {
                  $rootScope.returnToState = toState;
                  $rootScope.returnToStateParams = toParams;
                  $state.go('login');
                  event.preventDefault();
              }
        });
        
        // add previous state property
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $state.fromState = fromState;
            $state.fromParams = fromParams;
        });

		return _this._data;
	}
]);