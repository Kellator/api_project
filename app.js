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


var youtube_search_gameplay
var youtube_search_walkthrough
var youtube_search_commentary
var youtube_channel = "/channel/"
var youtube_video = "/watch?"

var twitch_search_channels = "/search/channels?"
var twitch_search_streams = "/search/streams?"
var twitch_search_games = "/search/games?"

var cloudinary_url = "https://res.cloudinary.com/igdb/image/upload/"


//makes request to youtube for search results
function makeRequestYOUTUBE(searchTerm, callback) {
	var settings = {
		url: youtube_base_url,
		data: {
			key: youtube_key,
			q: searchTerm,
			r:"json",
			part: "snippet",
			type: "video",
			relevanceLanguage: "en",
		},
		dataType: 'json',
		success: callback
	};
$.ajax(settings);
console.log();
}

//renders Youtube results
function displaySearchResultsYOUTUBE(data) {
	console.log(data);
	var resultElement = "";
	if (data.items) {
		data.items.forEach(function(item) {
		resultElement += "<p><a href = 'https://www.youtube.com/watch?v=" + item.id.videoId + "'>" + item.snippet.title + "</a></p>" + 
		"<a href = 'https://www.youtube.com/watch?v=" + item.id.videoId + "'><img class='col_6' src='" + item.snippet.thumbnails.high.url + "'/></a>" +
		"<div class='channel_button'><button><a href = 'https://www.youtube.com/channel/" + item.snippet.channelId + "'>For More from this Channel<br>CLICK HERE!</button></div>";		
	});
}
else {
	resultElement += "<p>I'm sorry, no search results.  Try again.</p>"
	console.log();
}
$(".js_youtube_results").html(resultElement);
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


