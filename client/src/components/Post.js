import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';
import Grow from 'material-ui/transitions/Grow';
import ta from 'time-ago'

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
  render(){
    const { classes, post } = this.props;
    return (
      <Grow in={this.props.trans} timeout={this.props.timeout}>
      <div>
        <Paper className={classes.root} elevation={4}> 
          <Typography
          variant="headline"
          component="h3"
          align="left"
          style={textStyle}
          onClick={()=>{window.open(post.url)}}
          >
          <div className="clickable">
            {post.title}
          </div>
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
          onClick={this.props.upvote}>
            thumb_up
          </Icon>
          <Icon
          className='thumb'
          style={thumbStyle}
          color={post.downvote ? 'secondary':'inherit'}
          onClick={this.props.downvote}>
            thumb_down
          </Icon>
        </Paper>
      </div>
      </Grow>
    );
  }

}

export default withStyles(styles)(Post);
