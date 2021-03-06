function DrinkController(view) {
    this.view = view;

    // Drink list available in mongo database
    this.drinks = [];

    // Initialize
    this.loadDrinkList();
}

// Load drinks from mongo database, populate drink selector
DrinkController.prototype.loadDrinkList = function() {

    var _this = this;
    this.view.removeDrinks();

    $.ajax({
        type : "GET",
        url : "/api/drinks"
    }).done(function(data) {

        _this.drinks = data;

        for (var i=0; i!=data.length; i++) {
            _this.view.addDrink(data[i], i+1);
        }

    }).fail(function(jqXHR, textStatus) {

    });
}

// Save drink to mongo database. Checks if loaded drink list contains drink identified by type (example: 'Dreher'),
// it means that all drinks should have unique 'type'.
DrinkController.prototype.saveDrink = function(drinkForm) {

    var _this = this;
    var serializedData = drinkForm.serialize();

    var type = drinkForm.find('input[name="type"]').val();
    if (this.getDrinkByType(type) != null) {
        _this.view.showDrinkExistsPopup();
        return;
    }

    $.post('/api/drinks', serializedData)
        .done(function( data ) {

            if (data.isSuccessful == true) {

                _this.loadDrinkList();
                _this.view.showDrinkAddedPopup();
            }
            else {

            }
        });
}

// Get drink from loaded drink list by mongo _id
DrinkController.prototype.getDrinkById = function(drinkId) {

    for (var i=0; i!=this.drinks.length; i++) {
        if (this.drinks[i]._id == drinkId) {
            return this.drinks[i];
        }
    }

    return null;
}

// Get drink from loaded drink list by type (type example: 'Dreher')
DrinkController.prototype.getDrinkByType = function(type) {

    for (var i=0; i!=this.drinks.length; i++) {
        if (this.drinks[i].type == type) {
            return this.drinks[i];
        }
    }

    return null;
}

// Get selected drink from Drink Selector (when adding consumption item)
DrinkController.prototype.getSelectedDrink = function() {

    var selectedDrinkId =  this.view.getSelectedDrinkId();
    return this.getDrinkById(selectedDrinkId);

};
