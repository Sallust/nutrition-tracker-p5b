var app = app || {};

//Here's the todo model
console.log("Models/todo file says hey!")

app.Todo = Backbone.Model.extend({
	//Defaults ensure each item has both keys
	defaults: {
		title:'',
		completed: false
	},

	//Toggle the completed state of this todo item
	toggle: function() {
		this.save({
			completed: !this.get('completed')
		})
	}

});