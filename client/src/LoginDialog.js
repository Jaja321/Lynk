import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Tabs, { Tab } from 'material-ui/Tabs';
import {
  updateInputValue,
  login,
  closeLoginDialog,
  toggleLoginTab
} from './actions.js'
import { connect } from 'react-redux';

class LoginDialog extends Component{
  closeDialog = () => {
    this.props.dispatch(closeLoginDialog());
  }

  toggleTab = () => {
    this.props.dispatch(toggleLoginTab());
  }

  login = () => {
    this.props.dispatch(login());
  }

  handleValueChange = (field) => (event) => {
    this.props.dispatch(updateInputValue(field, event.target.value));
  }

  render(){
    var suggestSignup= this.props.tab==1?  null: (
      <Typography variant="body1" style={{marginTop: 10}}>
        Don't have a user yet? <a onClick={this.toggleTab}>Sign up</a>
      </Typography>
      );
    return (
      <Dialog
        open={this.props.open}
        onClose={this.closeDialog}
      >
        <Tabs
        value={this.props.tab}
        onChange={this.toggleTab}
        >
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>
        <DialogContent>
          {suggestSignup}
          <TextField
            autoFocus
            onChange={this.handleValueChange('username')}
            margin="dense"
            label="Username"
            value={this.props.username}
            type="email"
            fullWidth
          />
          <TextField
            onChange={this.handleValueChange('password')}
            margin="dense"
            label="Password"
            type="password"
            value={this.props.password}
            fullWidth
          />
          <Typography variant="body2" color="secondary" style={{marginTop: 5}}>
            {this.props.error}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.closeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={this.login} color="primary">
            {this.props.tab==0? 'Login': 'Sign Up'}
          </Button>
        </DialogActions>
      </Dialog>
      );
  }
}

const mapStateToProps = state=>({...state.loginDialog });

export default connect(mapStateToProps)(LoginDialog);