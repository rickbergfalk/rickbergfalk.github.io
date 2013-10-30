function compareName(a,b) {
  if (a.name < b.name)
     return -1;
  if (a.name > b.name)
    return 1;
  return 0;
}

var ib = {};
ib.datasource = {};
ib.datasource.list = {};
ib.datasource.load = function() {};

/*** Widgets ***/
ib.widgets = {};
ib.widgets.definitions = {}; // registered widgets go here
ib.widgets.register = function() {};
ib.widgets.instances = {}; // instantiated widgets go here

ib.$visList = {};

ib.demoObject = {};

ib.registerWidget = function(widgetDefinition) {
	// does all the back end work of building stuff. 
	// IDs are figured and stored. 
	// wid is Widget ID
	var wid;
	
	if ("name" in widgetDefinition) {
		// add widgets entry
		// create widget id, using name replacing the spaces with dashes
		wid = widgetDefinition.name.replace(/ /g, '-');
		
		// create object in ib.widgets.definitions based on widgetDefinition
		ib.widgets.definitions[wid] = widgetDefinition;
		
		// make the widget inherit from The Widget!
		ib.widgets.definitions[wid].Obj.prototype = new ib.Widget();
	} else {
		alert("Widget registration failed - name property is missing.");
	}
};

ib.$dsbutton = $('#ds-button');
ib.loadDatasourceList = function() {
	// sort objects in datasourceList. We want our list alphabetized! (for now)
	datasourceList.sort(compareName);
	
	// build an options array to hold all the datasource selections
	var options = []
	
	// for each datasource in datasourceList, create an option and push it into options[]
	for (var ds in datasourceList) {
		// set ds = to the object we're referencing
		var ds = datasourceList[ds];
		var option = {
			label: ds.name,
			description: ds.description,
			value: ds.name
		};
		options.push(option);
	}
	
	// build the OptionUp!
	var dsbutton = new OptionUp({
		label: " ____________ ",
		buttonLabel: "(Choose a Dataset)",
		popupLabel: "Data Available for Analysis",
		appendTo: ib.$dsbutton,
		keepButtonlabel: false,
		options: options
	});
};


ib.loadWidgetList = function() {
	// create popup with list of available widgets
	// this inefficient, should rewrite
	
	// get vislist
	ib.$visList = $('#vis-list');
	
	for (var definition in ib.widgets.definitions) {
		if (ib.widgets.definitions.hasOwnProperty(definition)) {
			var def = ib.widgets.definitions[definition]
			
			// create visualization type list if type does not exist in #vis-list
			$type = $('#vis-list-' + def.type);
			if ($type.length == 0) {
				$type = $("<ul id='vis-list-" + def.type + "'><li class='vis-label'>" + def.type + "</li></ul>");
				$type.appendTo(ib.$visList);
				// alert('creating ' + ib.widgets[wid].type);
			} else {
				// alert('skipping ' + ib.widgets[wid].type);
			}
			
			// create vis-selection li
			$visSelection = $("<li class='vis-selection'><a>" + def.name + "</a></li>");
			// on click
			$visSelection.bind('click', {vis: def }, function(e) {
				// set ds button text
				$('#vis-button').text(e.data.vis.name);
				// draw a demo chart
				if(e.data.vis.Obj) {
					$('#demo-output').empty();
					ib.demoObject = new e.data.vis.Obj();
					ib.demoObject.drawdemo();
					ib.demoObject.buildInputs();
				};
				// close active popup
				ib.activePopup.close();
			});
			
			// set background image if available
			if("image140" in def) {
					$visSelection.css('background-image',"url('images/" + def.image140 + "')");
			} else {
			
			}
			
			$visSelection.appendTo($type);
		}
	}
}


