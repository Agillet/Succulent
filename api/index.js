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
	  expires: 1000 * 3600
    }).then( ( value ) => { return value; });
    this.SetLoggedInToTrue();
  }

  SetLoggedInToTrue = () => {
     storage.save({
      key: 'loggedIn',
      data: true
    });
  }
  
  async getTokenFromStorage() {
    console.log('getting token...')
    return( storage.load({ key: 'token' })
        .then((ret) => {
          if(ret.token === 'undefined') {
            console.log('..from reddit');
            this.fetchToken('0f_WVPMtSN9uLg')
            .then( (responseJson) => this.storeToken(responseJson) )
          } else {
            console.log('..from storage');
            return ret.token.access_token;
          }
      })
    )
  }

  getToken() {
    return storage.load({
		key : 'token',
		autoSync: false,
		syncInBackground: false,
	});
  }

  async fetchHot(subreddit) {  
    console.log('fetching hot...');
	const token = await this.getToken();
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
        return responseJson.data;
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
		const token = await this.getToken();
		return (
			fetch(
				'https://www.reddit.com/api/v1/access_token',
				{
					method: 'POST',
					header: {
					    'Accept': 'application/json',
            			'Content-Type': 'application/x-www-form-urlencoded',
						'Authorization' : 'Basic ' + binaryToBase64(utf8.encode('0f_WVPMtSN9uLg' + ":" + '')),	
					},
					body: 'grant_type=refresh_token&refresh_token=' + token.token.refresh_token,
				}
			)
			.then(( response ) => response.json() )
			.then((responseJson) => {
			  return responseJson;
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
