var app = angular.module("cncApp", ['ngRoute','ngAnimate']).
config(function($routeProvider){
        $routeProvider.when('/', {
            templateUrl : './home.html',
            controller : 'homeCtrl'
        }).when('/countries', {
            templateUrl : './countries.html',
            controller : 'countriesController',
            resolve: {
            	countries : function(geoNamesService){
                    return geoNamesService.get('countryInfo',{});
            	}
            }
        })
        .when('/countries/:countryCode/capital',{
            templateUrl : './countryDetail.html',
            controller: 'CountryDetailController',
            resolve: {
                countryInfo : function($route, geoNamesService) {
                    return geoNamesService.get('countryInfo',{country: $route.current.params.countryCode});
                },
                neighbours : function($route, geoNamesService) {
                    return geoNamesService.get('neighbours',{country: $route.current.params.countryCode});
                }
            }
        });

    }).
    controller("homeCtrl", function($scope){
    	$scope.title = "Countries and Capitals";
    }). 
	controller("countriesController", function($scope, countries){
	$scope.title = "Countries n Capitals";
	
	$scope.countries = countries.geonames;
	
}).controller('CountryDetailController', ['$scope','countryInfo','neighbours', function($scope,countryInfo, neighbours){
   $scope.country = countryInfo.geonames[0];
   $scope.neighbours = neighbours.geonames;
}])
    .service("geoNamesService", function($http, $q){
	return {

        get : function(path, params){

            var base_url = "http://api.geonames.org/";
            params = angular.extend({username: 'akmal_muqeeth', type: 'JSON'}, params || {})

            var defer = $q.defer();
            $http.get(base_url + path, {params : params, cache:true}).
            success(function(response){
                defer.resolve(response);
            });

            return defer.promise;
        }
	};
});

app.run(['$rootScope',function($rootScope){
    
    $rootScope.$on('$routeChangeStart', function(){
        $rootScope.isLoading =true;
        console.log("route change start");
    });

    $rootScope.$on('$routeChangeSuccess', function(){
        $rootScope.isLoading =false;
        console.log("route change success");
    });

}]);
