import React, { Component }from 'react';
import List, {ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import PowerSettingsNewIcon from 'material-ui-icons/PowerSettingsNew';
import Typography from 'material-ui/Typography';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class DrawerList extends React.Component {

  logout=()=>{
    cookies.remove('user');
    this.props.setUser();
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

export default DrawerList;