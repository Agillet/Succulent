import React from 'react';
import { FlatList, Text, View, AsyncStorage  } from 'react-native';
import  Post from '../components/post';
import PostList from '../components/postList';
import utf8 from 'utf8';
import binaryToBase64 from 'binaryToBase64';
import Storage from './storage';

class RedditClient{

	baseUrl = 'https://oauth.reddit.com/r/';

	accessTokenUrl = 'https://www.reddit.com/api/v1/access_token';	  
	
	jsonPostfix = '.json';
	
	headersToken = 
		{
			'Accept': 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization' : 'Basic ' + binaryToBase64(utf8.encode('0f_WVPMtSN9uLg' + ":" + '')),
		};
	
 	 constructor(props){
    	this.state = {
			isLoading: true,
			refreshing: false,
    	};
  	}

	storeToken(token){
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

	async fetchHot(subreddit, after) {
		const afterStr = '&&after=' + after;
		const url = this.baseUrl + subreddit + this.jsonPostfix + '?limit=20' + afterStr;
		const token = await this.getToken();
		const response = await fetch(url,
			{
				method: 'GET',
				headers: 
				{
					'Authorization': `Bearer  ${token.token.access_token}` ,
					'Content-Type': 'application/json',
				}
			}
		);
		const responseJson = await response.json();
		if(responseJson.error){
			this.refreshToken();
			return responseJson;
		} else {
			return responseJson.data;
		}     
	}

	async fetchComment(subreddit, id) {
		const token = await this.getToken();
		const url = this.baseUrl + subreddit +'/comments/' + id +  this.jsonPostfix;
		console.log(url);
		const response = await fetch(
			url,
			{
				method: 'GET',
				headers: 
				{
					'Authorization': `Bearer  ${token.token.access_token}` ,
					'Content-Type': 'application/json',
				}
			}
		);
        const responseJson = await response.json();
		return responseJson;
	}

	async refreshToken() {
		const refresh_token = await this.getRefreshToken();
		const response = await fetch(
			this.accessTokenUrl,
			{
				method: 'POST',
				headers: this.headersToken,
				body: 'grant_type=refresh_token&refresh_token=' + refresh_token.refreshToken,
			}
		);
		const responseJson = await response.json();
		if(responseJson.error) {
            console.log('error refreshing token with refresh token : ');
            console.log(refresh_token.refreshToken);
			return;
		} else {
			this.storeToken(responseJson);
		}
	}

	async fetchToken(code) {
		const response = await fetch(
			this.accessTokenUrl, 
			{
				method: 'POST',
			  	headers: this.headersToken,
			  	body: 'grant_type=authorization_code&code=' + code + '&redirect_uri=https://www.google.fr',
			}
		);
		const responseJson = await response.json();
		return responseJson;		
	}

}

const Client = new RedditClient();
export default Client;
