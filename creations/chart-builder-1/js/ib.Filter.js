/*
	Filter
	requires
		ib.js
		OptionUp.js
		ib.Datapoint.js
*/

ib.Filter = function() {
	var me = this;
	
	// first set up all the elements needed to hold our widgets
	this.$holder = $('<ul></ul>');
	this.$holderDataPoint = $('<li></li>').appendTo(this.$holder);
	this.$holderOperator = $('<li></li>').appendTo(this.$holder);
	this.$holderValues = $('<li></li>').appendTo(this.$holder);
	this.$valueHolder = $('<ul></ul>').appendTo(this.$holderValues);
	this.$value1 = $('<li></li>').appendTo(this.$valueHolder);
	this.$valueTo = $('<li></li>').appendTo(this.$valueHolder);
	this.$value2 = $('<li></li>').appendTo(this.$valueHolder);
	
	// datapoint
	this.datapoint = new OptionUp({
		label: "Add a Filter",
		buttonLabel: "Add a Filter",
		popupLabel: "",
		appendTo: me.$holderDataPoint,
		keepButtonLabel: false
	});
	this.datapoint.buildDatapointOptions('all');
	this.datapoint.onSelect = function() {
		me.buildOperator();
	};
	
	// operator
	this.operator = {};
	
	// append the Filter object to DOM
	this.$holder.appendTo($('#filters'));
}

ib.Filter.prototype.buildOperator = function () {
	var me = this;
	me.$holderOperator.empty();
	me.resetValue();
	
	// builds/rebuilds the operator OptionUp
	this.operator = new OptionUp({
		label: "",
		buttonLabel: "operator",
		popupLabel: "",
		appendTo: me.$holderOperator,
		keepButtonLabel: false
	});
	this.operator.buildOperatorOptions(me.datapoint.selectedOption.type);
	this.operator.onSelect = function () { 
		me.buildValue();
		//alert('operator selected'); 
	};
}
ib.Filter.prototype.resetValue = function() {
	this.$value1.empty();
	this.$valueTo.empty();
	this.$value2.empty();
}
ib.Filter.prototype.buildValue = function() {
	var me = this;
	var inputHtml = '';
	this.resetValue();
	
	/*	
		2 things to consider
		- what kind of input?
		- how many do we need? 1 or 2?
		
		the same kind of input would be used for both if both were needed
		step 1. determine input widget
		step 2. create 1 or 2 of them, depending on the operator.
	*/
	var dpType = this.datapoint.selectedOption.type; // either string, number, or date
	
	if (dpType == "string") {
		// do a list of values?
		inputHtml = '<input type="text"/>'
	} else if (dpType == "number") {
		// just a text box for a number
		inputHtml = '<input type="text"/>'
	} else if (dpType == 'date') {
		// do a datepicker
		inputHtml = '<input type="text"/>'
	} else {
		// do default
	}
	
	
	var selectedOption = this.operator.selectedOption;
	if (selectedOption.value == '=' || selectedOption.value == '<>' || selectedOption.value == '<' || selectedOption.value == '>' ) {
		// do only 1 of them
		$input1 = $(inputHtml);
		$input1.appendTo(me.$value1);
	} else if (selectedOption.value == 'BETWEEN') {
		// do 2 of them
		$input1 = $(inputHtml);
		$input1.appendTo(me.$value1);
		me.$valueTo.text(' to ');
		$input2 = $(inputHtml);
		$input2.appendTo(me.$value2);
	} else {
		// what's left?
	}
	
}
