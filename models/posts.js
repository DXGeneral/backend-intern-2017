const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

/* Post schema REFINED with comment*/
const schema = new Schema({
	_id: Schema.ObjectId,
	title: String,
	content: String,
	author: String,
	timestamp: Date,
	comment: [{
			author: String,
			comment: String,
			timestamp: Date
		}]
});

var Post = mongoose.model('posts', schema);

/* Create new post */
Post.create = function (title, content, author, callback){
	let post = new Post({
		_id: new ObjectId(),
		title, content, author,
		timestamp: new Date()
	});
	
	post.save(function(err, obj){
		if(err || !obj){
			return callback(err);
		}
		callback(null, obj.toObject());
	});
};

/* List all posts without their content sorted by creation time */
Post.list = function (callback){
	Post.find({}, {_id:1, title:1, content: 1, author:1, timestamp:1}, {sort: {timestamp: -1}}, function(err, posts){
		if (err) return callback(err);
		
		callback(null, posts.map(obj => obj.toObject()));
	});
};

/* Get specific post by ID */
Post.get = function(_id, callback){
	Post.findOne({_id}, {_id:1, title:1, content: 1, author:1, timestamp:1}, function(err, obj){
		if (err || !obj) return callback(err);
		callback(null, obj.toObject());
	});
};

/* Create new comment on post */
Post.addComment = function (_id, author, comment, callback){
	
	Post.update({_id},
		{ $push: {
			comment: {
				author: author,
				comment: comment,
				timestamp: new Date()
				},
			}
	}, function(err, obj){
		if (err || !obj) return callback(err);
		callback(null, {comment:1});
	});
};

/* List all posts without their content sorted by creation time */
/* Get specific post by ID */
Post.getComment = function(_id, callback){
	
	Post.findById({_id},{comment : 1}, function(err, obj){
		if (err || !obj) return callback(err);
		callback(null, obj.toObject());
	});
};

module.exports = Post;