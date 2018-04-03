import React, { Component } from 'react';
import ButtonAppBar from './AppBar.js';
import PostList from './PostList.js';
import AddPost from './AddPost.js';
import SnackbarMessage from './Snackbar.js';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const theme = createMuiTheme({
	palette: {
	    primary: blue,
	  }
});

class App extends Component {
	constructor(props){
		super(props);
		this.state={postListSort: "hot", snackbarOpen: false, message: ''};
		this.setUser=this.setUser.bind(this);
		this.setSort=this.setSort.bind(this);
		this.showSnackbar=this.showSnackbar.bind(this);
		this.closeSnackbar=this.closeSnackbar.bind(this);
		
	}

	render() {
		return (
		<MuiThemeProvider theme={theme}>
		  <div className="App">
		  	<ButtonAppBar
		  	user={this.state.user}
		  	setUser={this.setUser}
		  	setSort={this.setSort}
		  	showSnackbar={this.showSnackbar}
		  	/>
		  	<PostList 
		  	sort={this.state.postListSort}
		  	user={this.state.user}
		  	showSnackbar={this.showSnackbar}
		  	/>
		  	<AddPost user={this.state.user} showSnackbar={this.showSnackbar}/>
		  	<SnackbarMessage
		  	message={this.state.message}
		  	open={this.state.snackbarOpen}
		  	close={this.closeSnackbar}
		  	/>
		  </div>
		  </MuiThemeProvider>

		);
	}

	componentDidMount(){
		this.setUser();
	}

	setUser(){
		var user= cookies.get('user');
		if(user)
			this.setState({user: user});
		else
			this.setState({user: null});
	}

	setSort(sort){
		this.setState({postListSort: sort});
	}

	showSnackbar(message){
		this.setState({message: message, snackbarOpen: true});
	}

	closeSnackbar(){
		this.setState({snackbarOpen: false});
	}


}

export default App;
