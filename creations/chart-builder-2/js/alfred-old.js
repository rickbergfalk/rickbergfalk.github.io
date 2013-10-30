function compareName(a,b) {
  if (a.name < b.name)
     return -1;
  if (a.name > b.name)
    return 1;
  return 0;
};


/*******************************************************************************

	Datapoints

*******************************************************************************/ 

var DatapointCollection = function(facts) {
	var me = this;
	var datapoints = {};
	
	this.addDatapoint = function(datapoint) {	
		if(datapoints[datapoint.id]) {
			datapoints[datapoint.id].fact.push(datapoint.fact);
		} else {
			datapoints[datapoint.id] = datapoint;
		}
	};
	
	this.get = function(options){
		if(!options) {
			return datapoints;
		} else {
			var tempdatapoints = {};
			if (options == 'label') {
				$.each(datapoints, function(key, datapoint) {
					if (!tempdatapoints[datapoint.label]) tempdatapoints[datapoint.label] = [];
					tempdatapoints[datapoint.label].push(datapoint);
				});
			}
			if (options == 'label-type') {
				$.each(datapoints, function(key, datapoint) {
					if (!tempdatapoints[datapoint.label + " " + datapoint.type]) tempdatapoints[datapoint.label + " " + datapoint.type] = [];
					tempdatapoints[datapoint.label + " " + datapoint.type].push(datapoint);
				});
			}
			return tempdatapoints;
		}
	};
	
	// Load fact data
	// loop through facts and add each datapoint to datapoints collection
	$.each(facts, function(factkey, fact) { 
		$.each(fact.datapoints, function(datapointkey, datapoint) {
			var d = {};
			d.id = datapointkey;
			d.fact = [factkey];
			d.name = datapoint.name;
			d.type = datapoint.type;
			d.label = datapoint.label;
			d.isSequence = datapoint.isSequence || false;
			me.addDatapoint(d);
		});		
	});
};



/*******************************************************************************

	Widgets

*******************************************************************************/ 


var Widget = function() {
	var me = this;
	this.datapoints = {};
};
	

var WidgetCollection = function() {
	var me = this;
	this.widgets = {};
	
	this.registerWidgets = function(widgets) {
		// for each widget passed, add to widgets {}
		// and inherit from Widget
		$.each(widgets, function(widgetID, widget) {
			me.widgets[widgetID] = widget;
			me.widgets[widgetID].Obj.prototype = new Widget();
		});
	};

};






/*******************************************************************************

	On Page Load

*******************************************************************************/ 
$(document).ready(function(){	


	/*******************************************************************************

		UI (Views?)

	*******************************************************************************/
	
	// Output and Datapoint Grid UI
	$output = $('#output');
	
	
	// Sidebar
	var sidebar = {};
	sidebar.activeInput = {};
	sidebar.activeFilter = {};
	sidebar.$sidebar = $('#sidebar');
	sidebar.$sidecontent = $('<div id="sidecontent"></div>').appendTo(sidebar.$sidebar);
	sidebar.widget = {};
	sidebar.$sidewidget = {};
	sidebar.$visOverlay = {};
	
	
	// isoGrid
	var isoGrid = {};
	isoGrid.$datapointGrid = $('<div id="datapointgrid"></div>').appendTo($output);
	isoGrid.datapointButtons = {};
	isoGrid.filterPointButtons = {};
	isoGrid.widgetButtons = {};
	
	
	/*******************************************************************************

		Controllers?

	*******************************************************************************/
	
	var controller = {};
	controller.createDatapointButtons = function(datapointCollection, sidebar, isoGrid) {
		
		$.each(datapointCollection.get('label-type'), function(key, label) {
			
			var $labelHolder = $('<div class="iso label">' + key + '</div>').appendTo(isoGrid.$datapointGrid);
			var $filterPointHolder = $('<div class="iso filter">' + key + '</div>').appendTo(isoGrid.$datapointGrid);
			
			$.each(label, function(key, datapoint) {
				
				// add datapoint class to label
				$labelHolder.addClass('label-' + datapoint.type);
				$filterPointHolder.addClass('label-filter-' + datapoint.type);
				
				// determine whether the datapoint has a time class
				var time = '';
				if (datapoint.isSequence == true) {
					$labelHolder.addClass('label-time');
					$filterPointHolder.addClass('label-filter-time');
					time = 'time';
				} 
				
				datapoint.$datapointButton = $('<div class="datapoint ' + datapoint.type + ' ' + time + '">' + datapoint.name + '</div>');
				datapoint.$datapointButton.appendTo($labelHolder);
				datapoint.$datapointButton.click(function() {
					controller.selectDatapoint(datapoint, sidebar, isoGrid); 
				});
				
				datapoint.$filterPointButton = $('<div class="datapoint ' + datapoint.type + ' ' + time + '">' + datapoint.name + '</div>');
				datapoint.$filterPointButton.appendTo($filterPointHolder);
				datapoint.$filterPointButton.click(function() {
					controller.selectDatapoint(datapoint, sidebar, isoGrid); // --------- should change to controller.selectFilter later.
				});
			
			});
		});
	};
	
	controller.selectWidget = function(Widget, sidebar, isoGrid) {
		
		// deselect all datapoints
		$('.datapoint-selected').removeClass('datapoint-selected');
		
		sidebar.$sidecontent.empty();

		sidebar.$sidewidget = $('<div id="side-widget" class="iso iso-vis"></div>');
		sidebar.$sidewidget.appendTo(sidebar.$sidecontent);
		
		sidebar.widget = new Widget();
		sidebar.widget.drawdemo('side-widget');
		sidebar.widget.$visOverlay = $('<div class="vis-overlay"></div>')
						.appendTo(sidebar.$sidewidget)
						.click(function() {
							isoGrid.$datapointGrid.isotope({filter: '.iso-vis'});
						});
		
		// Create buttons for each input defined for the widget
		$.each(sidebar.widget.inputs, function(key, input) {
			input.$buttonLabel = $('<div>' + input.label + '</div>')
				.appendTo(sidebar.$sidecontent);
			
			input.$button = $('<div class="datapoint">' + input.label + '</div>')
				.appendTo(sidebar.$sidecontent)
				.click(function() {
					
					// remove all active-input classes
					$('.active-input').removeClass('active-input');
					
					// set new active input
					sidebar.activeInput = input;
					sidebar.activeInput.$button.addClass('active-input');
					
					// if active input has a datapoint button
					// highlight the datapoint in the isogrid
					if (sidebar.activeInput.$datapointButton) {
						sidebar.activeInput.$datapointButton.addClass('active-input');
					}
					
					// load appropriate data elements
					isoGrid.$datapointGrid.isotope({filter: '.label-' + input.type});
				});
		});
		
		
		var $filters = $('<div>Filters</div>').appendTo(sidebar.$sidecontent);
		var $addFilterButton = $('<div class="datapoint">Add Filter</div>')
				.appendTo(sidebar.$sidecontent)
				.click(function() {
					
					// remove active-input classes
					$('.active-input').removeClass('active-input');
					
					// add a filter button
					var $filterbutton = $('<div class="datapoint active-input">New Filter</div>')
					$filterbutton.appendTo($filters);
					$filterbutton.click(function() {
						sidebar.activeFilter = $filterbutton;
						
						$('.active-input').removeClass('active-input');
						$filterbutton.addClass('active-input');
						
						// on click load filter points
						isoGrid.$datapointGrid.isotope({filter: '.filter'});
					});
					
					$filterbutton.click();
					
				});
	};
	
	controller.createWidgetButtons = function(widgetCollection, sidebar, isoGrid) {
	
		$.each(widgetCollection.widgets, function(widgetID, widget) {
		
			isoGrid.widgetButtons[widgetID] = new widget.Obj();		
			isoGrid.widgetButtons[widgetID].$visHolder = $('<div id="' + widgetID + '" class="iso iso-vis"></div>').appendTo(isoGrid.$datapointGrid);
			isoGrid.widgetButtons[widgetID].drawdemo(widgetID);
			isoGrid.widgetButtons[widgetID].$visOverlay = $('<div class="vis-overlay"></div>').appendTo(isoGrid.widgetButtons[widgetID].$visHolder);			
			isoGrid.widgetButtons[widgetID].$visOverlay.click(function() {
				controller.selectWidget(widget.Obj, sidebar, isoGrid);
				isoGrid.$datapointGrid.isotope({filter: ':not(*)'});
			});
		});
	};
	
	controller.selectDatapoint = function(datapoint, sidebar, isoGrid) {
		// deselect active inputs current datapoint if it exists
		if (sidebar.activeInput.datapoint) {
			sidebar.activeInput.datapoint.$datapointButton.removeClass('datapoint-selected');
		}
		
		// mark clicked datapoint as selected
		datapoint.$datapointButton.addClass('datapoint-selected');
		
		sidebar.activeInput.datapoint = datapoint;
		sidebar.activeInput.$datapointButton = datapoint.$datapointButton;
		sidebar.activeInput.$button.text(datapoint.name);
		sidebar.activeInput.$button.removeClass('active-input');
		
		isoGrid.$datapointGrid.isotope({filter: ':not(*)'});
	}
	
	controller.selectFilter = function(datapoint, sidebar, isoGrid) {
		
	}
	
	
	/*******************************************************************************

		Main App Logic

	*******************************************************************************/
	
	
	var datapoints = new DatapointCollection(facts);

	var widgetCollection = new WidgetCollection();
	widgetCollection.registerWidgets(widgets);
	
	controller.createDatapointButtons(datapoints, sidebar, isoGrid);
	controller.createWidgetButtons(widgetCollection, sidebar, isoGrid);
	
	isoGrid.$datapointGrid.isotope({
		// options
		itemSelector : '.iso', //'.datapoint',
		//layoutMode : 'fitRows',
		getSortData : {
			name : function ( $elem ) {
				return $elem.text();
			}
		},
		sortBy: 'name',
		filter: '.iso-vis'
	});
	
	
});