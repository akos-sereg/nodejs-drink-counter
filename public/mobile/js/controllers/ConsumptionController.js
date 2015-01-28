function ConsumptionController() {
    this.controls = [];
    this.popups = [];
}

// -----------------------------------------------------------------------------
// AJAX Calls
// -----------------------------------------------------------------------------

ConsumptionController.prototype.saveConsumption = function(user, drinkName, venueName, price) {

    var _drinkController = drinkController;

    var postData = "user=" + user
        + "&drinkName=" + drinkName
        + "&venueName=" + venueName
        + "&price="+price
        + "&insertedAt=01.01.2014";

    $.post('/api/consumptions', postData)
         .done(function( data ) {
            _drinkController.hideAddDrinkPopup();
        });
}