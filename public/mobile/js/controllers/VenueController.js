function VenueController(view) {
    this.view = view;
    this.selectedVenueName = null;
}

// Loads Venue list from server
VenueController.prototype.loadVenueList = function() {
    var _this = this;
    $.ajax({
        type : "GET",
        url : "/api/venues"
    }).done(function(data) {
        _this.view.setVenueList(data);
    }).fail(function(jqXHR, textStatus) {
    });
};

// Save Venue on server
VenueController.prototype.saveVenue = function(venueForm) {
    var _this = this;
    $.post('/api/venues', venueForm.serialize())
        .done(function( data ) {

            if (data.isSuccessful == true) {
                _this.loadVenueList();
                _this.view.showVenueAddedPopup();
            }
        });
};

// Get selected Venue Name
VenueController.prototype.getSelectedVenueName = function() {
    return this.selectedVenueName;
}

// When user picks a venue from list
VenueController.prototype.venueSelected = function(name) {

    this.selectedVenueName = name;
    consumptionController.refreshConsumptionList();

    this.view.setSelectedVenueName(name);
};
