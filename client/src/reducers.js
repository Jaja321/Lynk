import { combineReducers } from 'redux'
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const authToken = cookies.get('token');
const user = cookies.get('user');

function general(state= {
  sort: 'hot',
  posts: [],
  token: authToken,
  user,
  drawerOpen: false
  }, action){
  var newPosts;
  switch(action.type){
  case 'SET_SORT':
    return Object.assign({}, state, {sort: action.sort});
  case 'SET_TOKEN':
    return Object.assign({}, state, {token: action.token});
  case 'SET_POSTS':
    return Object.assign({}, state, {posts: action.posts});
  case 'SET_USER':
    return Object.assign({}, state, {user: action.username});
  case 'OPEN_DRAWER':
    return Object.assign({}, state, {drawerOpen: true});
  case 'CLOSE_DRAWER':
    return Object.assign({}, state, {drawerOpen: false});
  case 'LOGOUT':
    return Object.assign({}, state, {user: null});
  case 'INC_SCORE':

    newPosts= state.posts.map(post => {
      if(post._id == action.id)
        return Object.assign({}, post, {score: (post.score+action.amount)} );
      else
        return post;
    });
    return Object.assign({}, state, {posts: newPosts});
  case 'SET_VOTE':
    newPosts= state.posts.map(post => {
      const changes = {};
      if(post._id == action.id){
        switch(action.dir){
          case 1:
            changes.upvote = true;
            changes.downvote = false;
            break;
          case -1:
            changes.upvote = false;
            changes.downvote = true;
            break;
          default:
            changes.upvote = false;
            changes.downvote = false;
            break;
        }
      }
      return Object.assign({}, post, changes);
    });
    return Object.assign({}, state, {posts: newPosts});
  default:
    return state;
  }
}

function snackbar(state= {open: false, message: ''}, action){
  switch(action.type){
    case 'POP_SNACKBAR':
      return Object.assign({}, state, {
        open: true,
        message: action.message
      });
    case 'CLOSE_SNACKBAR':
      return Object.assign({}, state, {open: false});
    default:
      return state;
  }
}

function loginDialog(state= {
  username: '',
  password: '',
  error: '',
  open: false,
  tab: 0
  }, action){
  switch(action.type){
    case 'UPDATE_VALUE':
      return Object.assign({}, state, {[action.field]: action.value});
    case 'SET_ERROR_MESSAGE':
      return Object.assign({}, state, {error: action.message});
    case 'OPEN_LOGIN_DIALOG':
      return Object.assign({}, state, {open: true});
    case 'CLOSE_LOGIN_DIALOG':
      return Object.assign({}, state, {open: false});
    case 'TOGGLE_LOGIN_TAB':
      return Object.assign({}, state, {tab: (state.tab == 0? 1 : 0)});
    default:
      return state;
  }
}

function addPostDialog(state= {
  title: '',
  url: '',
  error: '',
  open: false,
  }, action){
  switch(action.type){
    case 'UPDATE_ADDPOST':
      return Object.assign({}, state, {[action.field]: action.value});
    case 'OPEN_ADDPOST_DIALOG':
      return Object.assign({}, state, {open: true});
    case 'CLOSE_ADDPOST_DIALOG':
      return Object.assign({}, state, {open: false});
    default:
      return state;
  }
}


export default combineReducers({snackbar,general,loginDialog, addPostDialog});