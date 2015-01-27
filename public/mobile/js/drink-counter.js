function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var venueController = new VenueController("venueList", "venueName", "venueAddress", "venueAddedPopup", "selectedVenueName");
var drinkController = new DrinkController("addDrinkPopup", "drinkList");