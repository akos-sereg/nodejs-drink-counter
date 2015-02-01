var request = require('request');

describe('Frontend',function(){
  it('Should display jQuery Mobile frontend app at /mobile', function(done) {
         request("http://localhost:3000/mobile", function(error, response, body){
           expect(!error && response.statusCode == 200);
           done();
         });
  });
});