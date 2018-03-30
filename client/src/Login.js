import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Cookies from 'universal-cookie';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Tabs, { Tab } from 'material-ui/Tabs';

const cookies = new Cookies();

class Login extends Component{

	constructor(props){
		super(props);
		this.state={
			dialogOpen : false,
			usernameValue: "",
			passwordValue:"",
			snackbarOpen: false,
			tab: 0,
			errorMessage:""
		};
		this.handleClick= this.handleClick.bind(this);
		this.handleCancel= this.handleCancel.bind(this);
		this.handleTabChange= this.handleTabChange.bind(this);
		this.handleSubmit= this.handleSubmit.bind(this);
	}

	render(){
		return (
			<div  style={{marginLeft: 'auto'}}>
			<Button color="inherit" onClick={this.handleClick}>Login</Button>
			<Dialog
	          open={this.state.dialogOpen}
	          onClose={this.handleClose}
	        >
	          <Tabs value={this.state.tab} onChange={this.handleTabChange}>
	            <Tab label="Login" />
	            <Tab label="Sign Up" />
	          </Tabs>
	          <DialogContent>
	            <TextField
	              autoFocus
	              onChange={this.handleChange('username')}
	              margin="dense"
	              label="Username"
	              value={this.state.titleValue}
	              type="email"
	              fullWidth
	            />
	            <TextField
	           	  onChange={this.handleChange('password')}
	              margin="dense"
	              label="Password"
	              value={this.state.urlValue}
	              type="email"
	              fullWidth
	            />
	            <Typography variant="body2" color="secondary" style={{marginTop: 5}}>{this.state.errorMessage}</Typography>
	          </DialogContent>
	          <DialogActions>
	            <Button onClick={this.handleCancel} color="primary">
	              Cancel
	            </Button>
	            <Button onClick={this.handleSubmit} color="primary">
	              {this.state.tab==0? 'Login': 'Sign Up'}
	            </Button>
	          </DialogActions>
	        </Dialog>
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

	handleTabChange(event, value){
		this.setState({tab: value});
	}

	handleSubmit(){	
		fetch('/'+(this.state.tab==0? 'login': 'signup'), {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({
		    username: this.state.usernameValue,
		    password: this.state.passwordValue,
		  })
		}).then(response=>{
			return response.json();
		}).then(res=>{
			if(res.error){
				this.setState({errorMessage: res.error});
			}else{
				cookies.set('token', res.token, {path: '/'});
				this.setState({dialogOpen: false, errorMessage: ""});
			}
		});			
		
	}
}

export default Login;