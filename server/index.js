var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var posts = require('./routes/posts');
var auth = require('./routes/auth');
var cors = require('cors')


var mongourl = 'mongodb://localhost:27017/test'
if(process.env.NODE_ENV === 'production')
  mongourl = 'mongodb://admin:20061996@ds235239.mlab.com:35239/heroku_qsr632fn'
mongoose.connect(mongourl);
mongoose.Promise = global.Promise;

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/posts', posts);
app.use('/auth', auth);

var port = process.env.PORT || 3001;
app.listen(port);
console.log("Listening on 3001");