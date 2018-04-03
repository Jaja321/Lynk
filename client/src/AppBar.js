import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Login from './Login.js';
import UserTag from './UserTag.js';
import SortSelect from './SortSelect.js';
import Drawer from './Drawer.js';

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

  state={
    drawerOpen: false
  };

  toggleDrawer = (open)=> (() => {
    this.setState({
      drawerOpen: open,
    });
  });

  render(){
    const {classes} = this.props;
    return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={this.toggleDrawer(true)} className={classes.menuButton} color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit">
            Lynk
          </Typography>
          <div style={{marginLeft: 'auto', display: 'flex', alignItems: 'center'}}>
          <SortSelect setSort={this.props.setSort}/>
          {this.props.user ? <UserTag user={this.props.user}/> :<Login setUser={this.props.setUser} showSnackbar={this.props.showSnackbar}/>}
          </div>
        </Toolbar>
      </AppBar>
      <Drawer open={this.state.drawerOpen} closeDrawer={this.toggleDrawer(false)} setUser={this.props.setUser}/>
    </div>
    );
  }
}

export default withStyles(styles)(ButtonAppBar);
