var jwt = require('jsonwebtoken');

function getUserFromToken(req, res, next){
  var token= req.query.token;
  if(token !== undefined)
    req.username= jwt.verify(token, 'banana').username;
  else
    req.username= '';
  next();
}

const scoreExp= {$subtract: [{$size: '$upvoted'},{$size: '$downvoted'}]};

function getAggregationStages(req, type){
  var aggregationStages = [{
    $addFields: {
      score: scoreExp,
      upvote: {
        $in : [req.username, '$upvoted']
      } ,
      downvote: {
        $in : [req.username, '$downvoted']
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
  if(type === 'hot'){
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
  }
  return aggregationStages;
}

module.exports = {getUserFromToken, getAggregationStages};