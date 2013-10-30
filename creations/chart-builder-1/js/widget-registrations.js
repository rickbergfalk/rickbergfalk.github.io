


/* ======= Basic Bar ======= */
ib.registerWidget({
	name: "basic bar",
	type: "bar",
	image80: "80-bar.png",
	image140: "140-bar.png",
	Obj: function() {
		this.inputs = {
			bars: {
				label: "Bars",
				type: "dimension"
			},
			barHeight: {
				label: "Bar Height",
				type: "measure"
			}
		};
		this.drawdemo = function() {
			line1 = [1,4,9, 16];
			line2 = [25, 12.5, 6.25, 3.125];
			plot1 = $.jqplot('demo-output', [line1, line2], {
				legend:{show:true, location:'ne'},title:'Demo Bar Chart',
				series:[
					{label:'Profits', renderer:$.jqplot.BarRenderer}, 
					{label:'Expenses', renderer:$.jqplot.BarRenderer}
				],
				axes:{
					xaxis:{renderer:$.jqplot.CategoryAxisRenderer}, 
					yaxis:{min:0}
				}
			});
		};
	}
});






/* ======= Line Chart ======= */
ib.registerWidget({
	name: "line chart",
	type: "line",
	image140: "140-line.png",
	Obj: function() {
		this.inputs = {
			xAxis: {
				label: "x-axis",
				type: "datetime"
			},
			yAxis: {
				label: "y-axis",
				type: "measure"
			}
		};
		
		this.drawdemo = function() {
			// rendering a test widget
			$.jqplot('demo-output',  [[[1, 20],[3,12],[5,10],[7,8],[9,3],[11,1]]],
			{ 
				title:'line demo',
				series:[{color:'#5FAB78'}],
				axesDefaults: {
					show: false,    // wether or not to renderer the axis.  Determined automatically.
					min: null,      // minimum numerical value of the axis.  Determined automatically.
					max: null,      // maximum numverical value of the axis.  Determined automatically.
					pad: 1.2,       // a factor multiplied by the data range on the axis to give the
									// axis range so that data points don't fall on the edges of the axis.
					ticks: [],      // a 1D [val1, val2, ...], or 2D [[val, label], [val, label], ...]
									// array of ticks to use.  Computed automatically.
					renderer: $.jqplot.LinearAxisRenderer,  // renderer to use to draw the axis
					tickOptions: {
						mark: 'outside',		// Where to put the tick mark on the axis 'outside', 'inside' or 'cross',
						showMark: true,
						showGridline: false, 	// wether to draw a gridline (across the whole grid) at this tick,
						markSize: 4,        	// length the tick will extend beyond the grid in pixels.  For
												// 'cross', length will be added above and below the grid boundary,
						show: true,         	// wether to show the tick (mark and label),
						showLabel: true,    	// wether to show the text label at the tick,
						formatString: ''   		// format string to use with the axis tick formatter
					},
					showTicks: true,        	// wether or not to show the tick labels,
					showTickMarks: false    	// wether or not to show the tick marks
				},
				grid: {
					drawGridLines: true,        // wether to draw lines across the grid or not.
					gridLineColor: '#cccccc',	// *Color of the grid lines.
					background: '#FAFAFA',      // CSS color spec for background color of grid.
					borderColor: '#999999',     // CSS color spec for border around grid.
					borderWidth: 2.0,           // pixel width of border around grid.
					shadow: true,               // draw a shadow for grid.
					shadowAngle: 45,            // angle of the shadow.  Clockwise from x axis.
					shadowOffset: 1.5,          // offset from the line of the shadow.
					shadowWidth: 1,             // width of the stroke for the shadow.
					shadowDepth: 3,             // Number of strokes to make when drawing shadow.
												// Each stroke offset by shadowOffset from the last.
					shadowAlpha: 0.07,			// Opacity of the shadow
				}
			});
		};
	}
});




/* ======= Area Chart ======= */
var Area = function() {
	this.inputs = {
		xAxis: {
			label: "x-axis",
			type: "datetime"
		},
		yAxis: {
			label: "y-axis",
			type: "measure"
		}
	};
	this.drawdemo = function() {
		l2 = [11, 9, 5, 12, 14];
		l3 = [4, 8, 5, 3, 6];
		plot1b = $.jqplot('demo-output',[l2, l3],{
		   stackSeries: true,
		   showMarker: false,
		   seriesDefaults: {
			   fill: true
		   },
		   axes: {
			   xaxis: {
				   renderer: $.jqplot.CategoryAxisRenderer,
				   ticks: ["Mon", "Tue", "Wed", "Thr", "Fri"]
			   }
		   }
		});
	};
};
ib.registerWidget({
	name: "area chart",
	type: "line",
	image140: "140-line-area.png",
	Obj: Area
});




/* ======= Basic Plot ======= */
var Plot = function() {
	this.inputs = {
		something: {
			label: "this is a label",
			type: "measure"
		}
	};
	this.drawdemo = function() {
		s1 = [[0.6, 2.6, 12, 'Ford'], [0.5, 3, 16, 'GM'], [1.3, 2, 17, 'VW'], [1.2, 1.2, 13, 'Mini'], [2.7, 1.5, 5], [1.7, 1.2, 4], [1.6, 2.9, 3], [0.3, 0.6, 2], [1.3, 2.2, 10, 'Franklin'], [1.1, 1.3, 13, 'Nissan'], [1, 1, 12, 'Chrysler'], [2, 2.5, 11, 'Audi']];
		plot1 = $.jqplot('demo-output',[s1],{
		   sortData: false,
		   title: 'Bubble Test',
		   seriesDefaults:{
			   renderer: $.jqplot.BubbleRenderer,
			   rendererOptions: {
				   autoscalePointsFactor: -.15,
				   // autoscaleMultiplier: 0.7,
				   // autoscaleBubbles: false,
				   // varyBubbleColors: false
				   bubbleAlpha: 0.6,
				   highlightAlpha: 0.8
			   },
			   highlightMouseDown: true,
			   shadow: true,
			   shadowAlpha: 0.05
		   },
		   axesDefaults: {
			   // pad: 1.4
		   }
	   });
	};
};
ib.registerWidget({
	name: "basic plot",
	type: "plot",
	image140: "140-plot.png",
	Obj: Plot
});