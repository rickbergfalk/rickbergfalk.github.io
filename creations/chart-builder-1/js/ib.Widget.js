/* ======= Core Widget ======= */
ib.Widget = function() {
	
};
ib.Widget.prototype.datapoints = {};
ib.Widget.prototype.buildInputs = function() {
	// builds the input gui
	var me = this;
	var $inputHolder = $('#widget-options');
	$inputHolder.empty();
	
	// for each input
	$.each(me.inputs, function(inputKey, input) { 
		// add an <li> to input holder to contain our intput button
		var $li = $('<li></li>').appendTo($inputHolder);
		
		var datapoint = new OptionUp({
			label: input.label,
			buttonLabel: input.label,
			popupLabel: input.label,
			appendTo: $li,
			keepButtonLabel: true
		});
		datapoint.buildDatapointOptions(input.type);
		
		me.datapoints[inputKey] = datapoint;
		
	});
};
