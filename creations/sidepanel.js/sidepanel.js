/* REQUIRES JQUERY */

var SidePanel = function () {
	var master = this;
	var panels = [];
	var nextPanelNum = 1;
	var $fade = $('<div id="fade"></div>').appendTo('body');
	
	var Panel = function () {
		var p = this;	
		
		p.seq = 0;
		
		p.$el = $('<div class="panel"></div>').appendTo('body');
		
		p.addHtml = function (html) {
			var $html = $(html).appendTo(p.$el);
			return $html;
		};
		
		p.open = function () {
			master.open(p);
		};
		
		p.close = function () {
			master.close(p);
		};
	}	
	
	this.newPanel = function () {

		var newPanel = new Panel();
		newPanel.open();
		
		/* adding custom behavior */
		var newAddButton = newPanel.addHtml('<div>make new panel</div>');
		newAddButton.click(master.newPanel);
		
		var closeUpButton = newPanel.addHtml('<div>close up</div>');
		closeUpButton.click(newPanel.close);
		
		return newPanel;
	}
	
	this.open = function (panel) {
		var top = nextPanelNum * 30;
		var left = (nextPanelNum - 1) * 300;
		
		if (nextPanelNum > 1) {
			$fade.css({'filter' : 'alpha(opacity=80)'}).fadeIn(); 
		}
		
		if (nextPanelNum > 3) {
			panel.seq = 0;
			alert('sorry, but no more than 3 panels can be open at 1 time');
		} else {
			panels[nextPanelNum] = panel;
			panel.seq = nextPanelNum;
			panel.$el.css({
				'display' : 'block',
				'top' : top + 'px',
				'left' : '0px', 
				'bottom' : '0px',
				'width' : '280px',
				'z-index' : 1000 - panel.seq
			});
			panel.$el.animate({left: left + 'px'}, 250, 'swing');
			
			nextPanelNum = panel.seq + 1;
		}
	}
	
	this.close = function (panel) {
		if (panel.seq == 2 && panels[3]) {
			master.close(panels[3]);
		} else if (panel.seq == 3) {
			panel.$el.animate({left: '0px'}, 350, 'swing', panel.$el.remove);
			nextPanelNum = 3;
			panels[3] = false;
			master.close(panels[2]); // call recursively ...
		} else if (panel.seq == 2) {
			panel.$el.animate({left: '0px'}, 350, 'swing', panel.$el.remove);
			panels[2] = false;
			nextPanelNum = 2;
			$fade.fadeOut();
		}
	}
}

var sidePanel = new SidePanel();

var myPanel = sidePanel.newPanel();
