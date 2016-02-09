function makeLineChart(array, title, width, height, key, IDtag) {
	var width = width;
	var height = height;
	var margins = {
		top: 20,
		right: 20,
		bottom: 20,
		left:50
	}

	var ymin = app.totals.min(function(model){
			return model.get(key)
		}).get(key)

	var ymax = app.totals.max(function(model){
			return model.get(key)
		}).get(key)

	var graph = d3.select(IDtag);

	var xRange = d3.scale.linear().range([margins.left, width - margins.right]).domain([0,array.length]);
	var yRange = d3.scale.linear().range([height - margins.top, margins.bottom]).domain([ymin, ymax]);

	var xLabels = function(d) {
		return !array[d] ? '' : width < 400 ? array[d].x.slice(-2) : array[d].x.slice(-4); //shorter labels when width smaller
	}

	var xAxis = d3.svg.axis()
		.scale(xRange)
		.tickSize(2)
		.tickSubdivide(true)
		.tickFormat(xLabels);
	var yAxis = d3.svg.axis()
		.scale(yRange)
		.ticks(8)
		.tickSize(2) //this is how far the axis labels are from axis
		.orient('left')
		.tickSubdivide(true);

	graph.append('svg:g')
		.attr('class', 'x axis')
		.classed('x-axis', true)
		.attr('transform', 'translate(0,'+ (height - margins.bottom) + ')')
		.call(xAxis);

	graph.append('svg:g')
		.attr('class', 'y axis')
		.classed('y-axis', true)
		.attr('transform', 'translate('+ (margins.left) + ',0)')
		.call(yAxis);

	graph.append('text')
			.attr(('x'), (width/2))
			.attr(('y'), (margins.top))
			.attr('text-anchor', 'middle')
			.classed('graph-title', true)
			.text(title);


	var lineFunc = d3.svg.line()
		.x(function(d, i){
			return xRange(i)
		})
		.y(function(d){
			return yRange(d[key])
		})
		.interpolate('cardinal');

	graph.append('svg:path')
		.attr('d', lineFunc(array))
		.attr('stroke', '#FF8F00')
		.attr('stroke-width', 9)
		.attr('fill', 'none');
}
