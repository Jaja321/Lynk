import React, { Component } from 'react';
import ButtonAppBar from './AppBar.js';
import PostList from './PostList.js';
import AddPost from './AddPost.js';
import LoginDialog from './LoginDialog.js';
import SnackbarMessage from './Snackbar.js';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import { Provider } from 'react-redux'
import configureStore from '../store.js'

const store = configureStore();
const theme = createMuiTheme({
	palette: {
	    primary: blue,
	  }
});

function App(props){
	return (
  	<Provider store= {store}>
  	<MuiThemeProvider theme={theme}>
	  <div className="App">
	  	<ButtonAppBar/>
	  	<PostList />
	  	<AddPost/>
      <LoginDialog/>
	  	<SnackbarMessage/>
	  </div>
	  </MuiThemeProvider>
	  </Provider>
	);
}

export default App;
