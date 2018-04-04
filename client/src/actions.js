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
    const { sort, token } = getState().general;
    let url = '/posts/'+sort;
    if(token)
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

export function login(){
  console.log("login started");
  return (dispatch, getState)=>{
    const values = getState().loginDialog;
    fetch('/'+(values.tab == 1? 'signup': 'login'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: values.username,
        password: values.password
      })
    }).then(response=>{
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
      }
    });
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
