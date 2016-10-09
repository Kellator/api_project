var igdb_base_url = "https://igdbcom-internet-game-database-v1.p.mashape.com"
var youtube_base_url = "https://www.googleapis.com/youtube/v3/search"
var twitch_base_url = "https://api.twitch.tv/kraken."

var igdb_key = "65vlqIW8HRmshKsG0KIY236EqOB4p1OPDiYjsnO1DuCj7LGeYt"
var youtube_key = "AIzaSyC8vg9sZggTKGAiYvX4wGs9H46pR2_spPM"
var twitch_key = "ezq2fmpfkjk3zzl17nmo2j8i5ehcdz6"

var igdbWebAddress = "www.igdb.com"

var igdb_titles_endpoint = "/games/"
var igdb_genres_endpoint = "/genres/"
var igdb_platforms_endpoint = "/platforms/"

var youtube_filter_trailer = "trailer"
var youtube_filter_gameplay = "gameplay"
var youtube_filter_walkthrough = "walkthrough"
var youtube_filter_commentary = "commentary"

var youtube_channel = "/channel/"
var youtube_video = "/watch?"

var twitch_search_channels = "/search/channels?"
var twitch_search_streams = "/search/streams?"
var twitch_search_games = "/search/games?"

var cloudinary_url = "https://res.cloudinary.com/igdb/image/upload/"


//makes request to youtube for trailer search results
function makeRequestYOUTUBEtrailer(searchTerm, callback) {
	var settings = {
		url: youtube_base_url,
		
		data: {
			key: youtube_key,
			q: searchTerm + "trailer",
			r:"json",
			part: "snippet",
			type: "video",
			relevanceLanguage: "en",
			nextPageToken: "",
			prevPageToken: "",
		},
		dataType: 'json',
		success: callback
	};
$.ajax(settings);
console.log();
}

//makes request to youtube for gameplay search results
function makeRequestYOUTUBEgameplay(searchTerm, callback) {
	var settings = {
		url: youtube_base_url,
		
		data: {
			key: youtube_key,
			q: searchTerm + "gameplay",
			r:"json",
			part: "snippet",
			type: "video",
			relevanceLanguage: "en",
			nextPageToken: "",
			prevPageToken: "",
		},
		dataType: 'json',
		success: callback
	};
$.ajax(settings);
console.log();
}

//makes request to youtube for walkthroughs search results
function makeRequestYOUTUBEwalkthrough(searchTerm, callback) {
	var settings = {
		url: youtube_base_url,
		
		data: {
			key: youtube_key,
			q: searchTerm + "walkthrough",
			r:"json",
			part: "snippet",
			type: "video",
			relevanceLanguage: "en",
			nextPageToken: "",
			prevPageToken: "",
		},
		dataType: 'json',
		success: callback
	};
$.ajax(settings);
console.log();
}

//makes request to youtube for commentary search results
function makeRequestYOUTUBEcommentary(searchTerm, callback) {
	var settings = {
		url: youtube_base_url,
		
		data: {
			key: youtube_key,
			q: searchTerm + "commentary",
			r:"json",
			part: "snippet",
			type: "video",
			relevanceLanguage: "en",
			nextPageToken: "",
			prevPageToken: "",
		},
		dataType: 'json',
		success: callback
	};
$.ajax(settings);
console.log();
}



//renders trailer Youtube results
function displaySearchResultsYOUTUBEgameplay(data) {
	console.log(data);
	var resultElement = "";
	var additionalResults = "<form class='additional_trailers js_additional_trailers '>" +  
	"<button class='more_trailers js_more_trailers' name='more_trailers_button' id='more_trailers_button'>For More Trailers</button></form>";
	if (data.items) {
		data.items.forEach(function(item) {
		resultElement += "<p><a href = 'https://www.youtube.com/watch?v=" + item.id.videoId + "'>" + item.snippet.title + "</a></p>" + 
		"<a href = 'https://www.youtube.com/watch?v=" + item.id.videoId + "'><img class='col_6' src='" + item.snippet.thumbnails.high.url + "'/></a>";		
	});
}
else {
	resultElement += "<p>I'm sorry, no search results.  Try again.</p>"
	console.log();
}
$(".js_youtube_trailers").html(resultElement + additionalResults);
}


//renders gameplay Youtube results
function displaySearchResultsYOUTUBEgameplay(data) {
	console.log(data);
	var resultElement = "";
	var additionalResults = "<form class='additional_gameplay js_additional_gameplay '>" +  
	"<button class='more_gameplay js_more_gameplay' name='more_gameplay_button' id='more_gameplay_button'>For More Gameplay</button></form>";
	if (data.items) {
		data.items.forEach(function(item) {
		resultElement += "<p><a href = 'https://www.youtube.com/watch?v=" + item.id.videoId + "'>" + item.snippet.title + "</a></p>" + 
		"<a href = 'https://www.youtube.com/watch?v=" + item.id.videoId + "'><img class='col_6' src='" + item.snippet.thumbnails.high.url + "'/></a>";
	});
}
else {
	resultElement += "<p>I'm sorry, no search results.  Try again.</p>"
	console.log();
}
$(".js_youtube_gameplay").html(resultElement + additionalResults);
}

//renders walkthrough Youtube results
function displaySearchResultsYOUTUBEwalkthrough(data) {
	console.log(data);
	var resultElement = "";
	var additionalResults = "<form class='additional_walkthrough js_additional_walkthrough '>" +  
	"<button class='more_walkthrough js_more_walkthrough' name='more_walkthrough_button' id='more_walkthrough_button'>For More Walkthroughs</button></form>";
	if (data.items) {
		data.items.forEach(function(item) {
		resultElement += "<p><a href = 'https://www.youtube.com/watch?v=" + item.id.videoId + "'>" + item.snippet.title + "</a></p>" + 
		"<a href = 'https://www.youtube.com/watch?v=" + item.id.videoId + "'><img class='col_6' src='" + item.snippet.thumbnails.high.url + "'/></a>";
	});
}
else {
	resultElement += "<p>I'm sorry, no search results.  Try again.</p>"
	console.log();
}
$(".js_youtube_walkthroughs").html(resultElement + additionalResults);
}


//renders commentary Youtube results
function displaySearchResultsYOUTUBEcommentary(data) {
	console.log(data);
	var resultElement = "";
	var additionalResults = "<form class='additional_commentary js_additional_commentary '>" +  
	"<button class='more_commentary js_more_commentary' name='more_commentary_button' id='more_commentary_button'>For More Commentary</button></form>";
	if (data.items) {
		data.items.forEach(function(item) {
		resultElement += "<p><a href = 'https://www.youtube.com/watch?v=" + item.id.videoId + "'>" + item.snippet.title + "</a></p>" + 
		"<a href = 'https://www.youtube.com/watch?v=" + item.id.videoId + "'><img class='col_6' src='" + item.snippet.thumbnails.high.url + "'/></a>";
	});
}
else {
	resultElement += "<p>I'm sorry, no search results.  Try again.</p>"
	console.log();
}
$(".js_youtube_commentary").html(resultElement + additionalResults);
}


//button handler for search button
function submitHandler() {
	$(".js_search_game").submit(function(event) {
		event.preventDefault();
		var query = $(this).find(".js_search_input").val();
		console.log(query);
		makeRequestYOUTUBE(query, displaySearchResultsYOUTUBE);
	});
}
console.log();
$(function(){submitHandler();});


//code to handle vid button in pop out results window
// function submitVidButtonHandler() {
// 	$(".js_display_vid_results").submit(function(event) {
// 		event.preventDefault();
// 		var query = $(this).find(IGDB SEARCH LINK RESULT).val();
// 		console.log(query);
// 		makeRequestYOUTUBE(query, displaySearchResultsYOUTUBE);
// 	});
// }
// $(function(){submitVidButtonHandler();)}