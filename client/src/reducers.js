import { combineReducers } from 'redux'
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const authToken = cookies.get('token');
const user = cookies.get('user');

function general(state= {
  sort: 'hot',
  posts: [],
  token: authToken,
  user
  }, action){
  switch(action.type){
  case 'SET_SORT':
    return Object.assign({}, state, {sort: action.sort});
  case 'SET_TOKEN':
    return Object.assign({}, state, {token: action.token});
  case 'SET_POSTS':
    return Object.assign({}, state, {posts: action.posts});
  case 'SET_USER':
    return Object.assign({}, state, {user: action.username});
  case 'SET_POSTS':
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

export default combineReducers({snackbar,general,loginDialog});