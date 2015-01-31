function VenueController(ctrlVenueList, ctrlVenueName, ctrlVenueAddress, popupVenueAdded, ctrlSelectedVenueName) {
    this.controls = [];
    this.popups = [];

    // Labels used by this component
    this.controls["venueList"] = ctrlVenueList;
    this.controls["venueName"] = ctrlVenueName;
    this.controls["venueAddress"] = ctrlVenueAddress;
    this.controls["selectedVenueName"] = ctrlSelectedVenueName;

    // Popup screens used by this component
    this.popups["venueAddedPopup"] = popupVenueAdded;

    this.selectedVenueName = null;
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

// Save Venue on server
VenueController.prototype.saveVenue = function(venueForm) {
    var controller = this;
    $.post('/api/venues', venueForm.serialize())
        .done(function( data ) {

            if (data.isSuccessful == true) {
                controller.loadVenueList();
                $('#' + controller.popups["venueAddedPopup"]).popup('open');
            }
        });
};

// -----------------------------------------------------------------------------
// Controller State
// -----------------------------------------------------------------------------

VenueController.prototype.getSelectedVenueName = function() {
    return this.selectedVenueName;
}

// -----------------------------------------------------------------------------
// Screen related methods
// -----------------------------------------------------------------------------

// Populates Venue list on UI
// data: list of Venue objects (as defined in app/models/venue.js)
VenueController.prototype.setVenueList = function(data) {
    var html = '';

    if (data != null) {
        for (var i=0; i!=data.length; i++)
        {
            html += '<li><a href="#listConsumption" onClick="venueController.venueSelected(\'' + data[i].name + '\');">'
                + data[i].name + ' - ' + data[i].address + '</a></li>';
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

// When user picks a venue from list
VenueController.prototype.venueSelected = function(name) {

    this.selectedVenueName = name;
    $('#'+this.controls["selectedVenueName"]).html(name);
    consumptionController.refreshConsumptionList();

};