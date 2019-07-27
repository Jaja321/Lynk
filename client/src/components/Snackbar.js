import React, {Component} from 'react';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux'
import {closeSnackbar} from '../actions';

class SnackbarMessage extends Component{
	render(){
		const {open, message, dispatch} = this.props;
		return(
		<Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={open}
          onClose={()=>{dispatch(closeSnackbar())}}
          message={message}
          autoHideDuration={3000}
 		/>);
	}
}

const mapStateToProps = state=>({...state.snackbar});

export default connect(mapStateToProps)(SnackbarMessage);