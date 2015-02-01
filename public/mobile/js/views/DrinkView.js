function DrinkView() {
}

// Returns the identifier (mongo _id) of selected Drink
DrinkView.prototype.getSelectedDrinkId = function() {
    return $('input[name=drink-choice]:checked', '#drinkSelection').val();
};

// Remove all drinks from all categories (Drink selector when user is about to add consumption)
DrinkView.prototype.removeDrinks = function() {
    $('#drinkListBeer').html('');
    $('#drinkListWine').html('');
    $('#drinkListShot').html('');
    $('#drinkListOther').html('');
};

// Add Drink to drink list (model: drink.js)
DrinkView.prototype.addDrink = function(drink, index) {

    var targetList = null;
    switch(drink.name) {
        case 'Beer':
            targetList = $('#drinkListBeer');
            break;
        case 'Wine':
            targetList = $('#drinkListWine');
            break;
        case 'Shot':
            targetList = $('#drinkListShot');
            break;
        case 'Other':
            targetList = $('#drinkListOther');
            break;
    }

    targetList.append(
          '<input type="radio" name="drink-choice" id="radio-choice-'+index+'" value="'+drink._id+'" '+(index == 0 ? 'checked="checked"' : '')+'>'
        + '<label for="radio-choice-'+index+'">' + drink.type +'</label>');

    $("input[type='radio']").checkboxradio().checkboxradio("refresh");
};


// Show drink selector popup
DrinkView.prototype.showAddDrinkPopup = function() {
    $('#addDrinkPopup').popup('open');
};

// Hide drink selector popup
DrinkView.prototype.hideAddDrinkPopup = function() {
    this.removeDrinks();
    $('#addDrinkPopup').popup('close');
};


// Show "Drink Added" message
DrinkView.prototype.showDrinkAddedPopup = function() {
    $('#drinkAddedPopup').popup('open');
};

// Show "Drink Exists" message
DrinkView.prototype.showDrinkExistsPopup = function() {
    $('#drinkExistsPopup').popup('open');
};


