var expect = require('chai'),
    request = require('supertest');
// TODO: Remember to update this later
request = request('http://coderunners-146429.euw1-2.nitrousbox.com:8080//');

describe('When a user navigates to the page', function () {

    it("The page loads on the expected server", function (done) {
        request.get('/')
            .expect(200, done);
    });

     // This is generated by script so it DEFINITELY need a timeout
    it("The SVG script is loaded", function svgTest (done) {
        request.get('/')
            .expect(/<svg/);
            setTimeout(svgTest, 5000);
            done();
    });
	  
	  it("The title should be displayed", function (done) {
        request.get('/')
            .expect(/Cocaine price/, done);
    });
    
	  it("The retail tab will be displayed", function (done){
			 request.get('/')
		        .expect(/<button id="btn-retail">/,done)
			 });
	   
	it("The wholesale tab will be displayed", function (done){
			 request.get('/')
		        .expect(/<button id="btn-whole">/,done)
			 });
	
	/*it("the retail price should be displayed in red", function(done){
		  request.get('/')
	         .expect(//,done)
		 });
	it("the wholesale price should be displayed in red", function(done){
		  request.get('/')
	         .expect(//,done)
		});*/
});
