import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import NavDrawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import {List, ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import DrawerList from './DrawerList.js';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class Drawer extends React.Component {
  state = {
    drawerOpen: false
  };

  

  render() {
    const { classes } = this.props;


    return (
      <div>
        <NavDrawer
          open={this.props.open}
          onClose={this.props.closeDrawer}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.props.closeDrawer}
            onKeyDown={this.props.closeDrawer}
          >
            <DrawerList setUser={this.props.setUser}/>
          </div>
        </NavDrawer>
      
      </div>
    );
  }
}

export default withStyles(styles)(Drawer);