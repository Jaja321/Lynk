import React, { Component } from 'react';
import Post from './Post.js';
import { connect } from 'react-redux'
import { fetchPosts, upvote, downvote } from '../actions.js'

class PostList extends Component {
  componentDidMount(){
    this.props.fetchPosts();
  }

  render(){
    const {posts} = this.props;
    console.log("posts updated");
    const postElements = posts.map(post=>(
      <Post
      key={post._id}
      post={post}
      upvote = {this.props.upvote(post)}
      downvote = {this.props.downvote(post)}
      />
    ));
    return (
      <div className="postsWrapper">
        {postElements}
      </div>
    );
  }
}

const mapStateToProps = state=>({ posts: state.general.posts, user: state.general.user });
const mapDispatchToProps = dispatch => ({
  fetchPosts: ()=>{dispatch(fetchPosts())},
  upvote: post => () => {dispatch(upvote(post));},
  downvote: post => () => {dispatch(downvote(post));}
});

export default connect(mapStateToProps,mapDispatchToProps)(PostList);