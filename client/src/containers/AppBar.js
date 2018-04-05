import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import UserTag from './UserTag.js';
import SortSelect from './SortSelect.js';
import Drawer from './Drawer.js';
import { connect } from 'react-redux';
import { openDrawer, openLoginDialog } from '../actions';

const styles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function ButtonAppBar(props) {
  const {classes} = props;
  return (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <IconButton onClick={props.openDrawer} className={classes.menuButton} color="inherit">
          <MenuIcon />
        </IconButton>
        <Typography variant="title" color="inherit">
          Lynk
        </Typography>
        <div style={{marginLeft: 'auto', display: 'flex', alignItems: 'center'}}>
        <SortSelect/>
        <UserTag user={props.user} openLoginDialog={props.openLoginDialog}/>
        </div>
      </Toolbar>
    </AppBar>
    <Drawer/>
  </div>
  );

}

const mapStateToProps = state => ({user : state.general.user});
const mapDispatchToProps = dispatch => ({
  openLoginDialog: () => dispatch(openLoginDialog()),
  openDrawer: () => dispatch(openDrawer())
});

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(ButtonAppBar));
