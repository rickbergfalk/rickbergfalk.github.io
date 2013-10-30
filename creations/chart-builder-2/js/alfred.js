
var Button = function(text) {
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
	this.makeActive = function () {
		this.$button.addClass('active-input');
	};
	this.makeInactive = function () {
		this.$button.removeClass('active-input');
	};
};

	
var ButtonHolder = function(label) {
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


$(document).ready(function(){	
	var $sidebar = $('#sidebar');
	var $sidecontent = $('<div id="sidecontent"></div>').appendTo($sidebar);
	
	// this owns sidebar, active input, set widget, blah blah
	var currentWidget = {
		activeInput: {},
		widget: {},
		$sidewidget: {},
		$visOverlay: {},
		
		receiveWidget: function (Widget) {
			// WAS controller.selectWidget
			// deselect all datapoints
			$('.selected-button').removeClass('selected-button');
			
			$sidecontent.empty();

			currentWidget.$sidewidget = $('<div id="side-widget" class="iso iso-vis"></div>');
			currentWidget.$sidewidget.appendTo($sidecontent);
			
			currentWidget.widget = new Widget();
			currentWidget.widget.drawdemo('side-widget');
			currentWidget.widget.$visOverlay = $('<div class="vis-overlay"></div>')
							.appendTo(currentWidget.$sidewidget)
							.click(isoGrid.showVis);
			
			// Create buttons for each input defined for the widget
			var sideDatapointHolder = new ButtonHolder('Data');
			sideDatapointHolder.appendTo($sidecontent);
			
			$.each(currentWidget.widget.inputs, function (key, input) {
				var button = sideDatapointHolder.newButton(input.label);
				button.click(function () {
					$('.active-input').removeClass('active-input');
					button.makeActive();
					currentWidget.activeInput = button;
					// if active input has a datapoint button
					// highlight the datapoint in the isogrid
					if (currentWidget.activeInput.datapoint) {
						currentWidget.activeInput.datapoint.datapointButton.makeActive();
					}
					// load appropriate data elements
					isoGrid.$isoGrid.isotope({filter: '.datapoint-' + input.type});
				});
			});
			
			var addFilterHolder = new ButtonHolder('Filters');
			addFilterHolder.appendTo($sidecontent);
			
			var filterHolder = new ButtonHolder('');
			filterHolder.appendTo($sidecontent);
			
			var addFilterButton = addFilterHolder.newButton('Add Filter');
			addFilterButton.click(function() {
				var newFilterButton = filterHolder.newButton('New Filter');
				newFilterButton.click(function() {
					$('.active-input').removeClass('active-input');
					newFilterButton.makeActive();
					currentWidget.activeInput = newFilterButton;
					if (currentWidget.activeInput.datapoint) {
						currentWidget.activeInput.datapoint.filterButton.makeActive();
					}
					isoGrid.showFilters();
				});
				newFilterButton.click();
			});
		},
		
		receiveDatapoint: function(datapoint) {
			// deselect active inputs current datapoint if it exists
			if (currentWidget.activeInput.datapoint) {
				currentWidget.activeInput.datapoint.datapointButton.deselect();
			}
			datapoint.datapointButton.select();
			currentWidget.activeInput.datapoint = datapoint;
			currentWidget.activeInput.setText(datapoint.name);
			currentWidget.activeInput.makeInactive();
		},
		
		receiveFilter: function(datapoint) {
			if (currentWidget.activeInput.datapoint) {
				currentWidget.activeInput.datapoint.filterButton.deselect();
			}
			datapoint.filterButton.select();
			currentWidget.activeInput.datapoint = datapoint;
			currentWidget.activeInput.setText(datapoint.name);
			currentWidget.activeInput.makeInactive();
		}
	};

	var isoGrid = {
		$output: $('#output'),
		$isoGrid: $('<div id="isogrid"></div>'), // used to be #datapointgrid
		widgetButtons: {},
		initIsotope: function() {
			isoGrid.$isoGrid.isotope({
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
		},
		showVis: function () {
			isoGrid.$isoGrid.isotope({filter: '.iso-vis'});
		},
		showFilters: function () {
			isoGrid.$isoGrid.isotope({filter: '.filter-holder'});
		},
		showNothing: function () {
			isoGrid.$isoGrid.isotope({filter: ':not(*)'});
		},
		createWidgetButtons: function(widgetCollection) {
			// from controller.createWidgetButtons
			$.each(widgetCollection.widgets, function(widgetID, widget) {
			
				isoGrid.widgetButtons[widgetID] = new widget.Obj();		
				isoGrid.widgetButtons[widgetID].$visHolder = $('<div id="' + widgetID + '" class="iso iso-vis"></div>').appendTo(isoGrid.$isoGrid);
				isoGrid.widgetButtons[widgetID].drawdemo(widgetID);
				isoGrid.widgetButtons[widgetID].$visOverlay = $('<div class="vis-overlay"></div>').appendTo(isoGrid.widgetButtons[widgetID].$visHolder);			
				isoGrid.widgetButtons[widgetID].$visOverlay.click(function() {
					currentWidget.receiveWidget(widget.Obj);
					isoGrid.showNothing();
				});
			});
		},
		createDatapointButtons: function(datapointCollection) {
			// from controller.createDatapointButtons
			$.each(datapointCollection.get('label-type'), function(key, label) {
			
				var datapointHolder = new ButtonHolder(key);
				var filterHolder = new ButtonHolder(key);
				datapointHolder.appendTo(isoGrid.$isoGrid);
				datapointHolder.addClass('iso');
				datapointHolder.addClass('datapoint-holder');
				filterHolder.appendTo(isoGrid.$isoGrid);
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
						currentWidget.receiveDatapoint(datapoint);
						isoGrid.showNothing();
					});
					datapoint.datapointButton = datapointButton;

					
					var filterButton = filterHolder.newButton(datapoint.name);
					filterButton.click(function() {
						currentWidget.receiveFilter(datapoint);
						isoGrid.showNothing();
					});
					datapoint.filterButton = filterButton;

				});
			});
		},
		build: function() {
			this.$isoGrid.appendTo(this.$output);
		}
	}
	
	/*******************************************************************************
		Main App Logic
	*******************************************************************************/
	
	var datapoints = new DatapointCollection(facts);
	var widgetCollection = new WidgetCollection();
	widgetCollection.registerWidgets(widgets);
	isoGrid.build();
	isoGrid.createDatapointButtons(datapoints);
	isoGrid.createWidgetButtons(widgetCollection);
	isoGrid.initIsotope();
	
});