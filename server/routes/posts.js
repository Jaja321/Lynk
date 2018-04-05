var express = require('express');
var router = express.Router();
var Post= require('../models/Post.js');
var utils = require('../utils');

const pageSize= 7;

router.use(utils.getUserFromToken);

router.get('/:sort', (req,res)=>{
  const sort = req.params.sort;
  const page= parseInt(req.query.page);
  if(!page)
    page= 1;
  const aggregationStages = utils.getAggregationStages(req, sort);
  let sortBy;
  switch(sort){
    case 'top':
      sortBy = 'score';
      break;
    case 'new':
      sortBy = 'posted_at';
      break;
    case 'hot':
      sortBy = 'hotness';
      break;
    default:
      res.status(404).end();
      return;
  }
  Post.aggregate(aggregationStages).sort({[sortBy]:-1}).skip((page-1)*pageSize)
  .limit(pageSize).exec((err,posts)=>{
    res.json(posts);
  });
});

router.post('/:id/upvote', (req,res)=>{
  if(req.username === ''){
    res.status(404).end();
    return;
  }
  Post.findOneAndUpdate({
    _id: req.params.id,
    upvoted: {$ne: req.username}
  }, 
  {
    $push: {upvoted: req.username},
    $pull: {downvoted: req.username}
  }, (err, post_id)=>{
    res.send("ok");
  });
});

router.post('/:id/downvote', (req,res)=>{
  if(req.username === ''){
    res.status(404).end();
    return;
  }
  Post.findOneAndUpdate({
    _id: req.params.id,
    downvoted: {$ne: req.username}
  }, 
  {
    $push: {downvoted: req.username},
    $pull: {upvoted: req.username}
  }, (err, post_id)=>{
    res.send("ok");
  });
});

router.post('/:id/unvote', (req,res)=>{
  if(req.username === ''){
    res.status(404).end();
    return;
  }
  Post.findOneAndUpdate({
    _id: req.params.id,
  }, 
  {
    $pull: {downvoted: req.username, upvoted: req.username},
  }, (err, post_id)=>{
    res.send("ok");
  });
});

router.post('', (req,res)=>{
  var post ={};
  post.title= req.body.title;
  post.url= req.body.url;
  post.author = req.username;
  Post.create(post, (err,posts)=>{
    res.json(post);
  });
});

module.exports = router