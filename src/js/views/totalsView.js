//js/views/totalsView.js

//I will store the view for the totals

var app = app || {};

console.log("grettings from the summary")

app.TotalsView = Backbone.View.extend({
	el:'#totals-view',

	template: _.template($('#totals-template').html() ),

	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
		this.DRICal = app.userInfo.get('DRICal') ; //saving local references for faster calc
		this.DRIFat = app.userInfo.get('DRIFat');
		this.DRIProt = app.userInfo.get('DRIProt');
		this.DRICarb = app.userInfo.get('DRICarb');
		this.DRISug = app.userInfo.get('DRISug');
		this.DRIChol = app.userInfo.get('DRIChol');
		this.DRIFib = app.userInfo.get('DRIFib');


		this.render();
	},
	render: function() {
		var calPercent = this.model.get('cal')/this.DRICal * 100;
		var fatPercent = this.model.get('fat')/this.DRIFat * 100;
		var protPercent = this.model.get('prot')/this.DRIProt * 100;
		var carbPercent = this.model.get('carb')/this.DRICarb * 100;
		var sugPercent = this.model.get('sug')/this.DRISug * 100;
		var cholPercent = this.model.get('chol')/this.DRIChol * 100;
		var fibPercent = this.model.get('fib')/this.DRIFib * 100;



		this.$el.html(this.template({
			calTotal: this.model.get('cal'),
			fatTotal: this.model.get('fat'),
			protTotal: this.model.get('prot'),
			carbTotal: this.model.get('carb'),
			sugTotal: this.model.get('sug'),
			cholTotal:this.model.get('chol'),
			fibTotal: this.model.get('fib'),
			calPercent: calPercent < 100 ? calPercent + '%' : '100%" id="shame-red',
			fatPercent: fatPercent < 100 ? fatPercent + '%' : '100%" id="shame-red',
			protPercent: protPercent < 100 ? protPercent + '%' : '100%" id="success-gold',
			carbPercent: carbPercent < 100 ? carbPercent + '%' : '100%" id="shame-red',
			sugPercent: sugPercent < 100 ? sugPercent + '%' : '100%" id="shame-red',
			cholPercent: cholPercent < 100 ? cholPercent + '%' : '100%" id="shame-red',
			fibPercent: fibPercent < 100 ? fibPercent + '%' : '100%" id="success-gold',
			DRICal: this.DRICal,
			DRIFat: this.DRIFat,
			DRIProt: this.DRIProt,
			DRICarb: this.DRICarb,
			DRISug: this.DRISug,
			DRIChol: this.DRIChol,
			DRIFib: this.DRIFib

		}))
		console.log('I have noticed a change');
	}
})
