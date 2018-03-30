import React, { Component } from 'react';
import ButtonAppBar from './AppBar.js';
import PostList from './PostList.js';
import AddPost from './AddPost.js';

class App extends Component {
  render() {
    return (
      <div className="App">
      	<ButtonAppBar/>
      	<PostList/>
      	<AddPost/>
      </div>

    );
  }
}

export default App;
