describe("cncApp", function() {
    beforeEach(module("cncApp"));

    describe("/countries route", function() {
        it('should load the template, controller and call the resolve', 
        inject(function($location, $rootScope, $httpBackend, $route) {

            $httpBackend.whenGET('./countries.html').respond('...');
            $httpBackend.expect('GET', 'http://api.geonames.org/countryInfo?type=JSON&username=akmal_muqeeth').respond(200);

            $location.path('/countries');
            $httpBackend.flush();

            expect($route.current.controller).toBe("countriesController");
            expect($route.current.loadedTemplateUrl).toBe("./countries.html");

            $httpBackend.verifyNoOutstandingRequest();
            $httpBackend.verifyNoOutstandingExpectation();
        }));
    });
});