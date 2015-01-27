function DrinkController() {

}

DrinkController.prototype.loadDrinksAtVenue = function(venueName) {
    var controller = this;
    $.ajax({
        type : "GET",
        url : "/api/drinks"
    }).done(function(data) {

    }).fail(function(jqXHR, textStatus) {

    });
};