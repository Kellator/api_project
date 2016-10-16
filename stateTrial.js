var state = {
	resultsIgdb: [], //json results from igdb ajax req
	resultsYoutube: [], //json results from youtube ajax req
	route: "start"  //renders original search page
}
//determine if on start search page or results pages - then which results page(index 0-2 or 3-5)
function setRoute(state, route) {
	state.route = route;
};
//return index 0-2 should show
//return index 3-5 should start as hidden until user clicks on button for additional results
function hideAdditionalResults(value) {

}
//
function resetSearchField() {
	$(.js_search_game).val("");
}
//adding comment for testing