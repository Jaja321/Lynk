import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function setSort(sort){
  return {
    type: "SET_SORT",
    sort
  }
}

export function fetchPosts(){
  return (dispatch, getState) => {
    const { sort, token, user } = getState().general;
    let url = '/posts/'+sort;
    if(user)
      url+='?token=' + token;
    fetch(url).then(result=>{
      return result.json();
    }).then(result=>{
      dispatch(setPosts(result));
    });
  } 
}

export function updateInputValue(field, value){
  return {
    type: "UPDATE_VALUE",
    field,
    value
  }
}

export function updateAddPost(field, value){
  return {
    type: "UPDATE_ADDPOST",
    field,
    value
  }
}

function setPosts(posts){
  return {
    type: "SET_POSTS",
    posts
  }
}

export function closeSnackbar(){
  return {
    type: "CLOSE_SNACKBAR"
  }
}

function getPayload(content){
  return {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(content)
    };
}

export function login(){
  console.log("login started");
  return (dispatch, getState)=>{
    const values = getState().loginDialog;
    fetch('/'+(values.tab == 1? 'signup': 'login'), getPayload({
      username: values.username,
      password: values.password
    })).then(response=>{
      return response.json();
    }).then(res=>{
      if(res.error){
        dispatch(setLoginErrorMessage(res.error));
      }else{
        console.log("got results");
        cookies.set('token', res.token, {path: '/'});
        cookies.set('user', res.username, {path: '/'});
        dispatch(popSnackbar('Welcome, '+res.username+'!'));
        dispatch(closeLoginDialog());
        dispatch(setLoginErrorMessage(''));
        dispatch(setUser(res.username));
        dispatch(fetchPosts());

      }
    });
  }
}

export function submitPost(){
  return (dispatch, getState) => {
    const values = getState().addPostDialog;
    fetch('/posts', getPayload({
      title: values.title,
      url: values.url,
      token: getState().general.token
    })).then(res => {
      if(res.ok)
        dispatch(popSnackbar('Link submitted successfully'));
      else
        dispatch(popSnackbar('Subission failed. Please try again.'));
    });
    dispatch(closeAddPostDialog());
  }
}

export function logout(){
  cookies.remove('user');
  return {
    type: 'LOGOUT'
  }
}

function setLoginErrorMessage(message){
  return {
    type: 'SET_ERROR_MESSAGE',
    message
  }
}

export function openLoginDialog(){
  return {
    type: 'OPEN_LOGIN_DIALOG'
  }
}

export function closeLoginDialog(){
  return {
    type: 'CLOSE_LOGIN_DIALOG'
  }
}

export function openAddPostDialog(user){
  if(user)
    return {
      type: 'OPEN_ADDPOST_DIALOG'
    }
  else
    return popSnackbar('You must be logged in to post a new link');
}

export function closeAddPostDialog(){
  return {
    type: 'CLOSE_ADDPOST_DIALOG'
  }
}

function popSnackbar(message){
  return {
    type: 'POP_SNACKBAR',
    message
  }
}

//Set the logged in user
function setUser(username){
  return {
    type: 'SET_USER',
    username
  }
}

export function toggleLoginTab(){
  return {
    type: 'TOGGLE_LOGIN_TAB'
  }
}

export function openDrawer(){
  return {
    type: 'OPEN_DRAWER'
  }
}

export function closeDrawer(){
  return {
    type: 'CLOSE_DRAWER'
  }
}

function incScore(id, amount){
  return {
    type: "INC_SCORE",
    amount,
    id
  }
}

function setVote(id, dir){
  return {
    type: "SET_VOTE",
    dir,
    id
  }
}

export function upvote(post){
  return (dispatch, getState) => {
    const user = getState().general.user;
    if(!user){
      dispatch(popSnackbar('You must be logged in to vote.'));
      return;
    }
    const token = getState().general.token;
    let voteType = 'upvote';
    if(post.upvote) //remove vote
      voteType = 'unvote';
    fetch('/posts/'+post._id+'/'+voteType+'?token='+token, getPayload({}));
    if(post.upvote){
      dispatch(incScore(post._id, -1));
      dispatch(setVote(post._id, 0));
    }else if(post.downvote){
      dispatch(incScore(post._id, 2));
      dispatch(setVote(post._id, 1));
    }else{
      dispatch(incScore(post._id, 1));
      dispatch(setVote(post._id, 1));
    }
  }
}

export function downvote(post){
  return (dispatch, getState) => {
    const user = getState().general.user;
    if(!user){
      dispatch(popSnackbar('You must be logged in to vote.'));
      return;
    }
    const token = getState().general.token;
    let voteType = 'downvote';
    if(post.downvote) //remove vote
      voteType = 'unvote';
    fetch('/posts/'+post._id+'/'+voteType+'?token='+token, getPayload({}));
    if(post.upvote){
      dispatch(incScore(post._id, -2));
      dispatch(setVote(post._id, -1));
    }else if(post.downvote){
      dispatch(incScore(post._id, 1));
      dispatch(setVote(post._id, 0));
    }else{
      dispatch(incScore(post._id, -1));
      dispatch(setVote(post._id, -1));
    }
  }
}
