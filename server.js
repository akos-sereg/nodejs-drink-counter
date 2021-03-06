require('./config.js')
var express     = require('express');
var path        = require('path');
var app         = express();
var bodyParser  = require('body-parser');
var Drink       = require('./app/models/drink');
var Venue       = require('./app/models/venue');
var Consumption = require('./app/models/consumption');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

var port = process.env.PORT || 3000;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();

router.use(function(req, res, next) {
    console.log(req.headers);
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'You can find the API at /api' });
});

// -------------------------------------------
// Register routes for Drinks handling
// -------------------------------------------
router.route('/drinks')

    .post(function(req, res) {

        var drink = new Drink();
        drink.name = req.body.name;
        drink.type = req.body.type;
        drink.insertedAt = req.body.insertedAt;

        drink.save(function(err) {
             if (err) {
                res.send(err);
            }

            res.json({ message: 'Drink created!', isSuccessful: true });
        });

    })

    .get(function(req, res) {
            Drink.find({}, {}, {sort: { type: 1}}, function(err, drinks) {
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
                drink.type = req.body.type;
                drink.insertedAt = req.body.insertedAt;

                drink.save(function(err) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'Drink updated!' });
                });

            });
        });

// -------------------------------------------
// Register routes for Venue handling
// -------------------------------------------
router.route('/venues')

    .post(function(req, res) {

        var venue = new Venue();
        venue.name = req.body.name;
        venue.address = req.body.address;

        venue.save(function(err) {
             if (err) {
                res.send(err);
            }

            res.json( { message: 'Venue created!', isSuccessful: true } );
        });

    })

    .get(function(req, res) {

            Venue.find({}, {}, {sort: { name: 1}}, function(err, venues) {
                if (err)
                    res.send(err);

                res.json(venues);
            });
        });

router.route('/venues/:venue_id')

    .get(function(req, res) {
        Venue.findById(req.params.venue_id, function(err, venue) {
            if (err)
                res.send(err);
            res.json(venue);
        });
    })

    .put(function(req, res) {

            Venue.findById(req.params.venue_id, function(err, venue) {

                if (err) {
                    res.send(err);
                }

                venue.name = req.body.name;
                venue.address = req.body.address;

                venue.save(function(err) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'Venue updated!' });
                });

            });
        });


// -------------------------------------------
// Register routes for Consumption handling
// -------------------------------------------
router.route('/consumptions')

    .post(function(req, res) {

        var consumption = new Consumption();
        consumption.user = req.body.user;
        consumption.drinkName = req.body.drinkName;
        consumption.drinkType = req.body.drinkType;
        consumption.venueName = req.body.venueName;
        consumption.price = req.body.price;
        consumption.insertedAt = req.body.insertedAt;

        consumption.save(function(err) {
             if (err) {
                res.send(err);
            }

            res.json( { message: 'Consumption created!', isSuccessful: true } );
        });

    })

    .get(function(req, res) {
            Consumption.find(function(err, consumptions) {
                if (err)
                    res.send(err);

                res.json(consumptions);
            });
        });

router.route('/consumptions/:consumption_id')

    .get(function(req, res) {
        Consumption.findById(req.params.consumption_id, function(err, consumption) {
            if (err)
                res.send(err);
            res.json(consumption);
        });
    })

    .put(function(req, res) {

            Consumption.findById(req.params.consumption_id, function(err, consumption) {

                if (err) {
                    res.send(err);
                }

                consumption.user = req.body.user;
                consumption.drinkName = req.body.drinkName;
                consumption.drinkType = req.body.drinkType;
                consumption.venueName = req.body.venueName;
                consumption.price = req.body.price;
                consumption.insertedAt = req.body.insertedAt;

                consumption.save(function(err) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'Consumption updated!' });
                });

            });
        });

// Get last 24 hours consumptions for user at venue
router.route('/consumptions/last24hours/:user/:venueName')

    .get(function(req, res) {

            var yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            Consumption.find({
                    user: req.params.user,
                    venueName: req.params.venueName,
                    insertedAt: { '$gte': yesterday }
            },
            function(err, consumptions) {
                if (err) {
                    res.send(err);
                }

                res.json(consumptions);
            });
        });

// Get last 12 hours consumptions for user at venue
router.route('/consumptions/last12hours/:user/:venueName')

    .get(function(req, res) {

            var yesterday = new Date();
            yesterday.setTime(yesterday.getTime() - 43200000);

            Consumption.find({
                    user: req.params.user,
                    venueName: req.params.venueName,
                    insertedAt: { '$gte': yesterday }
            },
            function(err, consumptions) {
                if (err) {
                    res.send(err);
                }

                res.json(consumptions);
            });
        });

// Decrement (remove last inserted consumption item)
router.route('/consumptions/remove-last/:user/:venueName/:drinkType')

    .get(function(req, res) {

            // Get recently inserted consumption item (drink type) at venue for user
            var query = Consumption.find({
                                     user: req.params.user,
                                     venueName: req.params.venueName,
                                     drinkType: req.params.drinkType
                                })
                                .sort( {'insertedAt': -1}).limit(1);
            query.exec(function(err, consumptions) {
                if (consumptions.length == 1) {

                    // Remove this one
                    Consumption.remove( { _id: consumptions[0]._id } ).exec();
                    res.json( { message: 'Removed successfully' } );
                }
                else {
                    res.json( { message: 'Not found' } );
                }
            });
        });

app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);