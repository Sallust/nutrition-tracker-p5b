//js/model/images.js

//here is where the logic surrounding obtaining one URL pic will live
console.log("IMAGE IMAGE");

var app = app || {};

app.ImageModel = Backbone.Model.extend({
	defaults: {
		name: 'food',
		url: 'http://lorempixel.com/50/50/food',
	},
	parse: function(data) {
		try {
			var photo = data.photos.photo[0];
			var imgUrl = 'https://farm' + photo.farm +'.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_s.jpg'; //flickr's  photo source url
			return {url: imgUrl};
		} catch (e) {
			console.log(e)
		}

	},

	urlString: "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=d0b3e0e79e625b637588dbed0555d9d3&tags=food&text=^imageQuery^&sort=relevance&content_type=1&per_page=2&format=json&nojsoncallback=1",

	initialize: function() {
		//on init, name is set at construction
		console.log("I've been initialized!!!");
		//var textQuery = this.get('name').replace( /\W/g , '').replace(/ /g, '+');
		var textQuery = encodeURIComponent(this.get('name').split(' ', 3).join(' '))
		//var test = encodeURIComponent(this.get('name')).replace(/%20/g, '+');

		console.log(test);



		this.url = this.urlString.replace('^imageQuery^', textQuery);
		console.log(textQuery);
		this.fetch();
	}



})