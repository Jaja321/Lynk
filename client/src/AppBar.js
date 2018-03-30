import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Login from './Login.js';

const styles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class ButtonAppBar extends Component {

  render(){
    const {classes} = this.props;
    return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit">
            Lynk
          </Typography>
          <Login/>
        </Toolbar>
      </AppBar>
    </div>
    );
  }
}

export default withStyles(styles)(ButtonAppBar);
