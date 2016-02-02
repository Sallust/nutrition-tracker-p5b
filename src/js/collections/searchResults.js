//js/collections/searchResults.js

var app = app || {};

console.log('hello from search');

var foodUrl = 'https://api.nutritionix.com/v1_1/search/cheddar%20cheese?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=0b882a3e&appKey=e7ff6dcf85cfe80ff009aea9fa767e8c'


//This will be the collection to hold the results of the search query?

var SearchResults = Backbone.Collection.extend({

	model:app.Food,

	url: foodUrl,
	parse: function ( data ) {
		console.log(data);
		return data.hits; //So right now the entire array of data is being saved
		//Is that needed?
	}


})
