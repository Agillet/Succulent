import React from 'react';
import { FlatList, Text, View, AsyncStorage  } from 'react-native';
import  Post from '../components/post';
import PostList from '../components/postList';
import utf8 from 'utf8';
import binaryToBase64 from 'binaryToBase64';
import Storage from './storage';

class RedditClient{

  baseUrl = 'https://oauth.reddit.com/r/';
  jsonPostfix = '.json';

  constructor(props){
    this.state = {
      isLoading: true,
      refreshing: false,
    };
  }

  async getTokenFromStorage() {
    return( storage.load({ key: 'token' })
        .then((ret) => {
          if(ret.token === 'undefined') {
            this.fetchToken()
            .then((token) => { console.log('fetched from api' + token)});
          } else {
            console.log('fetched from storage :' + ret.token)
            return ret.token;
          }
      })
    )
  }

  async fetchHot(subreddit) {  
    const token = await this.getTokenFromStorage();
    return (
      fetch(this.baseUrl + subreddit + this.jsonPostfix + '?limit=50&after=', {
        // fetch("https://www.oauth.reddit.com/api/v1/me.json", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer  ${token}` ,
          'Content-Type': 'application/json',
        }
      })
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
      this.getTokenFromStorage().then( (token) => { 
        fetch(this.baseUrl + subreddit + this.jsonPostfix +'?limit=50&&after=' + after, {
          method: 'POST',
          header: {
            'Authorization': `Bearer  ${token}` ,
            'Content-Type': 'application/json',
          }
        })
          .then((response) => response.json())
          .then((responseJson) => {
            return responseJson.data;
          })
          .catch((error) => {
            console.error(error);
          })
        })
      );
  }

  fetchToken(code) {
    console.log('fetchingToken');
      return ( 
        fetch(
        'https://www.reddit.com/api/v1/access_token', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization' : 'Basic ' + binaryToBase64(utf8.encode('0f_WVPMtSN9uLg' + ":" + '')),
          },
          body: 'grant_type=authorization_code&code=' + code + '&redirect_uri=https://www.google.fr',
        }
      )
      .then(( response ) => response.json() )
      .then((responseJson) => {
        console.log(('got :' + responseJson.access_token))
        return responseJson;
      })

    )
  }

  render(){
    return ;
  }
}

const Client = new RedditClient();
export default Client;
