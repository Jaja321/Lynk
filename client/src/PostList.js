import React, { Component } from 'react';
import Paper from './Paper.js';

class PostList extends Component {
	constructor(props){
		super(props);
		this.state={posts:[]};
	}

	render(){
		var postElements=[];
		var posts=this.state.posts;
		for(var i=0 ;i<this.state.posts.length;i++){
			postElements.push(<Paper post={posts[i]}/>);
		}
		return (
			<div className="postsWrapper">
				{postElements}
			</div>
			);
	}

	componentDidMount(){

		fetch("/posts").then(result=>{
			return result.json();
		}).then(result=>{
			this.setState({posts: result});
		});
	}
}

export default PostList;