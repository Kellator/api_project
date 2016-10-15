var igdb_base_url = "https://igdbcom-internet-game-database-v1.p.mashape.com"
var igdb_key = "65vlqIW8HRmshKsG0KIY236EqOB4p1OPDiYjsnO1DuCj7LGeYt"
var igdb_titles_endpoint = "/games/"
var igdb_genres_endpoint = "/genres/"
var igdb_platforms_endpoint = "/platforms/"

//makes request to IGDB api for search results
//code from github: https://github.com/igdb/igdb-api-js/blob/master/igdb.jquery.js
function makeRequestIGDB(url, callback, opts) {
	url = config.endpoint + url;
	if (opts) {
		var optUrl = [];
		for (param in opts) {
			var paramValue = opts[param];
			if (param ==="filters") {
				for (filter in paramValue) {
					var filterValue = paramValue[filter];
					optUrl.push("filters[" + filter + "]=" + filterValue);
				}
			} else {
				optUrl.push(param + "=" + paramValue);
			}
		}
		url += "?" + optUrl.join("&");
	}
	var request = new XMLHttpRequest();
	req.headers['Accept'] = 'application/json';
	req.headers['Authoriation'] = 'Token token="' + config.igdb_key + '"';

	request.open('GET', url, true);

	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			callback(JSON.parse(request.responseText));
		}
	};

  window.IGDB = {
    games: {
      index: function(opts, callback) {
        get('games', callback);
      },
      get: function(id, callback) {
        get('games/' + id, callback);
      },
      meta: function(callback) {
        get('games/meta', callback);
      },
      search: function(opts, callback) {
        get('games/search', callback, opts);
      }
    },
    companies: {
      index: function(opts, callback) {
        get('companies', callback, opts);
      },
      get: function(id, callback) {
        get('companies/' + id, callback);
      },
      meta: function(callback) {
        get('companies/meta', callback);
      },
      games: function(opts, id, callback) {
        get('companies/' + id + '/games', callback, opts);
      }
    },
    people: {
      index: function(opts, callback) {
        get('people', callback, opts);
      },
      get: function(id, callback) {
        get('people/' + id, callback);
      },
      meta: function(callback) {
        get('people/meta', callback);
      },
      games: function(opts, id, callback) {
        get('people/' + id + '/games', callback, opts);
      },
      titles: function(opts, id, callback) {
        get('people/' + id + '/titles', callback, opts);
      }
    }
  };
}
//end code from github