import React, { Component } from 'react';
import Typography from 'material-ui/Typography';

class UserTag extends Component {
	render(){
		return(
			<Typography variant="button" style={{marginLeft: 'auto'}}>{this.props.user}</Typography>
			);
	}
}
export default UserTag;