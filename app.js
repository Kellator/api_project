var igdb_base_url = "https://igdbcom-internet-game-database-v1.p.mashape.com"
var youtube_base_url = "https://www.googleapis.com/youtube/v3/search"
var twitch_base_url = "https://api.twitch.tv/kraken."

var igdb_key = "65vlqIW8HRmshKsG0KIY236EqOB4p1OPDiYjsnO1DuCj7LGeYt"
var youtube_key = "AIzaSyC8vg9sZggTKGAiYvX4wGs9H46pR2_spPM"
var twitch_key = "ezq2fmpfkjk3zzl17nmo2j8i5ehcdz6"

var igdb_search_titles = "/games/"
var igdb_search_genres = "/genres/"
var igdb_search_platforms = "/platforms/"


var youtube_search_gameplay
var youtube_search_walkthrough
var youtube_search_commentary
var youtube_channel = "/channel/"
var youtube_video = "/watch?"

var twitch_search_channels = "/search/channels?"
var twitch_search_streams = "/search/streams?"
var twitch_search_games = "/search/games?"

var cloudinary_url = "https://res.cloudinary.com/igdb/image/upload/"

//makes request to IGDB api for search results
// function makeRequestIGDB(searchTerm, callback) {
// 	var settings = {
// 		url: igdb_base_url,
// 		data: {
// 			key: igdb_key,
// 			fields: "*",
// 			search: searchTerm,
// 			order: "rating:desc"
// 		}
// 		dataType: 'json',
// 		success: callback
// 	};
// $.ajax(settings);
// console.log();
// }


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

//makes request to twitch for search results
// function makeRequestTWITCH(searchTerm, callback) {
// 	var settings = {
// 		url: twitch_base_url,
// 		data: {
// 			key: twitch_key,
// 			q: searchTerm,

// 		}
// 		dataType: 'json',
// 		success: callback
// 	};
// }

//renders IGDB results
function displaySearchResultsIGDB(data) {}

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
$(".video_results").html(resultElement);
}

//button handler for search button
function submitHandler() {
	$(".search_submit").submit(function(event) {
		event.preventDefault();
		var query = $(this).find(".search_input").val();
		console.log(query);
		makeRequest(query, displaySearchResultsYOUTUBE);
	});
}
console.log();
$(function(){submitHandler();});