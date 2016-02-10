//js/collections/searchResults.js

var app = app || {};

/**
* @description Retreives search results through AJAX request, holds results until next fetch
* @constructor
* @param none - only one local instance
*/
var SearchResults = Backbone.Collection.extend({

	model:app.Food,

	urlString:'https://api.nutritionix.com/v1_1/search/^foodName^?results=0%3A15&fields=item_name%2Cbrand_name%2Citem_id%2Cbrand_id%2Cnf_calories%2Cnf_protein%2Cnf_total_carbohydrate%2Cnf_total_fat%2Cnf_sugars%2Cnf_cholesterol%2Cnf_dietary_fiber&appId=0b882a3e&appKey=e7ff6dcf85cfe80ff009aea9fa767e8c',

	url: '',
	parse: function ( data ) {
		return data.hits; //data.hits is the array containing the search results
	},
	/**
	* @description Changes URL for AJAX request and calls it
	* @param {string} query - formatted input passed from sidebar View
	*/
	getSearch: function( query ) {
		this.url = this.urlString.replace('^foodName^', query)
		console.log('nutritionix Query')
		this.fetch({
			reset: true,
			error: function() {
				alert('Oh No! It looks like something wrong happened when trying to fetch results. Wait a little bit and please try again.')
				$('.loading').text("We'll get 'em next time, tiger!")
			}
		});
	}
})

app.searchResults = new SearchResults();
