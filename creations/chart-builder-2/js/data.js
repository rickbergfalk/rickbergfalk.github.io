/*******************************************************************************

	Facts

*******************************************************************************/ 
var facts = {
		
	Sales: {
		datapoints : {
			// dimensions
			region: {
				type: 'dimension',
				name: 'Region',
				label: 'Store/Region'
			},
			state: {
				type: 'dimension',
				name: 'State',
				label: 'Store/Region'
			},
			store: {
				type: 'dimension',
				name: 'Store',
				label: 'Store/Region'
			},
			menuitemtype: {
				type: 'dimension',
				name: 'Menu Item Type',
				label: 'Menu'
			},
			menuitem: {
				type: 'dimension',
				name: 'Menu Item',
				label: 'Menu'
			},
			// measures
			quantity: {
				type: 'measure',
				name: 'Quantity',
				label: 'Sales'
			},
			salesamount: {
				type: 'measure',
				name: 'Sales Amount',
				label: 'Sales'
			},
			costamount: {
				type: 'measure',
				name: 'Cost Amount',
				label: 'Sales'
			},
			// sequences/time
			date : {
				type: 'dimension',
				name: 'Date',
				isSequence: true,
				label: 'Date/Time'
			},
			day: {
				type: 'dimension',
				name: 'Day',
				isSequence: true,
				label: 'Date/Time'
			},
			week: {
				type: 'dimension',
				name: 'Week',
				isSequence: true,
				label: 'Date/Time'
			},
			yearweek: {
				type: 'dimension',
				name: 'Year-Week',
				isSequence: true,
				label: 'Date/Time'
			},
			month: {
				type: 'dimension',
				name: 'Month',
				isSequence: true,
				label: 'Date/Time'
			},
			yearmonth: {
				type: 'dimension',
				name: 'Year-Month',
				isSequence: true,
				label: 'Date/Time'
			},
			quarter: {
				type: 'dimension',
				name: 'Quarter',
				isSequence: true,
				label: 'Date/Time'
			},
			yearquarter: {
				type: 'dimension',
				name: 'Year-Quarter',
				isSequence: true,
				label: 'Date/Time'
			},
			year: {
				type: 'dimension',
				name: 'year',
				isSequence: true,
				label: 'Date/Time'
			}
		}
	},
	timemanagement: {
		datapoints: {
			// dimensions
			region: {
				type: 'dimension',
				name: 'Region',
				label: 'Store/Region'
			},
			state: {
				type: 'dimension',
				name: 'State',
				label: 'Store/Region'
			},
			store: {
				type: 'dimension',
				name: 'Store',
				label: 'Store/Region'
			},
			employee: {
				type: 'dimension',
				name: 'employee',
				label: 'Employee'
			},
			// measures
			hoursworked: {
				type: 'measure',
				name: 'Hours Worked',
				label: 'Time Management'
			},
			hoursovertime: {
				type: 'measure',
				name: 'Hours Overtime',
				label: 'Time Management'
			},
			// sequences/time
			date : {
				type: 'dimension',
				name: 'Date',
				isSequence: true,
				label: 'Date/Time'
			},
			day: {
				type: 'dimension',
				name: 'Day',
				isSequence: true,
				label: 'Date/Time'
			},
			week: {
				type: 'dimension',
				name: 'Week',
				isSequence: true,
				label: 'Date/Time'
			},
			yearweek: {
				type: 'dimension',
				name: 'Year-Week',
				isSequence: true,
				label: 'Date/Time'
			},
			month: {
				type: 'dimension',
				name: 'Month',
				isSequence: true,
				label: 'Date/Time'
			},
			yearmonth: {
				type: 'dimension',
				name: 'Year-Month',
				isSequence: true,
				label: 'Date/Time'
			},
			quarter: {
				type: 'dimension',
				name: 'Quarter',
				isSequence: true,
				label: 'Date/Time'
			},
			yearquarter: {
				type: 'dimension',
				name: 'Year-Quarter',
				isSequence: true,
				label: 'Date/Time'
			},
			year: {
				type: 'dimension',
				name: 'year',
				isSequence: true,
				label: 'Date/Time'
			}
		}
	},
	customerservice: {
		datapoints: {
			// dimensions
			region: {
				type: 'dimension',
				name: 'Region',
				label: 'Store/Region'
			},
			state: {
				type: 'dimension',
				name: 'State',
				label: 'Store/Region'
			},
			store: {
				type: 'dimension',
				name: 'Store',
				label: 'Store/Region'
			},
			employee: {
				type: 'dimension',
				name: 'employee',
				label: 'Store/Region'
			},
			surveyquestion: {
				type: 'dimension',
				name: 'Survey Question',
				label: 'Customer Satisfaction'
			},
			// measures
			surveyscore: {
				type: 'measure',
				name: 'Survey Score',
				label: 'Customer Satisfaction'
			},
			// sequences/time
			date : {
				type: 'dimension',
				name: 'Date',
				isSequence: true,
				label: 'Date/Time'
			},
			day: {
				type: 'dimension',
				name: 'Day',
				isSequence: true,
				label: 'Date/Time'
			},
			week: {
				type: 'dimension',
				name: 'Week',
				isSequence: true,
				label: 'Date/Time'
			},
			yearweek: {
				type: 'dimension',
				name: 'Year-Week',
				isSequence: true,
				label: 'Date/Time'
			},
			month: {
				type: 'dimension',
				name: 'Month',
				isSequence: true,
				label: 'Date/Time'
			},
			yearmonth: {
				type: 'dimension',
				name: 'Year-Month',
				isSequence: true,
				label: 'Date/Time'
			},
			quarter: {
				type: 'dimension',
				name: 'Quarter',
				isSequence: true,
				label: 'Date/Time'
			},
			yearquarter: {
				type: 'dimension',
				name: 'Year-Quarter',
				isSequence: true,
				label: 'Date/Time'
			},
			year: {
				type: 'dimension',
				name: 'year',
				isSequence: true,
				label: 'Date/Time'
			}
		}
	}
};



/*******************************************************************************

	Chart Definitions

*******************************************************************************/ 

/* ======= Area Chart ======= */
var Area = function() {
	this.inputs = {
		xAxis: {
			label: "x-axis",
			type: "time"
		},
		yAxis: {
			label: "y-axis",
			type: "measure"
		}
	};
	this.drawdemo = function(elementID) {
		l2 = [11, 9, 5, 12, 14];
		l3 = [4, 8, 5, 3, 6];
		plot1b = $.jqplot(elementID,[l2, l3],{
		   title: 'Area Chart',
		   stackSeries: true,
		   showMarker: false,
		   seriesDefaults: {
			   fill: true
		   },
		   axesDefaults: {
				show: false,    // wether or not to renderer the axis.  Determined automatically.
				tickOptions: {
					showMark: false,
					showGridline: false, 	// wether to draw a gridline (across the whole grid) at this tick,
					show: false,         	// wether to show the tick (mark and label),
					showLabel: false,    	// wether to show the text label at the tick,
				},
				showTicks: false,        	// wether or not to show the tick labels,
				showTickMarks: false    	// wether or not to show the tick marks
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
	




/* ======= Bubble Chart ======= */
var Plot = function() {
	this.inputs = {
		xaxis: {
			label: "Horizontal Metric",
			type: "measure"
		},
		yaxis: {
			label: "Vertical Metric",
			type: "measure"
		},
		bubblesize: {
			label: "Bubble Size",
			type: "measure"
		},
		bubble: {
			label: "Bubble",
			type: "dimension"
		},
	};
	this.drawdemo = function(elementID) {
		s1 = [[0.6, 2.6, 12, ''], [0.5, 3, 16, ''], [1.3, 2, 17, ''], [1.2, 1.2, 13, ''], [2.7, 1.5, 5], [1.7, 1.2, 4], [1.6, 2.9, 3], [0.3, 0.6, 2], [1.3, 2.2, 10, ''], [1.1, 1.3, 13, ''], [1, 1, 12, ''], [2, 2.5, 11, '']];
		plot1 = $.jqplot(elementID,[s1],{
		   sortData: false,
		   title: 'Bubble Chart',
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
				show: false,    // wether or not to renderer the axis.  Determined automatically.
				tickOptions: {
					showMark: false,
					showGridline: false, 	// wether to draw a gridline (across the whole grid) at this tick,
					show: false,         	// wether to show the tick (mark and label),
					showLabel: false,    	// wether to show the text label at the tick,
				},
				showTicks: false,        	// wether or not to show the tick labels,
				showTickMarks: false    	// wether or not to show the tick marks
			}
	   });
	};
};


var widgets = {

	/* ======= Bar Chart ======= */
	basicBar : {
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
			this.drawdemo = function(elementID) {
				line1 = [1,4,9];
				line2 = [25, 12.5, 6.25];
				plot1 = $.jqplot(elementID, [line1, line2], {
					legend:{show:false, location:'ne'},title:'Column Chart',
					series:[
						{label:'Profits', renderer:$.jqplot.BarRenderer}, 
						{label:'Expenses', renderer:$.jqplot.BarRenderer}
					],
					axesDefaults: {
						show: false,    // wether or not to renderer the axis.  Determined automatically.
						tickOptions: {
							showMark: false,
							showGridline: false, 	// wether to draw a gridline (across the whole grid) at this tick,
							show: false,         	// wether to show the tick (mark and label),
							showLabel: false,    	// wether to show the text label at the tick,
						},
						showTicks: false,        	// wether or not to show the tick labels,
						showTickMarks: false    	// wether or not to show the tick marks
					},
					axes:{
						xaxis:{renderer:$.jqplot.CategoryAxisRenderer}, 
						yaxis:{min:0}
					}
				});
			};
		}
	},

	/* ======= Line Chart ======= */
	lineChart: {
		name: "line chart",
		type: "line",
		image140: "140-line.png",
		Obj: function() {
			this.inputs = {
				xAxis: {
					label: "x-axis",
					type: "time"
				},
				yAxis: {
					label: "y-axis",
					type: "measure"
				}
			};
			
			this.drawdemo = function(elementID) {
				// rendering a test widget
				$.jqplot(elementID,  [[[1, 3],[3,6],[5,12],[7,8],[9,16],[11,24]]],
				{ 
					title:'Line Chart',
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
						showTicks: false,        	// wether or not to show the tick labels,
						showTickMarks: false    	// wether or not to show the tick marks
					},
					grid: {
						drawGridLines: true,        // wether to draw lines across the grid or not.
						gridLineColor: '#cccccc',	// *Color of the grid lines.
						//background: '#FFF',      // CSS color spec for background color of grid.
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
	},

	areaChart: {
		name: "area chart",
		type: "line",
		image140: "140-line-area.png",
		Obj: Area
	},
	
	basicPlot: {
		name: "basic plot",
		type: "plot",
		image140: "140-plot.png",
		Obj: Plot
	}
}