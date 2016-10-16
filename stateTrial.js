var state = {
	resultsIgdb: [], //json results from igdb ajax req
	resultsYoutube: [], //json results from youtube ajax req
	route: "start"  //renders original search page
}
//determine if on start search page or results pages - then which results page(index 0-2 or 3-5)
function setRoute(state, route) {
	state.route = route;
};
function makeRequestIGDB(searchTerm, type, callback) {
	var settings = {
		url: igdb_base_url + "/" + type + "/",
		data: {
			fields: "*",
			limit: 10,
			offset: 0,
			order: "release_dates.date:desc",
			search: searchTerm
		},
		headers: {
			"X-Mashape-Key": igdb_key
		},
		dataType: 'json',
		success: function(data) {
			callback(data,type);
			console.log(data);
		}
	};
	$.ajax(settings);
}
function storeResultsIGDB(data) {
	var storedData = [],
}
//return index 0-2 should show
//return index 3-5 should start as hidden until user clicks on button for additional results
function hideAdditionalResults(value) {

}
//
function resetSearchField() {
	$(.js_search_game).val("");
}
//adding comment for testing