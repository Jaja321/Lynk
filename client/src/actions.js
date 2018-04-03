export function setSort(sort){
	return {
		type: "SET_SORT",
		sort
	}
}

export function fetchPosts(){
	return (dispatch, getState) => {
		const { sort, token } = getState();
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

function setPosts(posts){
	return {
		type: "SET_POSTS",
		posts
	}
}
