import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';
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
              {this.props.post.points} points
          </Typography>
          <Icon style={thumbStyle} onClick={this.upvote(this.props.post._id)}>thumb_up</Icon>
          <Icon style={thumbStyle}>thumb_down</Icon>

        </Paper>
      </div>
    );
  }

  upvote(id){
    return ()=>{
        console.log(id);
        fetch('/posts/'+id+'/upvote', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body:{
          hey: 'sup'
        }
        });
      };
    }
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);
