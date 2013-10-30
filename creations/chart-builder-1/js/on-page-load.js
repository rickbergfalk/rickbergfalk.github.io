
$(document).ready(function(){	
	// this runs at startup	
	
	var $dsButton = $('#ds-button');
	var $visButton = $('#vis-button');
	
	// create visualization list popup
	var vislistPopup = new ib.Popup({
			id: "vis-list-container",
			label: "Choose a Visualization",
			html: "<div id='vis-list'></div>"
	});
	$visButton.click(function() {vislistPopup.open();});
	
	// create UL of datasources from datasourceList
	ib.loadDatasourceList(); 		// builds the OptionUp containing the datasource list
	ib.loadWidgetList();			// builds Popup containing visualizations (uses old popups)
	
	var testFilter = new ib.Filter();
	/*
	var $test = $('#test');
	*/
});