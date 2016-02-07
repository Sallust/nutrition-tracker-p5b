var app = app || {};


//I'm the food model, I'm the data surrounding one added food

console.log ('Hi from the food model');

app.Food = Backbone.Model.extend({
	//default food properties
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
		imageUrl: 'http://lorempixel.com/50/50/food'
	},

	initialize: function( attrs ) {
		try {
			//Test for correct values

			this.set({
				foodName: attrs.fields.item_name,
				calories: Math.round(attrs.fields.nf_calories),
				prot: Math.round(attrs.fields.nf_protein),
				fat: Math.round(attrs.fields.nf_total_fat),
				carb: Math.round(attrs.fields.nf_total_carbohydrate),
				fib: Math.round(attrs.fields.nf_dietary_fiber),
				sug: Math.round(attrs.fields.nf_sugars),
				chol: Math.round(attrs.fields.nf_cholesterol),
				//image: new app.ImageModel({name: attrs.fields.item_name})
			});

			if (this.get('imageUrl') === 'http://lorempixel.com/50/50/food') { //if flickr photo has not been saved
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
	setImage: function( model, url) {
		this.set('imageUrl', url);
		console.log(url);
		//var newImage = new app.ImageModel(obj)
	}

	//TODO What additional logic should live here?
	//Will user be changing data somehow?

});