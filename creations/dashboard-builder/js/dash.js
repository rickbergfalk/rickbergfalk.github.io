
function booleanToString(bool) {
	if (bool === true) { return "true"; }
	else {return "false";}
}

function stringToBoolean(string) {
	if (string === 'true') { return true; }
	else {return false;}
}

function preselectDropdown(selectElement, valueToMatch) {
	var dropdown = document.getElementById(selectElement);
	// loop through dropdown options
	for (i=0; i <= dropdown.options.length - 1; i++) {
		// if value of option === value to match, select options
		if (dropdown.options[i].value === valueToMatch) {
			dropdown.selectedIndex = i;
		}
	}
}

function colorToArray(color) {
	if (color.substring(0,1) == '#') {
		color = color.substring(1,7);
	}
	colorArray = [color.substring(0,2), color.substring(2,4), color.substring(4,6)];
	for (var i = 0; i < 3; i++) {
		colorArray[i] = parseInt(colorArray[i], 16);
	}
	return colorArray;
}


/*	Function fadeColor
 *	color: starting color
 *	target: target color to fade to
 *	percent: percent of the delta between color and target
 */
function fadeColor(color, target, percent) {
	// put color strings into an array, remove # if present
	color = colorToArray(color);
	target = colorToArray(target);
	
	for (var i = 0; i < 3; i++){
		var delta = target[i] - color[i];
		delta = delta * percent;
		color[i] = color[i] + delta;
		
		// strip decimal (which converts to string) then convert back to number
		color[i] = parseInt(color[i].toFixed())
		
		// convert number base 10 to hex
		color[i] = color[i].toString(16);
		
		// pad in an extra 0 if necessary
		if (color[i] == '0') {color[i] = '00';}
	}
	return '#' + color[0] + color[1] + color[2];
}

// load google APIs. this must be done at this level for scope reasons
google.load("visualization", "1", {packages: ["barchart","linechart","piechart","gauge"],"callback": main()});

function main(){
	// when the document has finished loading
	$(document).ready(function(){
		// hide left menu
		$('#left-menu-design').hide();
		
		// preview/edit icon click event
		$('#menu-edit').click(function(){
			dash.toggleMode();
		});
		
		// save icon click event
		$('.menu-just-for-looks').click(function(){
			alert("This button is just for looks.");
		});
		
		
		// icon settings
		$icon = $('.icon')
		$icon.fadeTo('normal', .80);
		$icon.hover(
			function() {
				$(this).fadeTo(150, 1);
			},
			function() {
				$(this).fadeTo(150, .80);
			}
		);
		
		// button hover
		$menuButton = $('.toolbar li');
		$menuButton.hover(
			function() {
				$(this).addClass('menuHover');
			},
			function() {
				$(this).removeClass('menuHover');
			}
		);
		
		// process JSON
		dash.loadWidgets(widgetJSON);
		
		// set drag/drop behavior
		$('.widget-icon').draggable({revert: true, zIndex: 2700, stack: { group: 'widget-icons' }});
		
		$("#board").droppable({
			accept: '.widget-icon',
			drop: function(event, ui) {
				droppedEl = ui.draggable;
				
				// create drop settings object
				var dropObj = {settings:{}};
				dropObj.settings.xpos = droppedEl.offset().left - $('#board').offset().left;
				dropObj.settings.ypos = droppedEl.offset().top - $('#board').offset().top;
				dropObj.settings.type = droppedEl.attr("widget-type");
				
				// get max width allowed
				var maxWidgetWidth = $('#board').width() - dropObj.settings.xpos;
				if (maxWidgetWidth < 400) {defaultWidgetWidth = maxWidgetWidth - 30;}
				else {defaultWidgetWidth = 400;}
                
				// get max height allowed
				var maxWidgetHeight = $('#board').height() - dropObj.settings.ypos;
                if (maxWidgetHeight < 250) {defaultWidgetHeight = maxWidgetHeight - 30;}
                else {defaultWidgetHeight = 250;}
				
				dropObj.settings.width = defaultWidgetWidth;
				dropObj.settings.height = defaultWidgetHeight;
				
				widObj = dash.buildWidget(dropObj);
				
				// open the dialog
				widObj.initDialog();
			}
		});
	});
}

// namespace for the widget processing engine
var dash = {
	tempID: 1000,
	displayMode: "view",
	// colors generated from colorschemer.com
	colorScheme: ['a34c45', 'ce7c4d', 'fc9048', 'efc00e', '87cc7c', '598762', '3fabeb', '2267a8', '296db0', 'd3598a', 'e83843'],
	fadeTarget: 'eeeeee',
	charts: {}, /* hash for instantiated widgets. widget ID is key */
	obj: {} /* holder for object classes */
}

dash.nextID = function() {
	dash.tempID = dash.tempID + 1;
	return dash.tempID;
}

dash.loadWidgets = function(widgetList){
	// loops through list of widgets and sends each one to the widget builder
	for (var widget in widgetList) {
		if (widgetList.hasOwnProperty(widget)) {
			var wid = widgetList[widget];
			wid = dash.buildWidget(wid);
			if (wid != null) {
				wid.draw();
			}
		}
	}
}

dash.buildWidget = function(widget){
	// instantiates the appropriate widget object based on the type/subtype of the widget
	var obj = null;
	var obj = new dash.obj[widget.settings.type](widget);
	dash.charts[obj.id] = obj;
	return obj;
}
    
dash.toGoogleData = function(widgetData){
	var data = new google.visualization.DataTable();
	var col = -1;
	// for each column
	for (var field in widgetData.fields) {
		if (widgetData.fields.hasOwnProperty(field)) {
			col = col + 1;
			// define the column in google chart
			data.addColumn(widgetData.fields[field].datatype, widgetData.fields[field].label);
			// if this is the first column, 
			// set upper bounds for number of rows
			if (col == 0) {
				data.addRows(widgetData.fields[field].data.length);
			}
			// for each value (row) in the column
			for (var v = 0; v < widgetData.fields[field].data.length; v++) {
				// set value for each row
				data.setValue(v, col, widgetData.fields[field].data[v]);
			}
		}
	}
	// return google visualization's populated DataTable object.
	return data;
}

/*
 *  TOGGLE MODE
 *  Toggles between design and view modes. 
 *  Method not necessary if user is a report consumer only. :)
 */	
dash.toggleMode = function(){
	if(dash.displayMode == "view") {
		// toggle to DESIGN MODE
		
		// slide left menu
		$('#left-menu').animate({left: '20px'}, 600);
		$('#board-wrapper').animate({left: '152px'}, 600);
		
		// set edit button to preview
		$('#menu-edit').html('View Dashboard');
		
		// loops through chart objects and sets resize/drag abilities, hover, chart options gui
		for (var chart in dash.charts) {
			if (dash.charts.hasOwnProperty(chart)) {
				objChart = dash.charts[chart];
				objChart.enableOptions();
			}
		}
		// set mode to design
		dash.displayMode = "design";		
	} else if(dash.displayMode == "design") {
		// toggle to VIEW MODE
		
		// set edit button to preview
		$('#menu-edit').html('Edit Dashboard');
		
		// slide left menu
		$('#left-menu').animate({left: '-160px'}, 600);
		$('#board-wrapper').animate({left: '0px'}, 600);
		
		// since all charts are held in the container,
		// and we don't need specific events for any of them
		// we'll just use the class to select them
		$('.container')
			.unbind()
			.draggable('destroy')
			.resizable('destroy');
		$('.propertiesMenu').fadeOut(600);
		// set mode to view
		dash.displayMode = "view";
	}
}

/* buildForm
 * 
 * Loops through form settings for widget object and builds form and inputs.
 * For now all we'll record in Chart.form is the form id that's assigned.
 * 
 * Called when:
 * - user tries to add widget
 * or
 * - user clicks widget's edit button on a PRE-LOADED widget for the first time
 * 
 * note for future coding: if formInitialized = false then build form 
 * no need to deal with default values since they are set during the openDialog method
 * or do we set them? since each widget will end up with its own form... the values will only need to be set once
 * 
 */
dash.buildForm = function(form){
	// loop through formSetup, build form
	// assign form a sequential ID, as well as elements
	var formID = dash.nextID();
	var inputHTML = "<form title='New Chart' id='" + formID + "'><ol>"
	for (var i = 0; i < form.length; i++) {
		inputHTML = inputHTML + "<li><label>" + form[i].label + "</label>";
		
		if (form[i].type === "select") {
			// loop through list of values and add select/options
			// start select element
			inputHTML = inputHTML + "<select " +
			"name='" +
			form[i].name +
			"' " +
			"id='" +
			dash.nextID() +
			"' " +
			"class='ui-widget-content ui-corner-all' >";
			
			// loop through and build option elements
			for (x = 0; x < form[i].listOfValues.length; x++) {
				inputHTML = inputHTML + "<option value='" + form[i].listOfValues[x].value + "' >" +
				form[i].listOfValues[x].text +
				"</option>";
			}
			
			// finish select element
			inputHTML = inputHTML + "</select>"
		}
		else {
			// build text box
			inputHTML = inputHTML + "<input type='" + form[i].type + "' " +
			"name='" +
			form[i].name +
			"' " +
			"id='" +
			dash.nextID() +
			"' " +
			"class='ui-widget-content ui-corner-all' />";
		}
		
		inputHTML = inputHTML + "</li>"
	}
	inputHTML = inputHTML + "</ol></form>"
	
	var $form = $(inputHTML);
	$form.appendTo($("#dialogForms"));
	
	$form = $("#" + formID);
	$form.ID = formID;
	return $form
}


dash.obj.Widget = function(widget){
	// set ID and increment
	if(widget){
		this.id = dash.nextID();
		this.settings = widget.settings;
	
		// container div - wraps up chart and chart menus
		this.container_div = $('<div></div>');
		this.container_div.attr({
			id: "container" + dash.tempID,
			"class": "container ui-corner-all"
		});
		this.containerCss = {
	        'top' : this.settings.ypos + 'px',
	        'left' : this.settings.xpos + 'px'
	    }
		this.container_div.css(this.containerCss);
		
		// append container to board
		this.container_div.appendTo("#board");
		
		// properties menu div
		this.propertiesMenu_div = $("<div id='" + "propertiesMenu" + this.id + "' class='propertiesMenu'></div>");
		this.propertiesMenu_div
			.appendTo(this.container_div)
			.hide();
		
		var thisObj = this;
		
		// Properties Toolbar
		this.$propToolbar = $("<ul id='propertiesToolbar" + this.id + "' class='toolbar propertiesToolbar'></ul>");
		this.$propToolbar.appendTo(this.propertiesMenu_div);
		
		// Properties Buttons
		this.$editButton = $("<li>edit</li>")
			.appendTo(this.$propToolbar)
			.bind("click", function(e){
				thisObj.openDialog();
			})
			.hover(
				function() {
					$(this).addClass('menuHover');
				},
				function() {
					$(this).removeClass('menuHover');
				}
			);
		
		this.$deleteButton = $("<li>delete</li>")
			.appendTo(this.$propToolbar)
			.bind("click", function(e){
				thisObj.cancelBuild();
			})
			.hover(
				function() {
					$(this).addClass('menuHover');
				},
				function() {
					$(this).removeClass('menuHover');
				}
			);
	
		// PropertiesMenu hover
		this.propertiesMenu_div.hover(
			function () {
				thisObj.propertiesMenu_div.css({'cursor' : 'move'});
				thisObj.$propToolbar.css({'display' : 'block'});
			}, 
			function () {
				thisObj.propertiesMenu_div.css({'cursor' : 'default'});
				thisObj.$propToolbar.css({'display' : 'none'});
			}
		);
	
		this.formInit = false;
	}
}
dash.obj.Widget.prototype.cancelBuild = function(){
	this.container_div.remove();
}

dash.obj.Chart = function(widget){
	if (widget) {
		// call Widget constructor
		dash.obj.Widget.call(this, widget);
		
		// build div to hold chart
		this.chart_div = $("<div></div>");
		this.chart_div.attr({
			id: "chart" + this.id,
			"class": "chart"
		});
		
		// Chart dimensions
		this.chart_div.width(this.settings.width);
		this.chart_div.height(this.settings.height);
		this.chart_div.appendTo(this.container_div);
		
		// DATA
		if (this.settings.dataName) {
			this.data = dash.toGoogleData(dataJSON[this.settings.dataName]);
		} else {
			this.data = {};
		}
		
		this.$form = {};	
	}
}
dash.obj.Chart.prototype = new dash.obj.Widget;

dash.obj.Chart.prototype.data = {};
dash.obj.Chart.prototype.form = [
	{
		name: "title",
		type: "text",
		label: "Chart Title"
	},{
		name: "is3D",
		type: "select",
		label: "Display Style",
		listOfValues: [{
			value: "2D",
			text: "2D"
		},{
			value: "3D",
			text: "3D"
		}]
	},{
		name: "dataName",
		type: "select",
		label: "data",
		listOfValues: [{
			value: "supplierPerformance",
			text: "Supplier Performance"
		},{
			value: "productGroupSalesYTD",
			text: "Product Group Sales YTD"
		},{
			value: "preferredBusinessRanking",
			text: "Preferred Business Ranking"
		}]
	},{
		name: "legend",
		type: "select",
		label: "Legend Position",
		listOfValues: [{
			value: "none",
			text: "none"
		},{
			value: "right",
			text: "right"
		},{
			value: "bottom",
			text: "bottom"
		},{
			value: "left",
			text: "left"
		},{
			value: "top",
			text: "top"
		}]	
	}
];


dash.obj.Chart.prototype.initDialog = function(){
	this.$form = dash.buildForm(this.form);
	var thisObj = this;
	this.$form.dialog({
		bgiframe: true,
		autoOpen: false,
		width: 500,
		height: 600,
		modal: true,
		closeOnEscape: false,
		buttons: {
			'Build Chart': function() {
				thisObj.updateWidget();
				$(this).dialog('close');
			},
			Cancel: function() {
				$(this).dialog('close');
			}
		},
		close: function(){
			if (!thisObj.settings.dataName){
				alert("canceling build...");
				thisObj.cancelBuild();
				thisObj = null;
				// remove the object from the array
				delete dash.charts[this.id];
			}	
		}
	});
	this.formInit = true;
	this.openDialog();
}


// Open Dialog
dash.obj.Chart.prototype.openDialog = function(){
	if (this.formInit == false) {
		this.initDialog();
	}
	// open dialog that contains form
	this.$form.dialog('open');
}

// Update Widget
dash.obj.Chart.prototype.updateWidget = function() {
	// get the form's data
	var formData = $('#' + this.$form.ID).serializeArray();

	// loop through data and start building widget JSON
	for (var field in formData) {	
		field = formData[field];
		
		// convert string boolean to boolean boolean
		if (field.value === "true") {field.value = true;}
		else if (field.value === "false") {field.value = false;}
		
		// assign field value to appropiate piece of widget object
		this.settings[field.name] = field.value;
	};
	
	// fix 3D setting
	if (this.settings.is3D === "3D") {this.settings.is3D = true;} 
	else {this.settings.is3D = false;}
	
	this.data = dash.toGoogleData(dataJSON[this.settings.dataName]);
	
	this.updateOptions();
	this.draw();
	this.enableOptions();
}

// Refresh Dimensions
dash.obj.Chart.prototype.refreshDimensions = function() {
	// gets width and height from container_div and updates properties and chart_div dimensions
	this.settings.width = this.container_div.width();
	this.settings.height = this.container_div.height();
	this.chart_div.width(this.settings.width);
	this.chart_div.height(this.settings.height);
}

// draw
dash.obj.Chart.prototype.draw = function(){
	this.gchart.draw(this.data, this.options);
}

// onResize
dash.obj.Chart.prototype.onResize = function(){
	// update width/height properties from container_div
	this.refreshDimensions();
	// update options
	this.options.width = this.settings.width;
	this.options.height = this.settings.height;
	// draw chart
	this.draw();
}

// Enable Options	
dash.obj.Chart.prototype.enableOptions = function() {
	// object reference for when this isn't refering to the right thing
	var thisObject = this;
	
	// set draggable.
	this.container_div.draggable({
		iframeFix: true,
		containment: 'parent',
		opacity: 0.60,
		zIndex: 2700,
		stack: { group: 'widgets' }
	});
	
	// set resizable
	this.container_div.resizable({
		// helper: 'ui-state-highlight', //this causes containment problems
		// stop:/resize: not used for performance
		stop: function(event, ui){
			thisObject.onResize();
		},
		autoHide: true,
		containment: '#board'
	});
	
	this.propertiesMenu_div.fadeIn(600);
}






dash.obj.BarChart = function(widget){
	dash.obj.Chart.call(this, widget);
	this.gchart = new google.visualization.BarChart(document.getElementById('chart' + this.id));	
	var thisObj = this;
	var selectedColumn = -1;
	this.options = {
		title: this.settings.title,
		is3D: this.settings.is3D,
		legend: this.settings.legend,
		width: this.settings.width,
		height: this.settings.height,
		enableToolTip: false,
		colors: dash.colorScheme
	}
	
	// refresh options
	this.updateOptions = function(){
		this.options.title = this.settings.title;
		this.options.is3D = this.settings.is3D;
		this.options.legend = this.settings.legend;
	}

	// onSelect
	this.onSelect = function(){
		var selection = thisObj.gchart.getSelection();
		
		// loop through selection
        for (var i = 0; i < selection.length; i++) {
            var item = selection[i];
            
			// Bar (cell) was selected
			if (item.row != null && item.column != null) {
				
				var selectedElements = '';
				var c = thisObj.data.getNumberOfColumns();
				for (var z = 0; z < c; z++){
					selectedElements += thisObj.data.getColumnLabel(z) + ": " + thisObj.data.getValue(item.row, z) + " ";
				}
				alert('We could be drilling... ' + selectedElements + '{row:' + item.row + ',column:' + item.column + '}');
            }
            
			// Legend (column) is selected
			else if (item.column != null) {
	            // if selected legend was already selected, reset the colors
				if (item.column === selectedColumn){
					selectedColumn = null;
					thisObj.options.colors = dash.colorScheme;
				}
				else {
					// set selectedColumn for later reference
					selectedColumn = item.column;
					
					// we can highlight column selected
					var colorArray = [];
					var noc = thisObj.data.getNumberOfColumns();
					for (var z=0; z < noc; z++){
						if (z == item.column){
							colorArray[z] = dash.colorScheme[z];
						}
						else {
							colorArray[z] = fadeColor(dash.colorScheme[z], dash.fadeTarget, .8);
						}
					}
					thisObj.options.colors = colorArray;
				}
				
				// draw chart
				thisObj.gchart.draw(thisObj.data, thisObj.options);
	        }
        }
	}
	
	// onMouseOver
	this.onMouseOver = function(e){
		thisObj.gchart.setSelection([e]);
		// thisObj.onSelect(); left off because it triggers drill down!
	}
	
	
	// Customize Chart behavior by adding event listeners
	google.visualization.events.addListener(this.gchart, 'select', this.onSelect);
	google.visualization.events.addListener(this.gchart, 'onmouseover', this.onMouseOver);
	google.visualization.events.addListener(this.gchart, 'onmouseout', function(){thisObj.gchart.setSelection();});

}
dash.obj.BarChart.prototype = new dash.obj.Chart;








dash.obj.PieChart = function(widget){
	dash.obj.Chart.call(this, widget);
	this.gchart = new google.visualization.PieChart(document.getElementById('chart' + this.id));
	var thisObj = this;
	var selectedRow = -1;
	this.options = {
		title: this.settings.title,
		is3D: this.settings.is3D,
		legend: this.settings.legend,
		width: this.settings.width,
		height: this.settings.height,
		colors: dash.colorScheme
	}
	
	
	this.updateOptions = function(){
		this.options.title = this.settings.title;
		this.options.is3D = this.settings.is3D;
		this.options.legend = this.settings.legend;
	}
	
	// onSelect
	this.onSelect = function(){
		var selection = thisObj.gchart.getSelection();
		
		// loop through selection
        for (var i = 0; i < selection.length; i++) {
            var item = selection[i];
            
			// Pie Slice (cell) was selected
			if (item.row != null && item.column != null) {
				var selectedElements = '';
				var c = thisObj.data.getNumberOfColumns();
				for (var z = 0; z < c; z++){
					selectedElements += thisObj.data.getColumnLabel(z) + ": " + thisObj.data.getValue(item.row, z) + " ";
				}
				alert('We could be drilling... ' + selectedElements + '{row:' + item.row + ',column:' + item.column + '}');
            }
			
			// Legend (row) was selected
			else if (item.row != null) {
				// if selected legend was already selected, reset the colors
				if (item.row === selectedRow){
					selectedRow = null;
					thisObj.options.colors = dash.colorScheme;
					thisObj.gchart.setSelection();
				}
				else {
					// set selectedRow for later reference
					selectedRow = item.row;
					
					// we can highlight slice selected
					var colorArray = [];
					var nor = thisObj.data.getNumberOfRows();
					for (var z=0; z < nor; z++){
						if (z == item.row){
							colorArray[z] = dash.colorScheme[z];
						}
						else {
							colorArray[z] = fadeColor(dash.colorScheme[z], dash.fadeTarget, .8);
						}
					}
					thisObj.options.colors = colorArray;
				}
				
				// draw chart
				thisObj.gchart.draw(thisObj.data, thisObj.options);
	        }
        }
	}
	
	
	// onMouseOver
	this.onMouseOver = function(e){
		thisObj.gchart.setSelection([e]);
		// thisObj.onSelect(); left off because it triggers drill down!
	}
	
	
	// Customize Chart behavior by adding event listeners
	google.visualization.events.addListener(this.gchart, 'select', this.onSelect);
	google.visualization.events.addListener(this.gchart, 'onmouseover', this.onMouseOver);
	google.visualization.events.addListener(this.gchart, 'onmouseout', function(){thisObj.gchart.setSelection();});
}
dash.obj.PieChart.prototype = new dash.obj.Chart;







dash.obj.LineChart = function(widget){
	dash.obj.Chart.call(this, widget);
	this.gchart = new google.visualization.LineChart(document.getElementById('chart' + this.id));
	var thisObj = this;
	var selectedColumn = -1;
	this.options = {
		title: this.settings.title,
		legend: this.settings.legend,
		width: this.settings.width,
		height: this.settings.height,
		colors: dash.colorScheme
	}
	
	
	this.updateOptions = function(){
		this.options.title = this.settings.title;
		this.options.legend = this.settings.legend;
	}
	

	// onSelect
	this.onSelect = function(){
		var selection = thisObj.gchart.getSelection();
		
		// loop through selection
        for (var i = 0; i < selection.length; i++) {
            var item = selection[i];
            
			// line plot (cell) was selected
			if (item.row != null && item.column != null) {
				
				var selectedElements = '';
				var c = thisObj.data.getNumberOfColumns();
				for (var z = 0; z < c; z++){
					selectedElements += thisObj.data.getColumnLabel(z) + ": " + thisObj.data.getValue(item.row, z) + " ";
				}
				alert('We could be drilling... ' + selectedElements + '{row:' + item.row + ',column:' + item.column + '}');
            }
            
			// Legend (column) is selected
			else if (item.column != null) {
	            // if selected legend was already selected, reset the colors
				if (item.column === selectedColumn){
					selectedColumn = null;
					thisObj.options.colors = dash.colorScheme;
				}
				else {
					// set selectedColumn for later reference
					selectedColumn = item.column;
					
					// we can highlight column selected
					var colorArray = [];
					var noc = thisObj.data.getNumberOfColumns();
					for (var z=0; z < noc; z++){
						if (z == item.column){
							colorArray[z] = dash.colorScheme[z];
						}
						else {
							colorArray[z] = fadeColor(dash.colorScheme[z], dash.fadeTarget, .8);
						}
					}
					thisObj.options.colors = colorArray;
				}
				
				// draw chart
				thisObj.gchart.draw(thisObj.data, thisObj.options);
	        }
        }
	}
	
	// onMouseOver
	this.onMouseOver = function(e){
		thisObj.gchart.setSelection([e]);
		// thisObj.onSelect(); left off because it triggers drill down!
	}
	
	
	// Customize Chart behavior by adding event listeners
	google.visualization.events.addListener(this.gchart, 'select', this.onSelect);
	google.visualization.events.addListener(this.gchart, 'onmouseover', this.onMouseOver);
	google.visualization.events.addListener(this.gchart, 'onmouseout', function(){thisObj.gchart.setSelection();});

}
dash.obj.LineChart.prototype = new dash.obj.Chart;








dash.obj.Gauge = function(widget){
	dash.obj.Chart.call(this, widget);
	this.gchart = new google.visualization.Gauge(document.getElementById('chart' + this.id));
	var thisObj = this;
	var selectedColumn = -1;

	this.options = {
		greenFrom: this.settings.greenFrom,
		greenTo: this.settings.greenTo,
		yellowFrom: this.settings.yellowFrom,
		yellowTo: this.settings.yellowTo,
		redFrom: this.settings.redFrom,
		redTo: this.settings.redTo,
		width: this.settings.width,
		height: this.settings.height
	}
	
	
	this.updateOptions = function(){
		this.options.greenFrom = this.settings.greenFrom;
		this.options.greenTo = this.settings.greenTo;
		this.options.yellowFrom = this.settings.yellowFrom;
		this.options.yellowTo = this.settings.yellowTo;
		this.options.redFrom = this.settings.redFrom;
		this.options.redTo = this.settings.redTo;
	}
}
dash.obj.Gauge.prototype = new dash.obj.Chart;