var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var posts = require('./routes/posts');
var auth = require('./routes/auth');

mongoose.connect('mongodb://localhost/test');
mongoose.Promise = global.Promise;
var app = express();

app.use(bodyParser.json());
app.use('/posts', posts);
app.use('/auth', auth);

app.listen(3001);
console.log("Listening on 3001");