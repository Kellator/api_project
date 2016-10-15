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
			//order: "release_dates.date:desc",
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
	
function displaySearchResultsIGDB(data, type) {
	console.log(data);
	var resultElement = "";
	if (data) {
		$.each(data, function(index, item) {
			resultElement = "<div class= 'igdb_result_return  col_12'>" +
			"<a href= '" + item.url + "'>" + "<h2 class = 'title_search'>" +  item.name + "</h2></a>" + 
			"<p class= 'igdb_storyline col_8'><span class='bold_text'>Storyline:</span><br>" + (item.summary ? item.summary : "") + "</p>" +
			"<img class ='side_image col_4' src = 'https://res.cloudinary.com/igdb/image/upload/t_cover_big/" +  item.cover.cloudinary_id + "'</>" + 

			"<iframe id = 'ytplayer' type= 'text/html' width='320' height='195' class= 'trailer_view_window' src= 'https://www.youtube.com/embed/" + item.videos.video_id + "?autoplay=0'>" +  "</iframe>" +

				"<div class= 'gameplay_section'>" +
					"<h2 class= 'vid_heading'>Gameplay Videos</h2>" +  
					"<div value= '" + index + "' class= 'youtube_gameplay_list col_12'></div>" +
					"<form class='additional_button js_additional_gameplay '>" +
					"<button class='more_gameplay js_more_gameplay' name='more_gameplay_button' id='more_gameplay_button'>For More Gameplay</button></form>" +
				"</div>"+
				

				"<div class= 'walkthrough_section'>" +
					"<h2 class= 'vide_heading'>Walkthorough Videos</h2>" +
					"<div value= '" + index + "' class= 'youtube_walkthrough_list col_12'></div>" +	  
					"<form class='additional_button js_additional_walkthrough '>" +
					"<button class='more_walkthrough js_more_walkthrough' name='more_walkthrough_button' id='more_walkthrough_button'>For More Walkthroughs</button></form>" +	
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
		"<a href = 'https://www.youtube.com/watch?v=" + item.id.videoId + "'><img class='col_12' src='" + item.snippet.thumbnails.high.url + "'/></a><br>" +
		"<p class= ' col_12'><a href = 'https://www.youtube.com/watch?v=" + item.id.videoId + "'>" + item.snippet.title + "</a></p>" + "</div>";
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
		console.log(query);
		makeRequestIGDB(query, "games", displaySearchResultsIGDB);

	});
}


// to get youtube vid results: 
function moreResults(data, index, type) {
	var additionalResults = "";
	if (data.items.nextPageToken) {
		data.items.nextPageToken.forEach(function(item) {
			additionalResults += "<div class ='result_container col_4'" + 
		"<a href = 'https://www.youtube.com/watch?v=" + item.id.videoId + "'><img class='col_12' src='" + item.snippet.thumbnails.high.url + "'/></a><br>" +
		"<p class= ' col_12'><a href = 'https://www.youtube.com/watch?v=" + item.id.videoId + "'>" + item.snippet.title + "</a></p>" + "</div>";
	});
}
else {
	resultElement += "<p>I'm sorry, no additional video results available.  Try again.</p>"
}
$(".youtube_" + type + "_list[value= " + index + "] ").html(additionalResults);
}

function moreResultsHandler() {		
	$(".additional_button").click(function(event) {
		event.preventDefault();
		$(this).show(item.nextPageToken);
		console.log(nextPageToken);
	});
}
$(function(){submitHandler();});

