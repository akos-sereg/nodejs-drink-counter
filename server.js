var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var Drink       = require('./app/models/drink');

var mongoose   = require('mongoose');
mongoose.connect('mongodb://akoss:dreher@127.0.0.1:27017/mydb'); // connect to our database

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();

router.use(function(req, res, next) {
    console.log('Request received: ' + req);
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'You can find the API at /api' });
});

router.route('/drinks')

    .post(function(req, res) {

        var drink = new Drink();
        drink.name = req.body.name;
        drink.place = req.body.place;
        drink.priceAtPlace = req.body.priceAtPlace;
        drink.pricePaid = req.body.pricePaid;
        drink.insertedAt = req.body.insertedAt;

        drink.save(function(err) {
             if (err) {
                res.send(err);
            }

            res.json({ message: 'Drink created!' });
        });

    })

    .get(function(req, res) {
            Drink.find(function(err, drinks) {
                if (err)
                    res.send(err);

                res.json(drinks);
            });
        });

router.route('/drinks/:drink_id')

    .get(function(req, res) {
        Drink.findById(req.params.drink_id, function(err, drink) {
            if (err)
                res.send(err);
            res.json(drink);
        });
    })

    .put(function(req, res) {

            Drink.findById(req.params.drink_id, function(err, drink) {

                if (err) {
                    res.send(err);
                }

                drink.name = req.body.name;
                drink.place = req.body.place;
                drink.priceAtPlace = req.body.priceAtPlace;
                drink.pricePaid = req.body.pricePaid;
                drink.insertedAt = req.body.insertedAt;

                drink.save(function(err) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'Drink updated!' });
                });

            });
        });

app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);