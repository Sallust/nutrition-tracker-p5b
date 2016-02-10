//js/models/food.js
var app = app || {};

/**
* @description Holds nutrient data related to one particular food
* @constructor
* @param attr -  gets passed attributes from search or from other food method
*/
console.log ('Hi from the food model');

app.Food = Backbone.Model.extend({
	defaults: {
		foodName: 'Sample Food',
		calories: 200,
		prot: 4,
		fat: 2,
		carb: 45,
		fib: 0,
		sug: 2,
		chol: 0,
		added: false,
		favorited: false,
		imageUrl: 'http://lorempixel.com/75/75/food' //random picture of food as placeholder unil flickr url arrives
	},
	/**
	* @description Instantiates a food method from search data
	* @description  If needed, creates a new image model to which it immediately subcribes
	* @param attr -  gets passed attributes from search or from other food method
	*/
	initialize: function( attrs ) {
		try {
			//Test for correct values
			this.set({
				foodName: attrs.fields.item_name,
				calories: Math.round(attrs.fields.nf_calories),
				prot: Math.round(attrs.fields.nf_protein) || 0, //using Math.round cancels out some backbone sugar, use || so no NaN results
				fat: Math.round(attrs.fields.nf_total_fat) || 0,
				carb: Math.round(attrs.fields.nf_total_carbohydrate) || 0,
				fib: Math.round(attrs.fields.nf_dietary_fiber) || 0,
				sug: Math.round(attrs.fields.nf_sugars) || 0,
				chol: Math.round(attrs.fields.nf_cholesterol) || 0,
			});
			if (this.get('imageUrl') === 'http://lorempixel.com/75/75/food') { //if flickr photo has not been saved
				var newImage = new app.ImageModel({name: attrs.fields.item_name})
				this.listenTo(newImage, 'change:url', this.setImage)
			}
		} catch (e) {
			console.log(e)
		}
	},
	toggleFavorite: function() {
		this.set({
			favorited: !this.get('favorited')
		})
	},
	/**
	* @description On arrival of image data, changes food Url
	* @param {model} model -  the image model
	* @param {string} url - the url from the image model, directly passed by using the change:url listener
	*/
	setImage: function( model, url) {
		this.set('imageUrl', url);
	}
});