import React, { Component } from 'react';
import Post from './Post.js';
import { connect } from 'react-redux'
import { fetchPosts } from './actions.js'

class PostList extends Component {
	componentDidMount(){
		this.props.dispatch(fetchPosts());
	}

	render(){
		const {posts} = this.props;
		const postElements = posts.map(post=>(
			<Post
			key={post._id}
			post={post}
			user={this.props.user}
			showSnackbar={this.props.showSnackbar}
			/>
		));
		return (
			<div className="postsWrapper">
				{postElements}
			</div>
		);
	}
}

const mapStateToProps = state=>({ posts: state.posts })

export default connect(mapStateToProps)(PostList);