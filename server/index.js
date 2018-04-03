var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost/test');
mongoose.Promise = global.Promise;
var app = express();

app.use(bodyParser.json());

var Post= require('./Post.js');
var User= require('./User.js');

const scoreExp= {$subtract: [{$size: '$upvoted'},{$size: '$downvoted'}]};

function getAggregationStages(req){
	var token= req.query.token;
	var username= '';
	if(token !== undefined)
		username=jwt.verify(token, 'banana').username;
	return [{
		$addFields: {
			score: scoreExp,
			upvote: {
				$in : [username, '$upvoted']
			} ,
			downvote: {
				$in : [username, '$downvoted']
			}
		}
	},{
		$project: {
			title: 1,
			url: 1,
			_id: 1,
			author: 1,
			posted_at: 1,
			upvote: 1,
			downvote: 1,
			score: 1
		}
	}];
}



app.get('/posts/top', (req,res)=>{
	Post.aggregate(getAggregationStages(req)).sort({'score':-1}).exec((err,posts)=>{
		console.log(posts);
		res.json(posts);
	});
});

app.get('/posts/new', (req,res)=>{
	Post.aggregate(getAggregationStages(req)).sort({'posted_at':-1}).exec((err,posts)=>{
		res.json(posts);
	});
});

app.get('/posts/hot', (req,res)=>{
	var aggregationStages=getAggregationStages(req);
	aggregationStages.push({
		$addFields : {
			hotness: {
				//hotness= score-(hours passed since posted)/10
				$subtract: ['$score',{
					$divide: [{
						$subtract: [new Date(), "$posted_at"]
					}, 36000000]
				}]
			}
		}
	});
	Post.aggregate(aggregationStages).sort({'hotness': -1}).exec((err,posts)=>{
		res.json(posts);
	});
});

app.post('/posts/:id/upvote', (req,res)=>{
	var token= req.query.token;
	var username;
	if(token === undefined)
		return;
	else
		username=jwt.verify(token, 'banana').username;
	Post.findOneAndUpdate({
		_id: req.params.id,
		upvoted: {$ne: username}
	}, 
	{
		$push: {upvoted: username},
		$pull: {downvoted: username}
	}, (err, post_id)=>{
		res.send("ok");
	});
});

app.post('/posts/:id/downvote', (req,res)=>{
	var token= req.query.token;
	var username;
	if(token === undefined)
		return;
	else
		username=jwt.verify(token, 'banana').username;
	Post.findOneAndUpdate({
		_id: req.params.id,
		downvoted: {$ne: username}
	}, 
	{
		$push: {downvoted: username},
		$pull: {upvoted: username}
	}, (err, post_id)=>{
		res.send("ok");
	});
});

app.post('/posts/:id/unvote', (req,res)=>{
	var token= req.query.token;
	var username;
	if(token === undefined)
		return;
	else
		username=jwt.verify(token, 'banana').username;
	Post.findOneAndUpdate({
		_id: req.params.id,
	}, 
	{
		$pull: {downvoted: username, upvoted: username},
	}, (err, post_id)=>{
		res.send("ok");
	});
});

app.post('/posts', (req,res)=>{
	var post ={};
	post.title= req.body.title;
	post.url= req.body.url;
	post.author = jwt.verify(req.body.token, 'banana').username; //TODO: handle error.
	console.log(post);
	Post.create(post, (err,posts)=>{
		res.json(post);
	});
});

//TODO: validate, check if user already exists
app.post('/signup', (req,res)=>{
	console.log("in signup");
	const username=req.body.username;
	if(/\s/.test(username)){
		res.json({error: "Username can't contain whitespace"});
		return;
	}
	User.findOne({username: {$regex: new RegExp(username, "i")}}).exec().then(user=>{
		if(user){
			res.json({error: 'Sorry, the username is taken. Please choose another one.'});
			return Promise.reject("Username already exists");
		}
		const password=req.body.password;
		bcrypt.hash(password, 8).then(hash=>{
			let user={};
			user.username=username;
			user.passwordHash=hash;
			return User.create(user);
		}).then(newUser=>{	
			var token= jwt.sign({username: newUser.username}, 'banana'); //TODO: put secret in .env
			res.json({token: token, username: newUser.username});
			console.log("Registerd successfully");
		});
	}).catch(err=>{
		console.log(err);
	});
});

app.post('/login', (req,res)=>{
	console.log("in login");
	var username=req.body.username; //TODO: validate
	console.log(username);
	User.findOne({username: {$regex: username, $options: 'i'}}, (err, user)=>{
		if(err || !user){
			res.json({error: 'User not found'});
			console.log('User not found');
			return;
		}
		bcrypt.compare(req.body.password, user.passwordHash).then(pwdIsCorrect=>{
			if(!pwdIsCorrect){
				res.json({error: 'Wrong Password'});
				return Promise.reject("Wrong Password");
			}
			else{
				var token= jwt.sign({username: user.username}, 'banana'); //TODO: put secret in .env
				res.json({token: token, username: user.username});
				console.log('Logged in');
			}
		}).catch(err=>{
			console.log(err);
		});		
	});
});


app.listen(3001);
console.log("Listening on 3001");