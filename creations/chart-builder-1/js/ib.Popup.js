// Fade layer - When clicked it will close the active popup
ib.$fade = $("<div id='fade'></div>");
ib.$fade.click(function() { 
	ib.activePopup.close();
});

ib.activePopup = {};
ib.$body = $('body');


/*
 *  Popup
 *
 *
 */
ib.Popup = function(obj) {
	var me = this;
	// create div
	this.$popup = $("<div id='" + obj.id + "' class='popup-block'></div>");
	this.$popup.html("<h3 class='popup-label'>" + obj.label + "</h3>" + obj.html);
	this.$content = $("<div></div>").appendTo(this.$popup);
	ib.$body.append(this.$popup);
	
	this.$closeButton = $("<a class='button'>closethis</a>");
	this.$closeButton.click( function() {
		me.close(); 
	}); 
	this.$popup.append(this.$closeButton);
	this.value = '';
};
ib.Popup.prototype.addContent = function(content) {
	this.$content.append(content);
}
ib.Popup.prototype.setValue = function(val) {
	this.value = val;
}
ib.Popup.prototype.getValue = function(val) {
	return this.value;
}
ib.Popup.prototype.open = function(onSelectCallback) {
	var me = this;

	// set ui global "activePopup" to point to this popup
	ib.activePopup = me;

	//Fade in the Popup and add close button
	this.$popup.fadeIn();

	// Define margin for center alignment (vertical   horizontal)
	popMargTop = (this.$popup.outerHeight()) / 2;
	popMargLeft = (this.$popup.outerWidth()) / 2;

	// Apply Margin to Popup
	this.$popup.css({
		'margin-top' : -popMargTop,
		'margin-left' : -popMargLeft
	});
	
	//Fade in Background
	//Add the fade layer to bottom of the body tag.
	ib.$body.append(ib.$fade); 
	//Fade in the fade layer - .css({'filter' : 'alpha(opacity=80)'}) is used to fix the IE Bug on fading transparencies 
	ib.$fade.css({'filter' : 'alpha(opacity=80)'}).fadeIn(); 
	
	// call calback (function to execute)
	if (onSelectCallback) {
		this.onSelect = onSelectCallback;
	} else {
		//this.onClose = function() {alert('no callback supplied!');};
	}
	return false;
}
ib.Popup.prototype.onSelect = function() {};
ib.Popup.prototype.select = function(val) {
	this.onSelect.setValue(val);
	this.close();
};
ib.Popup.prototype.close = function() {
	ib.$fade.fadeOut();
	this.$popup.fadeOut();
	return false;
}