function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

Date.prototype.yyyy_mm_dd = function() {
   var yyyy = this.getFullYear().toString();
   var mm = (this.getMonth()+1).toString();
   var dd  = this.getDate().toString();
   return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]);
};

Date.prototype.ddmmyyyy = function() {
   var yyyy = this.getFullYear().toString();
   var mm = (this.getMonth()+1).toString();
   var dd  = this.getDate().toString();
   return (dd[1]?dd:"0"+dd[0]) + '.' + (mm[1]?mm:"0"+mm[0]) + '.' + yyyy;
};

var username = 'akoss';

var venueController = new VenueController("venueList", "venueName", "venueAddress", "venueAddedPopup", "selectedVenueName");
var drinkController = new DrinkController("addDrinkPopup", "drinkListBeer", "drinkListWine", "drinkListShot", "drinkListOther", "drinkAddedPopup", "drinkExistsPopup");
var consumptionController = new ConsumptionController("consumptionList", "consumptionPriceSum");