var app = app || {}
/**
* @description Collection of foods that have been added, synced to firebase
* @description In hindsight, would have organized data differently and
* @description Rather than make calls to new collection, would have written filter methods
* @description and used queries
* @constructor
* @param none - only one instance
*/

var FoodList = Backbone.Firebase.Collection.extend({

	model: app.Food,

	url:'https://my-nutrition-tracker.firebaseio.com/foodList/test',

	urlStr: 'https://my-nutrition-tracker.firebaseio.com/foodList/',
	/**
	* @description syncs data with server based on day in focus
	* @description a workaround since fetch is disabled on firebase when autosync is active
	*/
	initialize: function() {
		this.url =  this.urlStr + app.dateModel.get('todayFileStr');
		var self = this;
		setTimeout( function(self) { //Just enough time to wait for listeners to be updated to new instance of Foodlist
			self.trigger('new')
		},10, self);
	}
});

app.foodList = new FoodList();
