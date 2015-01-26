var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DrinkSchema   = new Schema({
    name: String,
    place: String,
    priceAtPlace: Number,
    pricePaid: Number,
    insertedAt: Date          // format: "01.02.2012" for Jan 02, 2012
});

module.exports = mongoose.model('Drink', DrinkSchema);
