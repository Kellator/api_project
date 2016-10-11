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

//makes request to IGDB
function makeRequestIGDB(searchTerm, type, callback) {
	var settings = {
		url: igdb_base_url + "/" + type + "/",
		data: {
			fields: "*",
			limit: 5,
			offset: 0,
			search: searchTerm
		},
		headers: {
			"X-Mashape-Key": igdb_key
		},
		dataType: 'json',
		success: function(data) {
			callback(data,type);
		}
	};
	$.ajax(settings);
}


	//makes request to youtube for walkthroughs search results
	function makeRequestYOUTUBE(searchTerm, type, callback) {
		var settings = {
			url: youtube_base_url,
			
			data: {
				key: youtube_key,
				q: searchTerm + " " + type,
				r:"json",
				part: "snippet",
				type: "video",
				maxResults: 3,
				relevanceLanguage: "en",
				nextPageToken: "",
				prevPageToken: "",
			},
			dataType: 'json',
			success: function(data){
				callback(data, type);
			}
		};
	$.ajax(settings);
	console.log();
	}
	
function displaySearchResultsIGDB(data, type) {
	console.log(data);
	var resultElement = "";
	if (data) {
		data.forEach(function(item) {
			resultElement += "<div class= 'igdb_result_return  col_6'><h2>" + item.name + "</h2>" +
			"<img class ='side_image' src = 'https://res.cloudinary.com/igdb/image/upload/t_cover_big/" +  item.cover.cloudinary_id + "'</>" + "<p class= 'igdb_storyline'>" + item.summary + "</p></div>";
		});
	}
	else {
		resultElement += "<p>Sorry.  No results.  Try again. </p>"
	}
	$(".igdb_" + type + "_results_list").html(resultElement);
}


//renders Youtube results
function displaySearchResultsYOUTUBE(data, type) {
	console.log(data);
	var resultElement = "";
	if (data.items) {
		data.items.forEach(function(item) {
		resultElement += "<div class ='result_container'" +"<p><a href = 'https://www.youtube.com/watch?v=" + item.id.videoId + "'>" + item.snippet.title + "</a></p>" + 
		"<a href = 'https://www.youtube.com/watch?v=" + item.id.videoId + "'><img class='' src='" + item.snippet.thumbnails.high.url + "'/></a></div>";
	});
}
else {
	resultElement += "<p>I'm sorry, no search results.  Try again.</p>"
}
$(".youtube_" + type + "_list").html(resultElement);
}


//button handler for search button
function submitHandler() {
	$(".js_search_game").submit(function(event) {
		event.preventDefault();
		var query = $(this).find(".js_search_input").val();
		console.log(query);
		//makeRequestYOUTUBE(query, displaySearchResultsYOUTUBEtrailer, displaySearchResultsYOUTUBEgameplay, displaySearchResultsYOUTUBEwalkthrough, displaySearchResultsYOUTUBEcommentary);
		makeRequestIGDB(query, "games", displaySearchResultsIGDB);
	});
}
console.log();
$(function(){submitHandler();});
// to get youtube vid results: 
// 		makeRequestYOUTUBE(query, "trailer", displaySearchResultsYOUTUBE);
// 		makeRequestYOUTUBE(query, "gameplay", displaySearchResultsYOUTUBE);
// 		makeRequestYOUTUBE(query, "walkthrough", displaySearchResultsYOUTUBE);
// 		makeRequestYOUTUBE(query, "commentary", displaySearchResultsYOUTUBE);
