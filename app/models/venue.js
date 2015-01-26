var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var VenueSchema   = new Schema({
    name: String,
    address: String
});

module.exports = mongoose.model('Venue', VenueSchema);
