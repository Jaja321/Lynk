import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Cookies from 'universal-cookie';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';

const cookies = new Cookies();

const style={
	buttonStyle: {
    	position:'fixed',
		right: 20,
		bottom: 20,
  },
};

class AddPost extends Component{
	constructor(props){
		super(props);
		this.state={dialogOpen : false, titleValue: "", urlValue:"", snackbarOpen: false};
		this.handleClick= this.handleClick.bind(this);
		this.handleCancel= this.handleCancel.bind(this);
		this.handleSubmit= this.handleSubmit.bind(this);
		this.closeSnackbar= this.closeSnackbar.bind(this);
	}
	render(){
		const { classes } = this.props;
		return(
		<div>
		<Button onClick={this.handleClick} variant="fab" color="primary" aria-label="add" className={classes.buttonStyle}>
	        <AddIcon />
	    </Button>
		<Dialog
          open={this.state.dialogOpen}
          onClose={this.handleClose}
        >
          <DialogTitle>Add Post</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send
              updates occationally.
            </DialogContentText>
            <TextField
              autoFocus
              onChange={this.handleChange('title')}
              margin="dense"
              label="Title"
              value={this.state.titleValue}
              type="email"
              fullWidth
            />
            <TextField
           	  onChange={this.handleChange('url')}
              margin="dense"
              label="Link"
              value={this.state.urlValue}
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.snackbarOpen}
          autoHideDuration={2000}
          message={"Submitted successfully"}
          onClose={this.closeSnackbar}
        />
        </div>
	    );
	}

	handleClick(){
		this.setState({dialogOpen: true});
	}

	handleCancel(){
		this.setState({dialogOpen: false});
	}

	handleChange(field){
		return event=>{
			this.setState({[field+'Value']: event.target.value});
		};
	}

	handleSubmit(){
		var token=cookies.get('token');
		fetch('/posts', {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({
		    title: this.state.titleValue,
		    url: this.state.urlValue,
		    token: token
		  })
		});
		this.setState({dialogOpen: false, snackbarOpen: true});
	}

	closeSnackbar(){
		this.setState({snackbarOpen: false});
	}
}



export default withStyles(style)(AddPost);