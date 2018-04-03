import React, {Component} from 'react';
import Snackbar from 'material-ui/Snackbar';		

class SnackbarMessage extends Component{
	render(){
		return(
		<Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={this.props.open}
          onClose={this.props.close}
          message={this.props.message}
          autoHideDuration={3000}
 		/>);
	}
}

export default SnackbarMessage;