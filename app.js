"use strict";
var igdb_base_url = "https://igdbcom-internet-game-database-v1.p.mashape.com"
var youtube_base_url = "https://www.googleapis.com/youtube/v3/search"
var twitch_base_url = "https://api.twitch.tv/kraken."

var igdb_key = "65vlqIW8HRmshKsG0KIY236EqOB4p1OPDiYjsnO1DuCj7LGeYt"
var youtube_key = "AIzaSyC8vg9sZggTKGAiYvX4wGs9H46pR2_spPM"
var twitch_key = "ezq2fmpfkjk3zzl17nmo2j8i5ehcdz6"

var igdbWebAddress = "www.igdb.com"
var cloudinary_url = "https://res.cloudinary.com/igdb/image/upload/"

//makes request to IGDB
function makeRequestIGDB(searchTerm, type, callback) {
	var settings = {
		url: igdb_base_url + "/" + type + "/",
		data: {
			fields: "*",
			limit: 10,
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
			//console.log(data);		
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
				maxResults: 6,
				nextPageToken: "",
				prevPageToken: "",
				relevanceLanguage: "en",

			},
			dataType: 'json',
			success: function(data){
				callback(data, index, type);
			}
		};
	$.ajax(settings);
}
//render functions
//renders igdb results
function displaySearchResultsIGDB(data, type) {
	//stores igdb results:  
	//renders content for page
	var resultElement = "";
	var counter = 0
	if (data) {
		$(".igdb_" + type + "_results_list").append("<div class= 'igdb_return'></div>");
		$.each(data, function(index, item) { 						
			resultElement = 
			"<div value= '" + index + "' class= 'igdb_result_return  row'>" + "<a href= '" + item.url + "' target='_blank'>" + 
			"<h1 class = 'title_search'>" +  item.name + "</h2></a>" + 
				"<p class= 'igdb_storyline col_8'><span class='bold_text'>Storyline:</span><br>" + (item.summary ? item.summary : "Sorry. No storyline results.") + 
				"<br>" + 
				"<div class= 'cover_image'><img class ='side_image col_4' src = 'https://res.cloudinary.com/igdb/image/upload/t_cover_big/" +  item.cover.cloudinary_id + "'</></div></div>" + 
	//youtube results sections 
	//gameplay
			"<div class= 'gameplay_section youtube_results row '>" +
				"<h1>Gameplay Videos</h1>" +  
				"<div value= '" + index + "' class= 'youtube_gameplay_list col_12'></div>" +
				"<button value= '" + index + "'type= 'button' class='paging_button more_gameplay js_more_gameplay col_3' name='more_gameplay_button' id='more_gameplay_button'>For More Gameplay</button>" +
			"</div>"+
	//walkthrough
			"<div class= 'walkthrough_section youtube_results row'>" +
				"<h1>Walkthorough Videos</h1>" +
				"<div value= '" + index + "' class= 'youtube_walkthrough_list col_12'></div>" +	  
				"<button value= '" + index + "' type= 'button' class='paging_button more_walkthrough js_more_walkthrough col_3' name='more_walkthrough_button' id='more_walkthrough_button'>For More Walkthroughs</button>" + 	
			"</div>" +				
			"</div>"; 
			counter++;
	 		if (counter == 5) {
				$(".igdb_" + type + "_results_list").append("<div class= 'igdb_return hidden'></div>");
			}
	 		//however many to show </div>  then open another div
		
		
//adds youtube vid request to each igdb index return	
		$(".igdb_return" + (counter >= 5 ? ".hidden" : "")).append(resultElement);
 			makeRequestYOUTUBE(item.name, index,  "gameplay", displaySearchResultsYOUTUBE);
 			makeRequestYOUTUBE(item.name, index, "walkthrough", displaySearchResultsYOUTUBE);
 			});
	}
	else {
		resultElement += "<p>Sorry.  No results.  Try again. </p>";
	}
}
//renders Youtube results
function displaySearchResultsYOUTUBE(data, index, type) {	
	var resultElement = "";
	var counter = 0;
	if (data.items) {
		resultElement += "<div value= '" + index + "'' class= 'youtube_return_" + type + "'>" 
		data.items.forEach(function(item) {
			resultElement += "<div class ='result_container col_4'" + 
			"<p><a href = 'https://www.youtube.com/watch?v=" + item.id.videoId + "'target='_blank'><img class='col_12' src='" + item.snippet.thumbnails.high.url + "'></a></p><br>" +
	 		"<p class= ' col_12'><a href = 'https://www.youtube.com/watch?v=" + item.id.videoId + "'target='_blank'>" + item.snippet.title + "</a></p>" + "</div>";
	 		counter++;
	 		if (counter == 3) {
	 		resultElement += "</div><div value= '" + index + "'class= 'youtube_return_" + type + " hidden '>" }
	 		//however many to show </div>  then open another div
		});
		resultElement += "</div>";
	}
	else {
	resultElement += "<p>I'm sorry, no search results.  Try again.</p>"
}

$(".youtube_" + type + "_list[value= " + index + "] ").html(resultElement);
}

//button handler for search button
function submitHandler() {
	$("body").on("submit", ".js_search_game", function() {
		event.preventDefault();
		var query = $(this).find(".js_search_input").val();
		makeRequestIGDB(query, "games", displaySearchResultsIGDB);
		$("form.nav_buttons").toggleClass("hidden");				
	});
}
function forMoreButtonHandler() {
	$("body").on("click", ".js_more_results", function(event) {
		event.preventDefault();
		$(".igdb_return").toggleClass("hidden");
	});
}
//button testing functions
function submitMoreGameplay() {
	$("body").on("click", ".js_more_gameplay", function(event) {
		event.preventDefault();
		//var index = $("div.youtube_return_gameplay").val();
		$(this).text(function(i, text) {
			return text === "For More Gameplay" ? "Previous Gameplay Results" : "For More Gameplay";
		});
		$(this).closest("div").find(".youtube_return_gameplay").toggleClass("hidden");
		//$(".youtube_return_gameplay[value='" + (this).attr("value") + "']").toggleClass("hidden");
		//alert("gameplay button has been pushed");
	});
}
function submitMoreWalkthroughs() {
	$("body").on("click", ".js_more_walkthrough", function(event) {
		event.preventDefault();
		//var index = $("div.youtube_return_walkthrough").val();
		$(this).text(function(i, text) {
			return text === "For More Walkthroughs" ? "Previous Walkthough Results" : "For More Walkthroughs";
		});
		$(this).closest("div").find(".youtube_return_walkthrough").toggleClass("hidden");
		//alert("walkthrough button has been pushed");
		
	});	
}
//need function to call hidden stored data from igdb call?
$(document).ready(function() {
	submitHandler();
	submitMoreGameplay();
	submitMoreWalkthroughs();
	forMoreButtonHandler();
});
