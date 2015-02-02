function ConsumptionController(view) {
    this.view = view;

    // Consumption list of current user at current venue
    this.consumptions = [];
}

// Increment consumption items
ConsumptionController.prototype.saveConsumption = function(drink, venueName, price) {

    var _drinkController = drinkController;
    var _consumptionController = this;

    if (drink == null) {
        return;
    }

    var postData = "user=" + username
        + "&drinkName=" + drink.name
        + "&drinkType=" + drink.type
        + "&venueName=" + venueName
        + "&price="+price
        + "&insertedAt="+new Date().toGMTString();

    $.post('/api/consumptions', postData)
         .done(function( data ) {
            _drinkController.view.hideAddDrinkPopup();
            _consumptionController.refreshConsumptionList();
        });
}

// Decrement selected consumption items
ConsumptionController.prototype.decrementConsumption = function(drink, venueName) {

    var controller = this;

    $.ajax({
        type : "GET",
        url : "/api/consumptions/remove-last/"+username+"/" + venueName + "/" + drink.type
    }).done(function(data) {

        controller.refreshConsumptionList();

    }).fail(function(jqXHR, textStatus) {
    });
}

// Refresh consumption list for user and venue (last 24 hours) - Populates UI as well
ConsumptionController.prototype.refreshConsumptionList = function() {

    var _this = this;

    $.ajax({
        type : "GET",
        url : "/api/consumptions/last12hours/"+username+"/" + venueController.getSelectedVenueName()
    }).done(function(data) {

        _this.consumptions = data;
        _this.view.removeAll();

        // Aggregate consumption items
        var aggregatedConsumption = [];

        var agesBefore = new Date();
        agesBefore.setDate(agesBefore.getDate() - (365 * 10));
        var lastItemAddedTime = agesBefore.getTime();

        for (var i=0; i!=data.length; i++) {

            if (aggregatedConsumption[data[i].drinkType] == undefined) {
                aggregatedConsumption[data[i].drinkType] = data[i];
                aggregatedConsumption[data[i].drinkType].drinkCount = 1;
            }
            else {
                aggregatedConsumption[data[i].drinkType].drinkCount++;

                // Find price of one consumption item (will be aggregated - summed - later)
                if (aggregatedConsumption[data[i].drinkType].price == 0 && data[i].price > 0) {
                    aggregatedConsumption[data[i].drinkType].price = data[i].price;
                }
            }

            // Find most recently added Consumption item
            if (Date.parse(data[i].insertedAt) > lastItemAddedTime) {
                lastItemAddedTime = Date.parse(data[i].insertedAt);
            }
        }

        // Display consumption items
        var total = 0;
        for (var key in aggregatedConsumption) {
            aggregatedConsumption[key].price = aggregatedConsumption[key].drinkCount * aggregatedConsumption[key].price;
            _this.view.addConsumption(aggregatedConsumption[key]);

            total += aggregatedConsumption[key].price;
        }

        // Make sure that we do not display '10 years ago' message by mistake
        if (agesBefore.getTime() == lastItemAddedTime) {
            lastItemAddedTime = null;
        }

        _this.view.setTotalPrice(total);
        _this.view.setLastItemAddedTime(lastItemAddedTime == null ? null : new Date().getTime() - lastItemAddedTime);

    }).fail(function(jqXHR, textStatus) {
    });
}

// Finds consumption price of provided drinkType if exists in loaded consumption list
// This is useful when user is "Incrementing" a consumption item, as price can be "guessed" based on previously
// added values.
ConsumptionController.prototype.getDrinkPrice = function(drinkType) {
    if (this.consumptions == null) {
        return 0;
    }

    for (var i=0; i!=this.consumptions.length; i++) {
        if (this.consumptions[i].drinkType == drinkType && this.consumptions[i].price > 0) {
            return this.consumptions[i].price;
        }
    }

    return 0;
}
