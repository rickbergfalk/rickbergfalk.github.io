/* REQUIRES JQUERY */
var Panel = function (seq) {
	var p = this;	
	p.seq = seq || 0;
	p.child = false;
	p.parent = false;
	
	p.$el = $('<div class="panel"></div>').appendTo('body');
	
	p.addHtml = function (html) {
		var $html = $(html).appendTo(p.$el);
		return $html;
	};
	
	p.open = function () {
		var top;
		var left;
		if (p.parent) {
			top = p.parent.$el.position().top - $(window).scrollTop() + 30;
			left = p.parent.$el.position().left + p.parent.$el.width();
		} else {
			top = 30;
			left = 0;
		}
		p.$el.css({
			'display' : 'block',
			'top' : top + 'px',
			'left' : left + 'px',
			'bottom' : '0px',
			'width' : '0px',
			'z-index' : 1000 - p.seq
		});
		p.$el.animate({width: '300px'}, 150, 'swing');
	};
	
	p.close = function (method) {
		switch(method) {
			case "cascade-up":
				p.$el.animate({width: '0px'}, 150, 'swing', function() {
					if (p.parent && p.parent.seq != 0) {p.parent.close('cascade-up');}
					p.close(); // call recursively, and reuse the code! too slick :)
				});
				break;
			default:
				p.$el.remove();
				if (p.parent) {p.parent.child = false;}
				if (p.child) {p.child.parent = false;}
				p = false;
		}
	};

	p.newPanel = function () {
		if (!p.child) {
			var newPanel = new Panel(p.seq + 1);
			p.child = newPanel;
			newPanel.parent = p;
			
			return newPanel;
		} else {
			alert('This panel already has a child panel');
			return false;
		}
	}
	
	p.newCustomPanel = function () {
		var newPanel = p.newPanel();
		if (newPanel) {
			newPanel.open();
			var newAddButton = newPanel.addHtml('<div>make new panel</div>');
			newAddButton.click(newPanel.newCustomPanel);
			var closeUpButton = newPanel.addHtml('<div>close up</div>');
			closeUpButton.click(function() {newPanel.close('cascade-up')});
			newPanel.addHtml('<div>this is content</div><h2>h2</h2><div>this is content</div><h2>h2</h2><div>this is content</div><h2>h2</h2><div>this is content</div><h2>h2</h2><div>this is content</div><h2>h2</h2><div>this is content</div><h2>h2</h2><div>this is content</div><h2>h2</h2><div>this is content</div><h2>h2</h2><div>this is content</div><h2>h2</h2><div>this is content</div><h2>h2</h2><div>this is content</div><h2>h2</h2><div>this is content</div><h2>h2</h2><div>this is content</div><h2>h2</h2><div>this is content</div><h2>h2</h2><div>this is content</div><h2>h2</h2><div>this is content</div><h2>h2</h2><div>this is content</div><h2>h2</h2><div>this is content</div><h2>h2</h2><div>this is content</div><h2>h2</h2><div>this is content</div><h2>h2</h2><div>this is content</div><h2>h2</h2><div>this is content</div><h2>h2</h2><div>this is content</div><h2>h2</h2><div>this is content</div><h2>h2</h2>');
		} else {
			alert('and so we are not creating another child panel');
		}		
	}
}	


var myPanel = new Panel();

var btnCloseMainPanel = myPanel.addHtml('<div>Close Main Panel</div>');
btnCloseMainPanel.click(myPanel.close);

var btnOpenChildPanel = myPanel.addHtml('<div>Open Child Panel</div>');
btnOpenChildPanel.click(myPanel.newCustomPanel);

myPanel.open();