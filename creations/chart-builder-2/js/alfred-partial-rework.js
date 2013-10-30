/*******************************************************************************

	UI "Classes"

*******************************************************************************/ 

	Button = function(text) {
		this.text = text;
		this.$button = $('<div class="button">' + text + '</div>');
		this.click = function(f) {
			if (f) {
				this.$button.click(f);
			} else {
				this.$button.click();
			}
		};
		this.setText = function(text) {
			this.text = text;
			this.$button.text(text);
		};
		this.select = function() {
			this.$button.addClass('selected-button');
		};
		this.deselect = function() {
			this.$button.removeClass('selected-button');
		};
		this.addClass = function(cssClass) {
			this.$button.addClass(cssClass);
		};
		this.removeClass = function(cssClass) {
			this.$button.removeClass(cssClass);
		};
	};
	
	ButtonHolder = function(label) {
		this.$container = $('<div class="button-holder"></div>');
		
		if (label) {
			this.label = label;
			this.$label = $('<div class="button-holder-label">' + this.label + '</div>').appendTo(this.$container);
		} else {
			this.label = '';
		}
		this.newButton = function(text) {
			var button = new Button(text); 
			button.$button.appendTo(this.$container);
			return button;
		};
		this.appendTo = function(el) {
			this.$container.appendTo(el);
		};
		this.addClass = function(cssClass) {
			this.$container.addClass(cssClass);
		};
		this.removeClass = function(cssClass) {
			this.$container.removeClass(cssClass);
		};
	};


/*******************************************************************************

	Datapoints

*******************************************************************************/ 

var DatapointCollection = function(facts) {
	var me = this;
	var datapoints = {};
	
	// adds datapoint passed to method.
	// if it doesn't yet exist, it adds it and creates the UI for it.
	// Otherwise is just adds the fact to it
	this.addDatapoint = function(datapoint) {	
		if(datapoints[datapoint.id]) {
			datapoints[datapoint.id].fact.push(datapoint.fact);
		} else {
			datapoint.outputButton = new Button(datapoint.name);
			datapoint.filterButton = new Button(datapoint.name);
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



var currentWidget = {
	// this owns sidebar, active input, set widget, blah blah
}

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
			
			var datapointHolder = new ButtonHolder(key);
			var filterHolder = new ButtonHolder(key);
			datapointHolder.appendTo(isoGrid.$datapointGrid);
			datapointHolder.addClass('iso');
			datapointHolder.addClass('datapoint-holder');
			filterHolder.appendTo(isoGrid.$datapointGrid);
			filterHolder.addClass('iso');
			filterHolder.addClass('filter-holder');

			
			$.each(label, function(key, datapoint) {
				
				// add datapoint class to label
				datapointHolder.addClass('datapoint-' + datapoint.type);
				filterHolder.addClass('filter-' + datapoint.type);
				
				// determine whether the datapoint has a time class
				var time = '';
				if (datapoint.isSequence == true) {
					datapointHolder.addClass('datapoint-time');
					filterHolder.addClass('filter-time');
					time = 'time';
				} 
				
				var datapointButton = datapointHolder.newButton(datapoint.name);
				datapointButton.click(function() {
					controller.selectDatapoint(datapoint, sidebar, isoGrid);
				});
				datapoint.datapointButton = datapointButton;

				
				var filterButton = filterHolder.newButton(datapoint.name);
				filterButton.click(function() {
					controller.selectFilter(datapoint, sidebar, isoGrid);
				});
				datapoint.filterButton = filterButton;

			});
		});
	};
	
	controller.selectWidget = function(Widget, sidebar, isoGrid) {
		
		// deselect all datapoints
		$('.selected-button').removeClass('selected-button');
		
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
		var sideDatapointHolder = new ButtonHolder('Data');
		sideDatapointHolder.appendTo(sidebar.$sidecontent);
		
		$.each(sidebar.widget.inputs, function(key, input) {
			var button = sideDatapointHolder.newButton(input.label);
			button.click(function() {
				$('.active-input').removeClass('active-input');
				button.addClass('active-input');
				sidebar.activeInput = button;
				// if active input has a datapoint button
				// highlight the datapoint in the isogrid
				if (sidebar.activeInput.datapoint) {
					sidebar.activeInput.datapoint.datapointButton.addClass('active-input');
				}
				// load appropriate data elements
				isoGrid.$datapointGrid.isotope({filter: '.datapoint-' + input.type});
			});
		});
		
		var addFilterHolder = new ButtonHolder('Filters');
		addFilterHolder.appendTo(sidebar.$sidecontent);
		
		var filterHolder = new ButtonHolder('');
		filterHolder.appendTo(sidebar.$sidecontent);
		
		var addFilterButton = addFilterHolder.newButton('Add Filter');
		addFilterButton.click(function() {
			var newFilterButton = filterHolder.newButton('New Filter');
			newFilterButton.click(function() {
				$('.active-input').removeClass('active-input');
				newFilterButton.addClass('active-input');
				sidebar.activeInput = newFilterButton;
				if (sidebar.activeInput.datapoint) {
					sidebar.activeInput.datapoint.filterButton.addClass('active-input');
				}
				isoGrid.$datapointGrid.isotope({filter: '.filter-holder'});
			});
			newFilterButton.click();
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
			sidebar.activeInput.datapoint.datapointButton.deselect();
		}
		
		// mark clicked datapoint as selected
		datapoint.datapointButton.select();
		
		sidebar.activeInput.datapoint = datapoint;
		sidebar.activeInput.setText(datapoint.name);
		sidebar.activeInput.removeClass('active-input');
		
		isoGrid.$datapointGrid.isotope({filter: ':not(*)'});
	}

	controller.selectFilter = function(datapoint, sidebar, isoGrid) {
		if (sidebar.activeInput.datapoint) {
			sidebar.activeInput.datapoint.filterButton.deselect();
		}
		
		datapoint.filterButton.select();
		
		sidebar.activeInput.datapoint = datapoint;
		sidebar.activeInput.setText(datapoint.name);
		sidebar.activeInput.removeClass('active-input');
		
		isoGrid.$datapointGrid.isotope({filter: ':not(*)'});
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