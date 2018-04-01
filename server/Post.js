const mongoose= require('mongoose');

const postSchema= mongoose.Schema({
	title:{
		type: String,
		required: true
	},
	url:{
		type: String,
		required: true
	},
	author:{
		type: String,
		required: true
	},
	posted_at:{
		type: Date,
		default: Date.now
	},
	points:{
		type: Number,
		default: 0
	},
	upvoted: {
		type: Array,
		default: []
	},
	downvoted: {
		type: Array,
		default: []
	}
});

module.exports= mongoose.model('Post', postSchema);