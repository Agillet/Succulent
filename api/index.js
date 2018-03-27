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
	  console.log('storing');
	  console.log(token);
    let value = storage.save({
      key: 'token',
	  data: { token },
    });
  }

  getToken() {
    return storage.load({
      key : 'token',
    });
  }

  getRefreshToken() {
    return storage.load({
      key : 'refreshToken',
    });
  }
  setRefreshToken(refreshToken) {

    return storage.save({
      key: 'refreshToken',
      data: { refreshToken }
    });
  }

  async fetchHot(subreddit) {  
    console.log('fetching hot...');
  const token = await this.getToken();
  console.log('with token :');
  console.log(token);
    const url = this.baseUrl + subreddit + this.jsonPostfix + '?limit=20' ;
    return (
      fetch( url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer  ${token.token.access_token}` ,
          'Content-Type': 'application/json',
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.error){
          console.warn(('token expired'));
          this.refreshToken();
          return responseJson;
        } else {
            return responseJson.data;
        }     
      })
      .catch((error) => {
        console.error(error);
      })
    ); 
  }
  
  
  
  async fetchNext(subreddit, after) {
    const token = await this.getToken();
    return (
      fetch(this.baseUrl + subreddit + this.jsonPostfix + '?limit=20&after=' + after, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer  ${token.token.access_token}` ,
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

    async refreshToken() {
    console.log('refreshing token...');
    const refresh_token = await this.getRefreshToken();
		return (
        fetch(
          'https://www.reddit.com/api/v1/access_token',
          {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : 'Basic ' + binaryToBase64(utf8.encode('0f_WVPMtSN9uLg' + ":" + '')),	
            },
            body: 'grant_type=refresh_token&refresh_token=' + refresh_token.refreshToken,
          }
        )
        .then(( response ) => response.json() )
        .then((responseJson) => {
          if(responseJson.error) {
            console.log('error refreshing token with refresh token : ');
            console.log(refresh_token.refreshToken);
            console.log(responseJson);
            } else {
            this.storeToken(responseJson)
          }
        })
    )
 	}

  fetchToken(code) {
	  console.log('fetching token...');
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
}

const Client = new RedditClient();
export default Client;
