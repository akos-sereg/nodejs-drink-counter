function ConsumptionController(consumptionList, noDrinkSelected) {
    this.controls = [];
    this.popups = [];

    this.controls["consumptionList"] = consumptionList;
    this.popups["noDrinkSelected"] = noDrinkSelected;
}

// -----------------------------------------------------------------------------
// AJAX Calls
// -----------------------------------------------------------------------------

// Increment consumption items
ConsumptionController.prototype.saveConsumption = function(user, drink, venueName, price) {

    var _drinkController = drinkController;
    var _consumptionController = this;

    if (drink == null) {
        return;
    }

    var postData = "user=" + user
        + "&drinkName=" + drink.name
        + "&drinkType=" + drink.type
        + "&venueName=" + venueName
        + "&price="+price
        + "&insertedAt="+new Date();

    $.post('/api/consumptions', postData)
         .done(function( data ) {
            _drinkController.hideAddDrinkPopup();
            _consumptionController.refreshConsumptionList();
        });
}

// Decrement consumption items
ConsumptionController.prototype.decrementConsumption = function(user, drink, venueName) {

    var controller = this;

    $.ajax({
        type : "GET",
        url : "/api/consumptions/remove-last/akoss/" + venueName + "/" + drink.type
    }).done(function(data) {

        controller.refreshConsumptionList();

    }).fail(function(jqXHR, textStatus) {
    });
}

ConsumptionController.prototype.refreshConsumptionList = function() {

    var controller = this;

    $.ajax({
        type : "GET",
        url : "/api/consumptions/last24hours/akoss/" + venueController.getSelectedVenueName()
    }).done(function(data) {

        controller.removeAll();

        // Aggregate consumption items
        var aggregatedConsumption = [];
        for (var i=0; i!=data.length; i++) {

            if (aggregatedConsumption[data[i].drinkType] == undefined) {
                aggregatedConsumption[data[i].drinkType] = data[i];
                aggregatedConsumption[data[i].drinkType].drinkCount = 1;
            }
            else {
                aggregatedConsumption[data[i].drinkType].drinkCount++;
            }
        }

        // Display consumption items
        for (var key in aggregatedConsumption) {
            controller.addConsumption(aggregatedConsumption[key]);
        }

    }).fail(function(jqXHR, textStatus) {
    });
}

// -----------------------------------------------------------------------------
// UI
// -----------------------------------------------------------------------------

ConsumptionController.prototype.removeAll = function() {
    $('#' + this.controls["consumptionList"]).html('');
}

ConsumptionController.prototype.addConsumption = function(aggregatedConsumption) {

    var html =
        '       <table width="100%">'
		+'			<tr>'
		+'				<td valign="center">'
		+'					<span class="drinkCount">'+aggregatedConsumption.drinkCount+'</span>'
		+'					<span class="drinkType">'+aggregatedConsumption.drinkType+'</span>'
		+'				</td>'
		+'			</tr>'
		+'			<tr>'
		+'				<td>'
		+'					<div class="manageConsumptionButtons" data-role="controlgroup" data-type="horizontal" data-mini="true">'
		+'						<a href="#" data-role="button" data-icon="plus" data-theme="b" onClick="consumptionController.saveConsumption(\'akoss\', drinkController.getDrinkByType(\''+aggregatedConsumption.drinkType+'\'), venueController.getSelectedVenueName(), 0)">Increment</a>'
		+'						<a href="#" data-role="button" data-icon="delete" data-theme="b" onClick="consumptionController.decrementConsumption(\'akoss\', drinkController.getDrinkByType(\''+aggregatedConsumption.drinkType+'\'), venueController.getSelectedVenueName())">Decrement</a>'
		+'						<a href="#" data-role="button" data-icon="grid" data-theme="b">More</a>'
		+'					</div>'
		+'				</td>'
		+'			</tr>'
		+'		</table>';

	$('#' + this.controls["consumptionList"]).append(html);

    $('#listConsumption').trigger('pagecreate');
}