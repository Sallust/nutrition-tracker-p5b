var app = app || {};
//initiates Views and passes their corresponding data after DOM elements have loaded
$(function() {
	app.foodListView = new app.FoodListView();
	app.dateView = new app.DateView({model: app.dateModel});
	app.totalsView = new app.TotalsView({model: app.currentTotals});
	app.sidebarView = new app.SidebarView({collection: app.searchResults});
	app.summaryView = new app.SummaryView({model: app.currentTotals});
	app.trendsView = new app.TrendsView({collection: app.totals});
});