/*
 *  Button
 *
 *  clicking/touching opens a popup. (popup is passed a setter function as callback when its closed)
 *  obj contents:
 *  	label
 *  	popup
 *  	holder
 *  	
 */
ib.Button = function(obj) {
	var me = this;
	this.label = obj.label;
    this.type = obj.type;
    this.holder = obj.holder;
    this.popup = obj.popup;
    this.value = '';
    this.$e = $('<li></li>').appendTo(obj.holder);
    this.$a = $('<a class="big-text-button">' + obj.label + '</a>').appendTo(this.$e);
	
	this.$e.click( function() {
		me.popup.open(me);
	});
}
ib.Button.prototype.setValue = function(val) {
	this.value = val;
	this.$a.html(this.label + ': ' + val);
}
ib.Button.prototype.getValue = function() {
	return this.value;
}