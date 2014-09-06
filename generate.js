/* =========================================================================
	Module dependencies.
============================================================================ */  
var express 	= require('express');
var fs 			= require('fs-extra');
var path 		= require('path');
var moment 		= require('moment'); 			// a date library
var ejs 		= require('ejs');
var watch 		= require('watch');
var templates 	= require('./lib/templates'); 	// gets templates easily. Might not be necessary
var _ 			= require('lodash');			// for debounce
var mm 			= require('marky-mark'); 		// easy handling of all those markdown files
var taffy 		= require('taffydb').taffy;



/* =========================================================================
    Directory stuff
	
	APP DIRECTORY - the place where the sea-monster app stuff lives
	USER DIRECTORY - user data land (for a particular website)
		out/
			the generated site
		src/
			all the files get copied into output before generation
		sm-data/
			posts.json
			settings.json
			templates/
				header.ejs
				footer.ejs
				
	Here we should create any user_directories if they don't exist
============================================================================ */

var USER_POSTS_DIRECTORY 	= __dirname + '/post-markdown';
var USER_LAYOUTS_DIRECTORY 	= __dirname + '/layouts';
templates.directory(USER_LAYOUTS_DIRECTORY);



/* =========================================================================
    The Post DB TaffyDB of sorts
============================================================================ */
var db;

function loadPostsDb () {
	var theposts = mm.parseDirectorySync(USER_POSTS_DIRECTORY);
	// flatten theposts
	for (var i= 0; i < theposts.length; i++) {
		var post = theposts[i];
		for (var key in post.meta) {
			post["meta_" + key] = post.meta[key];
		}
	}
	db = taffy(theposts);
}
loadPostsDb();

console.log(JSON.stringify(db().get()[0], null, 2));

/*
console.log(JSON.stringify(db().get()[0], null, 2));
console.log(db().get()); // get all
console.log(db().distinct("title"));
console.log(db().distinct("slug"));
console.log(db().distinct("category"));
console.log(db({category: "Projects"}).get());
//return db().order("meta_date desc").get();
return db({filename: filename}).first();
*/

 
/* =========================================================================
    Very simple Express Setup for previewing site
============================================================================ */
var app = express();
app.use(express.static(__dirname));
app.listen(3000);
console.log('Web server now running. View at http://localhost:3000');
console.log('Press ctrl-c at any time to stop\n');


var isGenerating = false;
var nextRender = null;

var renderIndex = function () {
	console.log('rendering home');
	var renderedHome = ejs.render(templates.templateContent('home'), {
		posts: db().get(), 	// possibly db().order("date desc").get()
		moment: moment,
		//categories: db().distinct("category"),
		title: 'Rick Bergfalk',
		filename: USER_LAYOUTS_DIRECTORY + '/home.ejs'
	});
	fs.outputFileSync(__dirname + '/index.html', renderedHome);
};


var renderAllPosts = function () {
	var posts = db().get();
	posts.forEach(function(post) {
		console.log('rendering post - ' + post.meta.title);
		var html = ejs.render(templates.templateContent('post'), {
			post: post,
			moment: moment,
			//categories: db().distinct("category"),
			title: post.meta.title + " | Rick Bergfalk",
			filename: USER_LAYOUTS_DIRECTORY + '/post.ejs'
		});
		fs.outputFileSync(__dirname + '/posts/' + post.filename + '.html', html);
	});
};

var render = function () {
	if (isGenerating) {
		console.log('already generating - render queued');
		nextRender = true;
	} else {
		loadPostsDb();
		isGenerating = true;
		renderIndex();
		renderAllPosts();
		isGenerating = false;
		if (nextRender) {
			console.log('queued render settings found - generating');
			nextRender = false;
			render();
		}
	}
};


watch.watchTree(USER_POSTS_DIRECTORY, {ignoreDotFiles: true}, _.debounce(render, 1000, false));
watch.watchTree(USER_LAYOUTS_DIRECTORY, {ignoreDotFiles: true}, _.debounce(render, 1000, false));

//render(true);


