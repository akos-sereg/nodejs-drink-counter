function DrinkController(popupName, ctrlDrinkList, drinkAddedPopup, drinkExistsPopup) {
    this.controls = [];
    this.popups = [];

    // Labels used by this component
    this.controls["drinkList"] = ctrlDrinkList;

    // Popup screens used by this component
    this.popups["addDrinkPopup"] = popupName;
    this.popups["drinkAddedPopup"] = drinkAddedPopup;
    this.popups["drinkExistsPopup"] = drinkExistsPopup;

    this.drinks = [];

    // Initialize
    this.loadDrinkList();
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

        controller.drinks = data;

        for (var i=0; i!=data.length; i++) {
            controller.addDrink(data[i], i+1);
        }

    }).fail(function(jqXHR, textStatus) {

    });
}

DrinkController.prototype.saveDrink = function(drinkForm) {

    var controller = this;
    var serializedData = drinkForm.serialize();

    var type = drinkForm.find('input[name="type"]').val();
    if (this.getDrinkByType(type) != null) {
        $('#' + controller.popups["drinkExistsPopup"]).popup('open');
        return;
    }

    $.post('/api/drinks', serializedData)
        .done(function( data ) {

            if (data.isSuccessful == true) {

                controller.loadDrinkList();
                $('#' + controller.popups["drinkAddedPopup"]).popup('open');
            }
            else {

            }
        });
}

// -----------------------------------------------------------------------------
// UI
// -----------------------------------------------------------------------------


DrinkController.prototype.getDrinkById = function(drinkId) {

    for (var i=0; i!=this.drinks.length; i++) {
        if (this.drinks[i]._id == drinkId) {
            return this.drinks[i];
        }
    }

    return null;
}

DrinkController.prototype.getDrinkByType = function(type) {

    for (var i=0; i!=this.drinks.length; i++) {
        if (this.drinks[i].type == type) {
            return this.drinks[i];
        }
    }

    return null;
}

DrinkController.prototype.getSelectedDrink = function() {

    var selectedDrinkId =  $('input[name=drink-choice]:checked', '#drinkSelection').val();
    return this.getDrinkById(selectedDrinkId);

};

// Remove drinks from drink list list
DrinkController.prototype.removeDrinks = function() {
    $('#' + this.controls["drinkList"]).html('');
};

// Add Drink to drink list (model: drink.js)
DrinkController.prototype.addDrink = function(drink, index) {
    $('#' + this.controls["drinkList"]).append(
          '<input type="radio" name="drink-choice" id="radio-choice-'+index+'" value="'+drink._id+'" '+(index == 0 ? 'checked="checked"' : '')+'>'
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
