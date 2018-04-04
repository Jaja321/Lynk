import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import TextField from 'material-ui/TextField';
import Cookies from 'universal-cookie';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import {
  updateAddPost,
  closeAddPostDialog,
  openAddPostDialog,
  submitPost,
} from '../actions.js'
import { connect } from 'react-redux';

const cookies = new Cookies();

const style={
	buttonStyle: {
    position:'fixed',
		right: 20,
		bottom: 20,
  },
};

class AddPost extends Component{
  openDialog = () => {
    this.props.dispatch(openAddPostDialog(this.props.user));
  }

  closeDialog = () =>{
    this.props.dispatch(closeAddPostDialog());
  }

  handleValueChange = (field) => (event) => {
    this.props.dispatch(updateAddPost(field, event.target.value));
  }

  submitPost = () => {
    this.props.dispatch(submitPost());
  }

	render(){
		const { classes } = this.props;
		return(
  		<div>
  		<Button
      onClick={this.openDialog}
      variant="fab"
      color="primary"
      aria-label="add"
      className={classes.buttonStyle}>
  	    <AddIcon />
  	  </Button>
  		<Dialog
        open={this.props.open}
        onClose={this.closeDialog}
      >
          <DialogTitle>Add Link</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              onChange={this.handleValueChange('title')}
              margin="dense"
              label="Title"
              value={this.props.title}
              type="email"
              fullWidth
            />
            <TextField
           	  onChange={this.handleValueChange('url')}
              margin="dense"
              label="Link"
              value={this.props.url}
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={this.submitPost} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        </div>
	    );
	}
}

const mapStateToProps = state=>({...state.addPostDialog, user: state.general.user });

export default connect(mapStateToProps)(withStyles(style)(AddPost));