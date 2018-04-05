const mongoose= require('mongoose');

const postSchema= mongoose.Schema({
	username:{
		type: String,
		required: true
	},
	passwordHash:{
		type: String,
		required: true
	},
});

module.exports= mongoose.model('User', postSchema);