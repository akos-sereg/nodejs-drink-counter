var mongoose   = require('mongoose');
var frisby = require('frisby');
var Drink = require('../../app/models/drink');

// Connect to MongoDB, so that we can do DB Cleanup later
mongoose.connect('mongodb://akoss:dreher@127.0.0.1:27017/mydb');

// ------------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------------
frisby.create('Get Drinks call returns proper model structure')
  .get('http://127.0.0.1:3000/api/drinks')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSONTypes('0', {
      name: String,
      type: String
    })
.toss();

Drink.remove( { type: 'JASMINE_TEST' } ).exec();
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

            var jasmineTestDrinkFound = false;
            for (var i=0; i!=drinks.length; i++) {
                if (drinks[i].type == 'JASMINE_TEST') {
                    jasmineTestDrinkFound = true;
                    break;
                }
            }

            expect(jasmineTestDrinkFound).toMatch(true);

            // Cleanup MongoDB
            Drink.remove( { type: 'JASMINE_TEST' } ).exec();
        })
      .toss();
  })
.toss();