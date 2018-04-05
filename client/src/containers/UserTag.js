import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

class UserTag extends Component {
  render(){
    const { user } = this.props;
    if(user)
      return <Typography variant="button" style={{marginLeft: 'auto'}}>{user}</Typography>
    else
      return <Button color="inherit" onClick={this.props.openLoginDialog}>Login</Button>;
  }
}
export default UserTag;