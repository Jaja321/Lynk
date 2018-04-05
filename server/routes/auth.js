var express = require('express');
var router = express.Router();
var User= require('../models/User');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');


router.post('/signup', (req,res)=>{
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

router.post('/login', (req,res)=>{
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

module.exports = router
