/*
	templates model... thing
	
	gets a list of templates from templates directory
	loads template contents for a given template name
	saves file contents to a template string
	
	
	API
	
	.directory(dir) 			Sets templates.directory to that directory. Otherwise returns directory. Pointless.
	.templateNames() 			returns list of template names, sans .ejs extension 
	.templateContent(name)		returns the content of the requested template. straight from disk
	
	TODO 
	
	.directory() is pointless. 
		Do I remove it? 
		Maybe the method is public, but the property is private?
	
=================================================================== */

var path = require('path');
var fs = require('fs-extra');


/* 
============================================================================= */

var templates = {
	
	directory: undefined,
	
	directory: function (directory) {
		if (directory) templates.directory = directory;
		else return templates.directory;
	},
	
	templateNames: function () {
		var names = [];
		var templateFileNames = fs.readdirSync(templates.directory);
		templateFileNames.forEach(function(fileName) {		
			names.push(fileName.replace('.ejs', ''));
		});
		return names;
	},
	
	templateContent: function (templateName) {
		var filename = templateName.replace(/.ejs/i, ''); // just in case .ejs is passed in.
		var contents = fs.readFileSync(templates.directory + '/' + filename + '.ejs', 'utf8');
		//console.log(filename);
		//console.log(templates.directory + filename + '.ejs');
		return contents;
	}
	
};


// commonJS module systems
if (typeof module !== 'undefined' && "exports" in module) {
	module.exports = templates;
}