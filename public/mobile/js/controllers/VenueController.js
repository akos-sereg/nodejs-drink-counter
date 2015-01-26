function VenueController(ctrlVenueList, ctrlVenueName, ctrlVenueAddress) {
    this.controls = [];
    this.controls["venueList"] = ctrlVenueList;
    this.controls["venueName"] = ctrlVenueName;
    this.controls["venueAddress"] = ctrlVenueAddress;
}

// -----------------------------------------------------------------------------
// AJAX Calls
// -----------------------------------------------------------------------------

// Loads Venue list from server
VenueController.prototype.loadVenueList = function() {
    var controller = this;
    $.ajax({
        type : "GET",
        url : "/api/venues"
    }).done(function(data) {
        controller.setVenueList(data);
    }).fail(function(jqXHR, textStatus) {
    });
};

// -----------------------------------------------------------------------------
// Screen Refreshing methods
// -----------------------------------------------------------------------------

// Populates Venue list on UI
// data: list of Venue objects (as defined in app/models/venue.js)
VenueController.prototype.setVenueList = function(data) {
    var html = '';

    if (data != null) {
        for (var i=0; i!=data.length; i++)
        {
            html += '<li>' + data[i].name + ' - ' + data[i].address + '</li>';
        }
    }

    $('#'+this.controls["venueList"]).html(html);
    $('#'+this.controls["venueList"]).trigger('create');
    $('#'+this.controls["venueList"]).listview('refresh');
};

// Refresh "Add/Update Venue" screen
VenueController.prototype.resetScreen = function() {

    $('#'+this.controls["venueName"]).val('');
    $('#'+this.controls["venueAddress"]).val('');
};