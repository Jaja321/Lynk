import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';
import ta from 'time-ago'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const styles = {
  root:{
    paddingTop: 16,
    paddingBottom: 8,
    marginTop: 10,
    justifyContent: 'flex-start',
  },
};

const textStyle={
  marginLeft: 10
}

const thumbStyle={
  marginLeft: 8,
  marginTop: 4,
}


class Post extends Component{
  constructor(props){
    super(props);
    const post=this.props.post;
    this.state={
      post: post,
    }
    this.updateVoteState= this.updateVoteState.bind(this);
  }

  render(){
    const { classes } = this.props;
    const post=this.state.post;
    return (
      <div>
        <Paper className={classes.root} elevation={4}>
          <Typography variant="headline" component="h3" align="left" style={textStyle}>
            {post.title}
          </Typography>
          <Typography variant="subheading" align="left" style={textStyle}>
            Posted by {post.author} {ta.ago(new Date(post.posted_at))}
          </Typography>
          <Typography variant="body1" style={thumbStyle}>
              {post.score} points
          </Typography>
          <Icon
          className='thumb'
          style={thumbStyle}
          color={post.upvote ? 'primary':'inherit'}
          onClick={this.vote(true)}>
            thumb_up
          </Icon>
          <Icon
          className='thumb'
          style={thumbStyle}
          color={post.downvote ? 'secondary':'inherit'}
          onClick={this.vote(false)}>
            thumb_down
          </Icon>

        </Paper>
      </div>
    );
  }

  vote(up){
    return ()=>{
        if(!this.props.user){
          this.props.showSnackbar(<span>You must be logged in to vote</span>);
          return;
        }
        var voteType;
        const post=this.state.post;
        if((up && post.upvote) || (!up && post.downvote))
          voteType = 'unvote';
        else if(up)
          voteType = 'upvote';
        else
          voteType = 'downvote';
        var token=cookies.get('token');
        fetch('/posts/'+this.props.post._id+'/'+voteType+'?token='+token, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          });
        this.updateVoteState(up);
      };
      
    }

    updateVoteState(up){
      this.setState(function(prevState, props) {
        const {post} = prevState;
        let newScore = post.score;
        let newUpvote  = post.upvote;
        let newDownvote = post.downvote;
        if(post.upvote){
          newScore--;
          newUpvote=false;
        }else{
          if(up){
            newUpvote=true;
            newScore++;
          }
        }
        if(post.downvote){
          newScore++;
          newDownvote=false;
        }else{
          if(!up){
            newDownvote=true;
            newScore--;
          }
        }
        post.score=newScore;
        post.upvote=newUpvote;
        post.downvote=newDownvote;
        return {
          post: post
        };
      });
    }
}

export default withStyles(styles)(Post);
