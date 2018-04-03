import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
//import rootReducer from './reducers'
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const authToken = cookies.get('token');;

 
const loggerMiddleware = createLogger()

const initialState = {
  sort: 'hot',
  posts: [],
  token: authToken
}

function rootReducer(state, action){
  switch(action.type){
    case 'SET_SORT':
      return Object.assign({}, state, {sort: action.sort});
    case 'SET_TOKEN':
      return Object.assign({}, state, {token: action.token});
    case 'SET_POSTS':
      return Object.assign({}, state, {posts: action.posts});
    default:
      return state;
  }
}

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  );
  return store;
}
