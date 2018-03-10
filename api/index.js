import React from 'react';
import { FlatList, Text, View  } from 'react-native';
import  Post from '../components/post';
import PostList from '../components/postList';

class RedditClient{

  baseUrl = 'https://reddit.com/r/';
  jsonPostfix = '.json';

  constructor(props){
    this.state = {
      isLoading: true,
      refreshing: false, 
    };
  }

  fetchHot(subreddit) {   
    return (
        fetch(this.baseUrl + subreddit + this.jsonPostfix + '?limit=50&after=')
        .then((response) => response.json())
        .then((responseJson) => {
          return responseJson.data;
        })
        .catch((error) => {
          console.error(error);
        })
     ); 
   }



  fetchNext(subreddit, after) {
    return (
      fetch(this.baseUrl + subreddit + this.jsonPostfix +'?limit=50&&after=' + after)
        .then((response) => response.json())
        .then((responseJson) => {
          return responseJson.data;
        })
        .catch((error) => {
          console.error(error);
        })
      );
  }

  // authenticate(username, password) {
  //   return (
  //     fetch('https://www.reddit.com/api/v1/access_token', {
  //       method: 'POST',
        
  //     })
  //   )
  // }

  render(){
    return ;
  }
}

const Client = new RedditClient();
export default Client;
