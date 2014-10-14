describe("geoNamesService", function(){
	beforeEach(module('cncApp'));

	it('should query the back end when a resource is fetched ', function() {
		inject(function(geoNamesService, $rootScope, $httpBackend) {
		//Arrange- mock the http request
               $httpBackend.expect('GET', 'http://api.geonames.org/path?name=name&type=JSON&username=akmal_muqeeth').respond(200);
                       
               var status = false;
        	// Act
        	geoNamesService.get("path", {name: 'name'}).then(function(){
        		status = true;
        	});
        	$rootScope.$digest();
        	$httpBackend.flush();
        	// Assert
        	expect(status).toBe(true);
        	$httpBackend.verifyNoOutstandingRequest();
        });
	});
});