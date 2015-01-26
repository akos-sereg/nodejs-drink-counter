
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function loadVenues(eventId_) {

	$.ajax({
		type : "GET",
		url : "/api/venues"

	}).done(function(data) {
		
		var html = '';
		for (var i=0; i!=data.length; i++)
		{
			html += '<li>' + data[i].name + ' - ' + data[i].address + '</li>';
		}
		
		$('#venueList').html(html);
	    $('#venueList').trigger('create');
	    $('#venueList').listview('refresh');
	    
	}).fail(function(jqXHR, textStatus) {
		
	});
}