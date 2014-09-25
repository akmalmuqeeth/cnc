angular.module("cncApp", ['ngRoute']).
config(function($routeProvider){
        $routeProvider.when('/', {
            templateUrl : './home.html',
            controller : 'homeCtrl'
        }).when('/countries', {
            templateUrl : './countries.html',
            controller : 'countriesController',
            resolve: {
            	countries : function(countriesService){
            		var countries = [];
            		countriesService.countries().then(function(data){
            			angular.forEach(data.geonames, function(c){
            				countries.push(c);
            			});
            		});

            		return countries;
            	}
            }
        })
        .when('/countries/:countryCode/capital',{
            templateUrl : './countryDetail.html',
            controller: 'CountryDetailController'
        });

    }).
    controller("homeCtrl", function($scope){
    	$scope.title = "Countries and Capitals";
    }). 
	controller("countriesController", function($scope, countries){
	$scope.title = "Countries n Capitals";
	
	$scope.countries = countries;
	
}).controller('CountryDetailController', ['$scope','$routeParams', function($scope,$routeParams){
    $scope.countryCode = $routeParams.countryCode
}])
    .service("countriesService", function($http, $q){
	return {
		countries : function(){
			var params = {username: 'akmal_muqeeth', type: 'JSON'};
			return $http.get("http://api.geonames.org/countryInfo",{params: params}).
			then(function(response){
				return response.data;
				
			}, function(response){
				return $q.reject(response.data);
			});
		}
	};
});
