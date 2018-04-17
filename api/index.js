import React from 'react';
import { FlatList, Text, View, AsyncStorage  } from 'react-native';
import  Post from '../components/post';
import PostList from '../components/postList';
import utf8 from 'utf8';
import binaryToBase64 from 'binaryToBase64';
import Storage from './storage';

class RedditClient{

	baseUrl = 'https://oauth.reddit.com/r/';

	baseUrlNoPrefix = 'https://oauth.reddit.com/';

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
	  
	storeMySubreddits(data) {
		storage.save({
			key: 'mySubreddits',
			data: { data },
		});
	}

	getMySubreddits() {
		return storage.load({key: 'mySubreddits'})
	}

  	async getRefreshToken() {
    	 return storage.load({
              key : 'refreshToken',
        });
  	}

  	setRefreshToken(refreshToken) {
          console.log('storing :');
          console.log(refreshToken);
    	return storage.save({
      		key: 'refreshToken',
            data: { refreshToken },
            expires: null
    	});
  	}

	async fetchHot(subreddit, after) {
        console.log('fetching hot...');
        console.log('with token');
		const afterStr = '&&after=' + after;
        const url = this.baseUrl + subreddit + this.jsonPostfix + '?limit=25' + afterStr;
		try {
			var token = await this.getToken();
		} catch (error) {
			await this.refreshToken();
			console.log('token refreshed');
			return fetchHot(subreddit,after);
		}
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
		if (responseJson.error) {
			await this.refreshToken();
			this.fetchHot(subreddit,after);
			return;
		}
		return responseJson.data;
	}

	async fetchComment(subreddit, id) {
		const token = await this.getToken();
		const url = this.baseUrl + subreddit +'/comments/' + id +  this.jsonPostfix;
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
    
    async fetchMoreComments(link, children) {
        const token = await this.getToken();
        const url = 'https://oauth.reddit.com/api/morechildren.json?api_type=json&link_id=' + link +  '&sort=confidence&children=' + children;
        console.log(url);
        const response = await fetch(
            url,
            {
                method: 'GET',
                headers:
                {
                    'Content-Type': 'application/json',
                },
            }
        );
        // console.log(response);
        const responseJson = await response.json();
		return responseJson;
    }

	async refreshToken() {
        console.log('refreshing token...');
        const refresh_token = await this.getRefreshToken();
        console.log('refresh token: ') ;
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

	async vote(id, dir) {
		const token = await this.getToken();
		const url = this.baseUrlNoPrefix + 'api/vote';
		const response = await fetch(
			url,
			{
				method: 'POST',
				headers: 
				{
					'Authorization': `Bearer  ${token.token.access_token}` ,
					'Content-Type': 'application/json',
				},
				body: 'id='+ id + '&dir=' + dir,
			}
		);
        const responseJson = await response.json();
		return responseJson;
	}

	async fetchMySubreddits() {
		const token = await this.getToken();
		const url = 'https://oauth.reddit.com/subreddits/mine/subscriber.json';
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
		this.storeMySubreddits(responseJson);
		return responseJson;
	}
}

const Client = new RedditClient();
export default Client;
