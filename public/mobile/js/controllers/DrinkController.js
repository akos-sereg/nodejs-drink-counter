function DrinkController(popupName, ctrlDrinkList) {
    this.controls = [];
    this.popups = [];

    // Labels used by this component
    this.controls["drinkList"] = ctrlDrinkList;

    // Popup screens used by this component
    this.popups["addDrinkPopup"] = popupName;
}

// -----------------------------------------------------------------------------
// AJAX Calls
// -----------------------------------------------------------------------------

DrinkController.prototype.loadDrinkList = function() {
    var controller = this;

    this.removeDrinks();

    $.ajax({
        type : "GET",
        url : "/api/drinks"
    }).done(function(data) {

        for (var i=0; i!=data.length; i++) {
            controller.addDrink(data[i], i+1);
        }

    }).fail(function(jqXHR, textStatus) {

    });
}

// -----------------------------------------------------------------------------
// UI
// -----------------------------------------------------------------------------

DrinkController.prototype.getSelectedDrinkName = function() {
    return $('input[name=drink-choice]:checked', '#drinkSelection').val();
};

// Remove drinks from drink list list
DrinkController.prototype.removeDrinks = function() {
    $('#' + this.controls["drinkList"]).html('');
};

// Add Drink to drink list (model: drink.js)
DrinkController.prototype.addDrink = function(drink, index) {
    $('#' + this.controls["drinkList"]).append(
          '<input type="radio" name="drink-choice" id="radio-choice-'+index+'" value="'+drink.name+'" '+(index == 0 ? 'checked="checked"' : '')+'>'
        + '<label for="radio-choice-'+index+'">'+drink.name+' - '+ drink.type +'</label>');

    $("input[type='radio']").checkboxradio().checkboxradio("refresh");
};

// Show drink selector popup
DrinkController.prototype.showAddDrinkPopup = function() {
    $('#' + this.popups["addDrinkPopup"]).popup('open');
    this.loadDrinkList();
};

// Hide drink selector popup
DrinkController.prototype.hideAddDrinkPopup = function() {
    this.removeDrinks();
    $('#' + this.popups["addDrinkPopup"]).popup('close');
};
