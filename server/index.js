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


app.get('/posts/top', (req,res)=>{
	console.log("in posts");
	Post.find({}).sort({'points':-1}).exec((err,posts)=>{
		res.json(posts);
	});
});

app.post('/posts/:id/upvote', (req,res)=>{
	console.log("hey ya");
	Post.findOneAndUpdate({_id: req.params.id}, {$inc:{points:1}}, (err, post_id)=>{
		res.send("ok");
	});
});

app.post('/posts', (req,res)=>{
	console.log("in posts post");
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
	var username=req.body.username;
	User.findOne({username: {$regex: new RegExp(username, "i")}}).exec().then(user=>{
		if(user){
			res.json({error: 'User not found'});
			return Promise.reject("Username already exists");
		}
		var password=req.body.password;
		bcrypt.hash(password, 8).then(hash=>{
			var user={};
			user.username=req.body.username;
			user.passwordHash=hash;
			return User.create(user);
		}).then(newUser=>{
			console.log("Registerd successfully");
			res.send("Registered successfully");
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