function ConsumptionView(consumptionList, consumptionPriceSum) {

}

// Remove all consumption items from screen
ConsumptionView.prototype.removeAll = function() {
    $('#consumptionList').html('');
}

// Add consumption item (aggregated) to display list
ConsumptionView.prototype.addConsumption = function(aggregatedConsumption) {

    var html =
        '       <table width="100%">'
		+'			<tr>'
		+'				<td valign="center" width="10">'
		+'					<span class="drinkCount">'+aggregatedConsumption.drinkCount+'</span>'
		+'				</td>'
		+'				<td>'
		+'					<span class="drinkType">'+aggregatedConsumption.drinkType+'</span><br/>'
		+'					<span class="priceLabel">'+(aggregatedConsumption.price > 0 ? aggregatedConsumption.price : '')+'</span><br/>'
		+'				</td>'
		+'			</tr>'
		+'			<tr>'
		+'				<td colspan="2">'
		+'					<div class="manageConsumptionButtons" data-role="controlgroup" data-type="horizontal" data-mini="true">'
		+'						<a href="#" data-role="button" data-icon="plus" data-theme="b" onClick="consumptionController.saveConsumption(drinkController.getDrinkByType(\''+aggregatedConsumption.drinkType+'\'), venueController.getSelectedVenueName(), consumptionController.getDrinkPrice(\''+aggregatedConsumption.drinkType+'\'))">Increment</a>'
		+'						<a href="#" data-role="button" data-icon="delete" data-theme="b" onClick="consumptionController.decrementConsumption(drinkController.getDrinkByType(\''+aggregatedConsumption.drinkType+'\'), venueController.getSelectedVenueName())">Decrement</a>'
		+'						<a href="#" data-role="button" data-icon="grid" data-theme="b">More</a>'
		+'					</div>'
		+'				</td>'
		+'			</tr>'
		+'		</table>';

	$('#consumptionList').append(html);
    $('#listConsumption').trigger('pagecreate');
}

// Set total price label at the end of consumption item list
ConsumptionView.prototype.setTotalPrice = function(totalPrice) {
    $('#consumptionPriceSum').html(totalPrice);
}
