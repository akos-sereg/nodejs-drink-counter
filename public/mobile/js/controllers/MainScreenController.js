function MainScreenController(ctrlVenueList) {
    this.controls = [];
    this.controls["venueList"] = ctrlVenueList;
}

// Loads Venue list from server
MainScreenController.prototype.loadVenueList = function() {
    var controller = this;
    
    $.ajax({
        type : "GET",
        url : "/api/venues"
    }).done(function(data) {
        controller.setVenueList(data);
    }).fail(function(jqXHR, textStatus) {
    });
};

// Populates Venue list on UI
// data: list of Venue objects (as defined in app/models/venue.js)
MainScreenController.prototype.setVenueList = function(data) {
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