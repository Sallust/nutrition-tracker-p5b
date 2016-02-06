//js/collections/autocompleteResults.js

//will have a url that changes and points to the results of an autocomplete
//search from nutronix

var app = app || {};

var AutocompleteResults = Backbone.Collection.extend({
	//do I need to create a model here?


	urlString:  'https://apibeta.nutritionix.com/v2/autocomplete?q=^textInput^&appId=0b882a3e&appKey=e7ff6dcf85cfe80ff009aea9fa767e8c',

	model: app.Name,

	getResults: function(textInput) {
		this.url = this.urlString.replace('^textInput^', textInput)
		console.log(this.url);
		this.fetch({reset:true});
	},
	getSimpleArray: function() {
		array = [];
		this.each(function(item) {
			array.push(item.get('text'));
		})
		return array;
	}

})

app.autocompleteResults = new AutocompleteResults();