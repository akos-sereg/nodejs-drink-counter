var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DrinkSchema   = new Schema({
    name: String,
    type: String,
    insertedAt: Date          // format: "01.02.2012" for Jan 02, 2012
});

module.exports = mongoose.model('Drink', DrinkSchema);
