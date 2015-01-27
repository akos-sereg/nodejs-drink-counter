var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ConsumptionSchema   = new Schema({
    user: String,
    drinkName: String,
    venueName: String,
    price: Number,
    insertedAt: Date          // format: "01.02.2012" for Jan 02, 2012
});

module.exports = mongoose.model('Consumption', ConsumptionSchema);
