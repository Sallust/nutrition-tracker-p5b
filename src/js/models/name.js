//js/models/name.js

app.Name = Backbone.Model.extend({
	defaults: {
		text:'Sample Food'
	},


	initialize: function(attrs) {
		try {
			this.set({
				text: attrs.text
			})

		} catch (e) {
			console.log(e)
		}
	}
})