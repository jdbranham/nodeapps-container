'use strict';

angular.module('users').service('authInterceptor', ['$location', '$q', function($location, $q) {
    var service = this;

    service.responseError = function(response) {
        if (response.status === 401){
            $location.path('/login');
        }
        return $q.reject(response);
    };
}])
.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
}]);