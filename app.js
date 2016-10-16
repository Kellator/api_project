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
//makes request to youtube 
	function makeRequestYOUTUBE(searchTerm, index, type, callback) {
		searchTerm = searchTerm.replace(/:/g, "").replace(/ /g, "+");
			var settings = {
			url: youtube_base_url,
			
			data: {
				key: youtube_key,
				q: searchTerm + "+" + type,
				r:"json",
				part: "snippet",
				type: "video",
				maxResults: 3,
				nextPageToken: "",
				prevPageToken: "",
				relevanceLanguage: "en",

			},
			dataType: 'json',
			success: function(data){
				callback(data, index, type);
				console.log(data);
			}
		};
	$.ajax(settings);
}

//render functions
//renders igdb results
function displaySearchResultsIGDB(data, type) {
	var resultElement = "";
	if (data) {
		$.each(data, function(index, item) {
			resultElement = 
	"<div value= '" + index + "' class= 'igdb_result_return  row'>" + "<a href= '" + item.url + "' target='_blank'>" + "<h1 class = 'title_search'>" +  item.name + "</h2></a>" + 
		"<p class= 'igdb_storyline col_8'><span class='bold_text'>Storyline:</span><br>" + (item.summary ? item.summary : "Sorry. No storyline results.") + "<br>" +
		"<div class= 'cover_image'><img class ='side_image col_4' src = 'https://res.cloudinary.com/igdb/image/upload/t_cover_big/" +  item.cover.cloudinary_id + "'</></div></div>" + 

		"<div class= 'gameplay_section youtube_results row '>" +
			"<h1>Gameplay Videos</h1>" +  
			"<div value= '" + index + "' class= 'youtube_gameplay_list col_12'></div>" +
				"<form class=' additional_results js_additional_gameplay '>" +
					"<button type= 'button' class='more_gameplay js_more_gameplay' name='more_gameplay_button' id='more_gameplay_button'>For More Gameplay</button>" +
				"</form>" +
			"</div>"+
		"<div class= 'walkthrough_section youtube_results row'>" +
			"<h1>Walkthorough Videos</h1>" +
			"<div value= '" + index + "' class= 'youtube_walkthrough_list col_12'></div>" +	  
				"<form class='additional_results js_additional_walkthrough '>" +
					"<button type= 'button' onclick='alert(" + 'hello' + ")class='more_walkthrough js_more_walkthrough' name='more_walkthrough_button' id='more_walkthrough_button'>For More Walkthroughs</button>" + 
				"</form>" +	
			"</div>" +				
		"</div>"; 
	$(".igdb_" + type + "_results_list").append(resultElement);
 		makeRequestYOUTUBE(item.name, index,  "gameplay", displaySearchResultsYOUTUBE);
 		makeRequestYOUTUBE(item.name, index, "walkthrough", displaySearchResultsYOUTUBE);
		});
	}

	else {
		resultElement += "<p>Sorry.  No results.  Try again. </p>"
	}
}

//renders Youtube results
function displaySearchResultsYOUTUBE(data, index, type) {
	var resultElement = "";
	if (data.items) {
		data.items.forEach(function(item) {
		resultElement += "<div class ='result_container col_4'" + 
		"<p><a href = 'https://www.youtube.com/watch?v=" + item.id.videoId + "'target='_blank'><img class='col_12' src='" + item.snippet.thumbnails.high.url + "'></a></p><br>" +
 		"<p class= ' col_12'><a href = 'https://www.youtube.com/watch?v=" + item.id.videoId + "'target='_blank'>" + item.snippet.title + "</a></p>" + "</div>";
	});
}
else {
	resultElement += "<p>I'm sorry, no search results.  Try again.</p>"
}
$(".youtube_" + type + "_list[value= " + index + "] ").html(resultElement);
}

//button handler for search button
function submitHandler() {
	$(".js_search_game").submit(function(event) {
		event.preventDefault();
		var query = $(this).find(".js_search_input").val();
		makeRequestIGDB(query, "games", displaySearchResultsIGDB);				
	});
}
function moreGameplayHandler() {
	$("#more_gameplay_button").click(function() {
		event.preventDefault();
		makeRequestYOUTUBE(item.name, index,  "gameplay", displaySearchResultsYOUTUBE);
		alert("button clicked");
	});
}
$(document).ready(function() {
	submitHandler();
	moreGameplayHandler();
});
//$(function(){submitHandler();});

//$( ".nav_button" ).toggleClass( ".hidden", addOrRemove );
// to get youtube vid results: 
// function moreResults(data, index, type) {
// 	var additionalResults = "";
// 	if (data.nextPageToken) {
// 		data.nextPageToken.forEach(function(item) {
// 			additionalResults += "<div class ='result_container col_4'" + 
// 		"<a href = 'https://www.youtube.com/watch?v=" + item.id.videoId + "'><img class='col_12' src='" + item.snippet.thumbnails.high.url + "'/></a><br>" +
// 		"<p class= ' col_12'><a href = 'https://www.youtube.com/watch?v=" + item.id.videoId + "'>" + item.snippet.title + "</a></p>" + "</div>";
// 	});
// }
// else {
// 	resultElement += "<p>I'm sorry, no additional video results available.  Try again.</p>"
// }
// $(".youtube_" + type + "_list[value= " + index + "] ").html(additionalResults);
// }

// function moreResultsHandler() {		
// 	$(".additional_button").click(function(event) {
// 		event.preventDefault();
// 		var query = $(this).;
// 	});
// }


