//js/model/images.js
var app = app || {};
/**
* @description Data & methods related to obtaining a url from flickr API
* @constructor
* @param {obj} attr -  gets passed name from search results an in turn generates a search
*/
app.ImageModel = Backbone.Model.extend({
	defaults: {
		name: 'food',
		url: 'http://lorempixel.com/50/50/food'
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
	urlString: "https://api.flxxickr.com/services/rest/?method=flickr.photos.search&api_key=48379916a60871c6908ced4b30cd156f&tags=food&text=^imageQuery^&sort=relevance&content_type=1&per_page=2&format=json&nojsoncallback=1",

	errorHandler: function() {
		if(!this.hadReceivedMessage) {
			this.hadReceivedMessage = true;
			alert("Oh NO! Sorry there's an issue getting new flickr images! Your other food images should be good to go though!")
		}
	},

	initialize: function() {
		//on init, name is set at construction
		var textQuery = encodeURIComponent(this.get('name').split(' ', 3).join(' '))

		this.url = this.urlString.replace('^imageQuery^', textQuery);
		console.log(textQuery);
		this.fetch({error: this.errorHandler});
	}
})