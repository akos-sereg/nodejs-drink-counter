var frisby = require('frisby');

frisby.create('Get Drinks call returns proper model structure')
  .get('http://127.0.0.1:3000/api/drinks')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSONTypes('0', {
      name: String,
      type: String
    })
.toss();