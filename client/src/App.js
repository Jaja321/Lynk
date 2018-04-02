import React, { Component } from 'react';
import ButtonAppBar from './AppBar.js';
import PostList from './PostList.js';
import AddPost from './AddPost.js';
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
		this.state={postListSort: "hot"};
		this.setUser=this.setUser.bind(this);
		this.setSort=this.setSort.bind(this);
		
	}

	render() {
		return (
		<MuiThemeProvider theme={theme}>
		  <div className="App">
		  	<ButtonAppBar user={this.state.user} setUser={this.setUser} setSort={this.setSort}/>
		  	<PostList sort={this.state.postListSort}/>
		  	<AddPost/>  	
		  </div>
		  </MuiThemeProvider>

		);
	}

	componentDidMount(){
		this.setUser();
	}

	setUser(){
		var user= cookies.get('user');
		console.log(user);
		if(user)
			this.setState({user: user});
		else
			this.setState({user: null});
	}

	setSort(sort){
		this.setState({postListSort: sort});
	}


}

export default App;
