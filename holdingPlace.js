//makes request to IGDB api for search results
//code from github: https://github.com/igdb/igdb-api-js/blob/master/igdb.jquery.js
// function makeRequestIGDB(url, callback, opts) {
// 	url = config.endpoint + url;
// 	if (opts) {
// 		var optUrl = [];
// 		for (param in opts) {
// 			var paramValue = opts[param];
// 			if (param ==="filters") {
// 				for (filter in paramValue) {
// 					var filterValue = paramValue[filter];
// 					optUrl.push("filters[" + filter + "]=" + filterValue);
// 				}
// 			} else {
// 				optUrl.push(param + "=" + paramValue);
// 			}
// 		}
// 		url += "?" + optUrl.join("&");
// 	}
// 	var request = new XMLHttpRequest();
// 	req.headers['Accept'] = 'application/json';
// 	req.headers['Authoriation'] = 'Token token="' + config.igdb_key + '"';

// 	request.open('GET', url, true);

// 	request.onload = function() {
// 		if (request.status >= 200 && request.status < 400) {
// 			callback(JSON.parse(request.responseText));
// 		}
// 	};

//   window.IGDB = {
//     games: {
//       index: function(opts, callback) {
//         get('games', callback);
//       },
//       get: function(id, callback) {
//         get('games/' + id, callback);
//       },
//       meta: function(callback) {
//         get('games/meta', callback);
//       },
//       search: function(opts, callback) {
//         get('games/search', callback, opts);
//       }
//     },
//     companies: {
//       index: function(opts, callback) {
//         get('companies', callback, opts);
//       },
//       get: function(id, callback) {
//         get('companies/' + id, callback);
//       },
//       meta: function(callback) {
//         get('companies/meta', callback);
//       },
//       games: function(opts, id, callback) {
//         get('companies/' + id + '/games', callback, opts);
//       }
//     },
//     people: {
//       index: function(opts, callback) {
//         get('people', callback, opts);
//       },
//       get: function(id, callback) {
//         get('people/' + id, callback);
//       },
//       meta: function(callback) {
//         get('people/meta', callback);
//       },
//       games: function(opts, id, callback) {
//         get('people/' + id + '/games', callback, opts);
//       },
//       titles: function(opts, id, callback) {
//         get('people/' + id + '/titles', callback, opts);
//       }
//     }
//   };
// }
//end code from github

	// var options = {
	// 	host: igdbWebAddress,
	// 	path:"/api/v1/games",
	// 	headers: {
	// 		"Accept": "application/json",
	// 		"authorization": igdb_key,
	// 		fields: "*",
	// 		search: searchTerm,
	// 		order: "rating"
	// 	}
	// };
// $.ajax(options);
// console.log();
// }



// makes request to twitch for search results
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
// $.ajax(settings);
// console.log();
// }

//renders IGDB results
// function displaySearchResultsIGDB(data) {
// 	console.log(data);
// 	var resultElement = "";
// 	if (data.items) {
// 		data.items.forEach(function(item) {
// 		resultElement += "<p> Let's just see if this returns anything.</p>"
// 	});
// }
// else {
// 	resultElement += "<p>I'm sorry, no search results.  Please try again.</p>"
// 	console.log();
// }
// $(".results_section").html(resultElement);
// }


//returns youtube results when igdb window vid button clicked
// function vidButtonHandler() {
// 	$(".search_submit").submit(function(event) {
// 		event.preventDefault();
// 		var query = $(this).find("#search_input").val();
// 		console.log(query);
// 		makeRequestYOUTUBE(query, displaySearchResultsYOUTUBE);
// 		makeRequestTWITCH(query,displaySearchResultsTWITCH);
// 	});
// }
// console.log();
// $(function(){vidButtonHandler();});
