import React, { Component } from 'react';
import Post from './Post.js';
import PaginationButtons from './PaginationButtons.js';
import Grow from 'material-ui/transitions/Grow';
import { connect } from 'react-redux'
import { fetchPosts, upvote, downvote, nextPage, prevPage } from '../actions.js'
import CircularProgress from '@material-ui/core/CircularProgress';

class PostList extends Component {
  componentDidMount(){
    this.props.fetchPosts();
  }

  render(){
    const {posts} = this.props;
    console.log("posts updated");
    const postElements = posts.map((post, i)=>(
      <Post
      key={post._id}
      post={post}
      upvote = {this.props.upvote(post)}
      downvote = {this.props.downvote(post)}
      trans= {this.props.trans}
      timeout= {200*(i+2)}
      />
    ));
    return (
      <div className="postsWrapper">
        {this.props.loading ?
        <CircularProgress className='loader'/> :
        postElements}
        {this.props.showPagination? <PaginationButtons
          firstPage= {this.props.page == 1}
          nextPage= {this.props.nextPage}
          prevPage= {this.props.prevPage}
          /> : null}
      </div>
    );
  }
}

const mapStateToProps = state=>({
  posts: state.general.posts,
  user: state.general.user,
  trans: state.general.transitionFlag,
  showPagination: state.general.showPagination,
  page: state.general.page,
  loading: state.general.loading
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: ()=>{dispatch(fetchPosts())},
  upvote: post => () => {dispatch(upvote(post));},
  downvote: post => () => {dispatch(downvote(post))},
  nextPage: ()=>{
    dispatch(nextPage());
    dispatch(fetchPosts());
  },
  prevPage: ()=>{
    dispatch(prevPage());
    dispatch(fetchPosts());
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(PostList);