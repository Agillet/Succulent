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

  storeToken(token){
    let value = storage.save({
      key: 'token',
      data: { token }
    }).then( ( value ) => { return value; })
  }

  async getTokenFromStorage() {
    return( storage.load({ key: 'token' })
        .then((ret) => {
          if(ret.token === 'undefined') {
            this.fetchToken('0f_WVPMtSN9uLg')
            .then( (responseJson) => this.storeToken(responseJson) )
          } else {
            return ret.token.access_token;
          }
      })
    )
  }

  async fetchHot(subreddit) {  
    const token = await this.getTokenFromStorage();
    return (
      fetch(this.baseUrl + subreddit + this.jsonPostfix + '?limit=100&after=', {
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
        fetch(this.baseUrl + subreddit + this.jsonPostfix +'?limit=100&&after=' + after, {
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
