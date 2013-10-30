
var ifMissing = function(thing, altvalue) {
	if (thing) {
		return thing;
	} else {
		return altvalue;
	}
};

/* 
   OptionUp
 
	A button that kicks off a popup full of options. replaces a dropdown interface.
	It holds a value, its own fade layer, and it handy for rapid UI design.
 
	obj:
		label
		options {label, value, description, category, sql} -- modify as necessary
		
	It'll be called like this:
	
	var myOptionUp = new OptionUp({
		label: "Select a Data Source",
		buttonLabel: "the label for the button",
		popupLabel: "the label/header inside the popup window",
		appendTo: some-Element,
		keepButtonLabel: true,
		onSelect: callbackfunction,
		options: [{
			label: "l1",
			description: "new desc",
			value: "l1"
		},{
			label: "l2",
			description: "new desc",
			value: "l2"
		},{
			label: "l3",
			description: "new desc",
			value: "l3"
		}]
	});
	myOptionUp.open();
 */
OptionUp = function(obj) {
	var me = this;
	this.label = obj.label;
	
	this.buttonLabel = ifMissing(obj.buttonLabel, obj.label);
	this.popupLabel = ifMissing(obj.popupLabel, obj.label);
	this.keepButtonLabel = ifMissing(obj.keepButtonLabel, false);
	this.onSelect = ifMissing(obj.onSelect, function() {});
	
	this.selectedOption = {};
	
	// create the button that'll be built
	this.$button = $("<a class='big-text-button'>" + this.buttonLabel + "</a>");
	this.$button.click(function() {
		me.open();
	});
	if (obj.appendTo) {
		this.$button.appendTo(obj.appendTo);
	}
	
	
	// create containing div for popup part.
	this.$container = $("<div class='option-up'></div>");
	this.$popupLabel = $("<h3>" + this.popupLabel + "</h3>");
	this.$popupLabel.appendTo(this.$container);
	this.$options = $("<ul></ul>");
	this.$options.appendTo(this.$container);
	this.setOptions(obj.options);
		
	// define close button
	this.$closeButton = $("<a class='big-text-button'>CANCEL</a>");
	this.$closeButton.click( function() {
		me.close(); 
	}); 
	this.$closeButton.appendTo(this.$container);
	
	// create fade layer
	// Fade layer - When clicked it will close the active popup
	this.$fade = $("<div id='fade'></div>");
	this.$fade.click(function() { 
		me.close();
	});
	
	// add OptionUp to html body
	this.$body = $('body');
	this.$body.append(this.$container);
};

OptionUp.prototype.getValue = function(val) {
	return this.value;
}
OptionUp.prototype.open = function(onSelectCallback) {
	var me = this;

	//Fade in the OptionUp and add close button
	this.$container.fadeIn();

	// Define margin for center alignment (vertical   horizontal)
	popMargTop = (this.$container.outerHeight()) / 2;
	popMargLeft = (this.$container.outerWidth()) / 2;

	// Apply Margin to OptionUp
	this.$container.css({
		'margin-top' : -popMargTop,
		'margin-left' : -popMargLeft
	});
	
	//Fade in Background
	//Add the fade layer to bottom of the body tag.
	this.$body.append(this.$fade); 
	//Fade in the fade layer - .css({'filter' : 'alpha(opacity=80)'}) is used to fix the IE Bug on fading transparencies 
	this.$fade.css({'filter' : 'alpha(opacity=80)'}).fadeIn(); 
	
	return false;
}
OptionUp.prototype.close = function() {
	this.$fade.fadeOut();
	this.$container.fadeOut();
	return false;
}

OptionUp.prototype.setOptions = function(options) {
	var me = this;
	
	// for each option, create <li> and append to $options <ul>
	for (var o in options) {
		var option = options[o];
		var labelHtml = "<a>" + option.label + "</a>";
		var descHtml = ""
		if (option.description) { 
			descHtml = "<div>" + option.description + "</div>";
		}
		
		var $li = $("<li class=''>" + labelHtml + descHtml+ "</li>");
		$li.bind('click', {opt: option}, function(e) {
			// on click set ds button text and close active popup
			me.selectedOption = e.data.opt;
			if (me.keepButtonLabel == true) {
				me.$button.text(me.buttonLabel + ' - ' + e.data.opt.label);
			} else {
				me.$button.text(e.data.opt.label);
			}
			me.onSelect();
			me.close();
		});
		$li.appendTo(this.$options);
	}
}
OptionUp.prototype.buildDatapointOptions = function(type) {
	var options = [];
	var addToOptions = function(dsitems) {
		for (var i in dsitems) {
			var item = dsitems[i];
			options.push({
				label: item.label,
				description: '',
				value: item.label,
				type: item.type,
				sql: item.sql
			})
		}
	}
	
	switch(type) {
		case "dimension":
			addToOptions(datasource.dimensions);
			break;
		case "measure":
			addToOptions(datasource.measures);
			break;
		case "datetime":
			addToOptions(datasource.datetimes);
			break;
		default:
			addToOptions(datasource.dimensions);
			addToOptions(datasource.datetimes);
			addToOptions(datasource.measures);
	}
	
	// rebuild options?
	this.setOptions(options);
}
OptionUp.prototype.buildOperatorOptions = function(type) {
	// fill in options based on the datapoint type
	var options = [];
	switch(type) {
		case "string":
			options.push({ label: "=", value: "=" });
			options.push({ label: "<>", value: "<>" });
			break;
		case "number":
			options.push({ label: "=", value: "=" });
			options.push({ label: "<>", value: "<>" });
			options.push({ label: ">", value: ">" });
			options.push({ label: "<", value: "<" });
			options.push({ label: "is between", value: "BETWEEN" });
			break;
		case "date":
			options.push({ label: "=", value: "=" });
			options.push({ label: "<>", value: "<>" });
			options.push({ label: ">", value: ">" });
			options.push({ label: "<", value: "<" });
			options.push({ label: "is between", value: "BETWEEN" });
			break;
		default:
			options.push({ label: "=", value: "=" });
			options.push({ label: "<>", value: "<>" });
	}
	this.setOptions(options);
}