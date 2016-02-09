console.log("I'm ready to summarize")


 var app = app || {};

 app.SummaryView = Backbone.View.extend({
 	el:'#summary',

 	template: _.template($('#summary-template').html() ),

 	events: {
 		'click .addFood': 'toggleOpen'
 	},

 	initialize: function() {
 		this.listenTo(this.model, 'change', this.render);
 		this.render();
 	},
 	render: function() {
 		var DRIcal = app.userInfo.get('DRIcal');
 		var consumed = this.model.get('cal');
 		var left = Math.abs(DRIcal - this.model.get('cal'));
 		var isOver = consumed >= DRIcal ? true : false;

 		this.$el.html(this.template({
 			consumed: consumed,
 			left: left,
 			budget: DRIcal,
 			isOver: isOver
 		}));

 		makeDonut( left, consumed ,'#donut');
 		//makeDonut(99, 1 ,'#donut');
		if ( consumed < 10) {
			$('.graph-consumed').hide()
		} else if ( left < 50) {
		 	$('.graph-left').hide()
		} else {
		 	$('.graph-consumed').show();
		 	$('.graph-left').show();
		}
 	},
 	toggleOpen: function() {
 		$('#wrapper').toggleClass('toggled');
 	}

 })

 app.summaryView = new app.SummaryView({model: app.currentTotals});
