import React, { Component } from 'react';
import Post from './Post.js';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class PostList extends Component {
	constructor(props){
		super(props);
		this.state={posts:[]};
	}

	render(){
		var postElements=[];
		var posts=this.state.posts;
		for(var i=0 ;i<this.state.posts.length;i++){
			postElements.push(<Post post={posts[i]}/>);
		}
		return (
			<div className="postsWrapper">
				{postElements}
			</div>
			);
	}

	componentDidMount(){
		this.updatePosts(this.props.sort);
	}

	componentWillReceiveProps(nextProps){
		this.updatePosts(nextProps.sort);
	}

	updatePosts=(sortOrder)=>{
		var token=cookies.get('token');
		fetch("/posts/"+sortOrder+(token? ("?token="+token) : "")).then(result=>{
			return result.json();
		}).then(result=>{
			this.setState({posts: result});
		});
	}
}

export default PostList;