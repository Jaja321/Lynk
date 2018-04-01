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
  marginTop: 4
}


class PaperSheet extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root} elevation={4}>
          <Typography variant="headline" component="h3" align="left" style={textStyle}>
            {this.props.post.title}
          </Typography>
          <Typography variant="subheading" align="left" style={textStyle}>
            Posted by {this.props.post.author} {ta.ago(new Date(this.props.post.posted_at))}
          </Typography>
          <Typography variant="body1" style={thumbStyle}>
              {this.props.post.score} points
          </Typography>
          <Icon style={thumbStyle} onClick={this.vote(true)}>thumb_up</Icon>
          <Icon style={thumbStyle} onClick={this.vote(false)}>thumb_down</Icon>

        </Paper>
      </div>
    );
  }

  vote(up){
    return ()=>{
        var token=cookies.get('token');
        fetch('/posts/'+this.props.post._id+'/'+(up? 'upvote' : 'downvote')+'?token='+token, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        });
      };
    }
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);
