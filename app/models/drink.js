var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DrinkSchema   = new Schema({
    name: String,
    place: String,
    priceAtPlace: Number,
    pricePaid: Number
});

module.exports = mongoose.model('Drink', DrinkSchema);
