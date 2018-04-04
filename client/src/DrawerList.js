import React, { Component }from 'react';
import List, {ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import PowerSettingsNewIcon from 'material-ui-icons/PowerSettingsNew';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import { logout, fetchPosts } from './actions';

class DrawerList extends React.Component {

  logout=()=>{
    this.props.dispatch(logout());
    this.props.dispatch(fetchPosts());
  }

  render(){
    return(
      <List>
        <ListItem button onClick={this.logout}>
          <ListItemIcon>
            <PowerSettingsNewIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    );
  }
}

export default connect()(DrawerList);