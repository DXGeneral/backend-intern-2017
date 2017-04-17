// http://www.restapitutorial.com/httpstatuscodes.html

const Post = require("../models/posts");

module.exports = function(router){
	
	// API list all posts
	router.get("/posts", function(req, res){
		Post.list(function(err, posts){			
			if (err) {	
				res.status(500);
				res.json({_message: err});
			} else {
				res.json({ "_data": posts });
			}
		});
	});
	
	// API get post by id
	router.get("/posts/:_id", function(req, res){
		const _id = req.params._id;
		Post.get(_id, function(err, post){			
			if (err) {	
				res.status(500);
				res.json({_message: err});
			} else {
				res.json({ "_data": post });		
			}
		});
	});

	// API make new posts
	
	router.post("/posts", function(req, res){
		
		// GET all parameters
		var title = req.body.title;
		var content = req.body.content;
		var author = req.body.author;

		Post.create(title, content, author, function(err, posts){			
			if (err) {	
				res.status(500);
				res.json({_message: err});
			} else {
				res.json({ "_data": posts });
			}
		});
	});
	
	// API make new comment on a posts
	router.post("/posts/:_id/comments", function(req, res){
		
		const _id = req.params._id;
		var comment = req.body.comment;
		var author = req.body.author;
		
		Post.addComment(_id, author, comment, function(err, posts){			
			if (err) {	
				res.status(500);
				res.json({_message: err});
			} else {
				res.json({ "_data": posts });
			}
		});
	});
	
	// API list all comment from a posts
	router.get("/posts/:_id/comments", function(req, res){
		const _id = req.params._id;
		Post.getComment(_id, function(err, post){			
			if (err) {	
				res.status(500);
				res.json({_message: err});
			} else {
				res.json({ "_data": post });		
			}
		});
	});
};