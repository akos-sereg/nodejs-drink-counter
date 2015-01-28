function ConsumptionController(consumptionList) {
    this.controls = [];
    this.popups = [];

    this.controls["consumptionList"] = consumptionList;
}

// -----------------------------------------------------------------------------
// AJAX Calls
// -----------------------------------------------------------------------------

ConsumptionController.prototype.saveConsumption = function(user, drinkName, venueName, price) {

    var _drinkController = drinkController;
    var _consumptionController = this;

    var postData = "user=" + user
        + "&drinkName=" + drinkName
        + "&venueName=" + venueName
        + "&price="+price
        + "&insertedAt=01.01.2014";

    $.post('/api/consumptions', postData)
         .done(function( data ) {
            _drinkController.hideAddDrinkPopup();
            _consumptionController.refreshConsumptionList();
        });
}

ConsumptionController.prototype.refreshConsumptionList = function() {
    var controller = this;
    $.ajax({
        type : "GET",
        url : "/api/consumptions"
    }).done(function(data) {

        controller.removeAll();

        for (var i=0; i!=data.length; i++) {
            data[i].drinkCount = 2;
            controller.addConsumption(data[i]);
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
		+'					<span class="drinkName">'+aggregatedConsumption.drinkName+'</span>'
		+'				</td>'
		+'			</tr>'
		+'			<tr>'
		+'				<td>'
		+'					<div class="manageConsumptionButtons" data-role="controlgroup" data-type="horizontal" data-mini="true">'
		+'						<a href="#" data-role="button" data-icon="plus" data-theme="b">Increment</a>'
		+'						<a href="#" data-role="button" data-icon="delete" data-theme="b">Decrement</a>'
		+'						<a href="#" data-role="button" data-icon="grid" data-theme="b">More</a>'
		+'					</div>'
		+'				</td>'
		+'			</tr>'
		+'		</table>';

	$('#' + this.controls["consumptionList"]).append(html);

    $('#listConsumption').trigger('pagecreate');
}