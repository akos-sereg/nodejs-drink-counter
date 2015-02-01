var mongoose   = require('mongoose');               // For MongoDB Cleanup
var async = require('async');                       // Async Module: used to wait until MongoDB Cleanup finished
var frisby = require('frisby');                     // For REST API testing
var Drink = require('../../app/models/drink');      // Drink - MongoDB Mapping

// Connect to MongoDB, so that we can do DB Cleanup later
if (mongoose.connection.readyState == 0) {
    mongoose.connect('mongodb://akoss:dreher@127.0.0.1:27017/mydb');
}

// Check if Drink Collection can be retrieved
frisby.create('Get Drinks call returns proper model structure')
  .get('http://127.0.0.1:3000/api/drinks')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSONTypes('0', {
      name: String,
      type: String
  })
  .afterJSON(function(drinks) {
    expect(drinks.length).toBeGreaterThan(0);
  })
.toss();

// Check if Drink can be stored in Drink Collection
var calls = [];

calls.push(function(callback) {
    Drink.remove( { type: 'JASMINE_TEST' }, function(err) { callback(null, 'Cleanup Completed'); } ).exec();
});

async.parallel(calls, function(err, result) {

    frisby.create('Save Drink')
      .post('http://127.0.0.1:3000/api/drinks', {
          name: "Beer",
          type: "JASMINE_TEST",
          insertedAt: new Date()
      })
      .expectStatus(200)
      .expectHeaderContains('content-type', 'application/json')
      .expectJSON({
        isSuccessful: true
      })
      .after(function(){

          // Check if Drink exists
          frisby.create('Check if JASMINE_TEST drink is available after saving item')
            .get('http://127.0.0.1:3000/api/drinks')
            .afterJSON(function(drinks) {

                var testDrink = null;
                for (var i=0; i!=drinks.length; i++) {
                    if (drinks[i].type == 'JASMINE_TEST') {
                        testDrink = drinks[i];
                        break;
                    }
                }

                expect(drinks.length).toBeGreaterThan(0);       // We have drinks definde in MongoDB already
                expect(testDrink != null).toMatch(true);        // We should be able to find JASMINE_TEST in Drink Collection
                expect(testDrink.name).toMatch('Beer');

                // Cleanup MongoDB
                Drink.remove( { type: 'JASMINE_TEST' } ).exec();
            })
          .toss();
      })
    .toss();

});

