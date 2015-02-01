require('../../config.js');
var async = require('async');                       // Async Module: used to wait until MongoDB Cleanup finished
var frisby = require('frisby');                     // For REST API testing
var Venue = require('../../app/models/venue');      // Venue - MongoDB Mapping

// Check if Venue Collection can be retrieved
frisby.create('Get Venues call returns proper model structure')
  .get('http://127.0.0.1:3000/api/venues')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSONTypes('0', {
      name: String,
      address: String
    })
  .afterJSON(function(venues) {
      expect(venues.length).toBeGreaterThan(0);
  })
.toss();


// Check if Venue can be stored in Venue Collection
var calls = [];

calls.push(function(callback) {
    Venue.remove( { name: 'JASMINE_TEST' }, function(err) { callback(null, 'Cleanup Completed'); } ).exec();
});

async.parallel(calls, function(err, result) {

    frisby.create('Save Drink')
      .post('http://127.0.0.1:3000/api/venues', {
          name: "JASMINE_TEST",
          address: "JASMINE_TEST Address"
      })
      .expectStatus(200)
      .expectHeaderContains('content-type', 'application/json')
      .expectJSON({
        isSuccessful: true
      })
      .after(function(){

          // Check if Drink exists
          frisby.create('Check if JASMINE_TEST venue is available after saving item')
            .get('http://127.0.0.1:3000/api/venues')
            .afterJSON(function(venues) {

                var testVenue = null;
                for (var i=0; i!=venues.length; i++) {
                    if (venues[i].name == 'JASMINE_TEST') {
                        testVenue = venues[i];
                        break;
                    }
                }

                expect(venues.length).toBeGreaterThan(0);       // We have venues definde in MongoDB already
                expect(testVenue != null).toMatch(true);        // We should be able to find JASMINE_TEST in Venue Collection
                expect(testVenue.address).toMatch('JASMINE_TEST Address');

                // Cleanup MongoDB
                Venue.remove( { name: 'JASMINE_TEST' } ).exec();
            })
          .toss();
      })
    .toss();

});

