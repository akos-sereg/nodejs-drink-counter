function VenueView() {
}

// Populates Venue list on UI
// data: list of Venue objects (as defined in app/models/venue.js)
VenueView.prototype.setVenueList = function(data) {
    var html = '';

    if (data != null) {
        for (var i=0; i!=data.length; i++)
        {
            html += '<li><a href="#listConsumption" onClick="venueController.venueSelected(\'' + data[i].name + '\');">'
                + data[i].name + '<span style="color: #777777;"> - ' + data[i].address + '</span></a></li>';
        }
    }

    $('#venueList').html(html);
    $('#venueList').trigger('create');
    $('#venueList').listview('refresh');
};

// Refresh "Add/Update Venue" screen
VenueView.prototype.resetScreen = function() {
    $('#venueName').val('');
    $('#venueAddress').val('');
};

// Set "Selected Venue" label at the top of the screen
VenueView.prototype.setSelectedVenueName = function(name) {
    $('#selectedVenueName').html(name);
}

// Show "Venue Added" message
VenueView.prototype.showVenueAddedPopup = function() {
    $('#venueAddedPopup').popup('open');
};
