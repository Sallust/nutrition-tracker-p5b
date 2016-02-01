var app = app || {};

console.log("Hey from the Todo Collection!")
//The Todo Collection
//No, not the latest fashions from Todo, it's the fancy array holding our todos


var TodoList = Backbone.Collection.extend({


	//Reference to the collection's model
	model: app.Todo,

	//Save the todo items under the todos-backbone namespace... what's a namespace?
	localStorage: new Backbone.LocalStorage('todos-backbone'),

	//Filter out the completed ish
	completed: function() {
		return this.filter(function( todo ) {
			return todo.get('completed')
		});
	},

	remaining: function() {
		return this.without.apply( this, this.completed() ); //underscore function without(array, vallues you want out!)
	},

	//Keeping the Todos in sequential order, despite being saved unordered GUID?
	nextOrder: function() {
		if ( !this.length ) {
			return 1;
		}
		return this.last().get('order') + 1; //last() returns last element
	},

	//Todos sorted by original insertion order
	comparator: function( todo ) {
		return todo.get('order');
	}
});


//Create our global collection of Todos
app.Todos = new TodoList();