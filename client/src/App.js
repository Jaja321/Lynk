import React, { Component } from 'react';
import ButtonAppBar from './AppBar.js';
import PostList from './PostList.js';
import AddPost from './AddPost.js';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class App extends Component {
	constructor(props){
		super(props);
		this.state={};
		this.setUser=this.setUser.bind(this);
		
	}

	render() {
		return (
		  <div className="App">
		  	<ButtonAppBar user={this.state.user} setUser={this.setUser}/>
		  	<PostList sort="top"/>
		  	<AddPost/>
		  	
		  </div>

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

}

export default App;
