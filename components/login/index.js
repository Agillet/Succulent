import React, { Component, PropTypes } from 'react';
import { View, WebView , AsyncStorage } from 'react-native';
import utf8 from 'utf8';
import binaryToBase64 from 'binaryToBase64';
import Client from '../../api';

class Login extends React.Component {

	goHome = () => {
    	this.props.navigation.navigate('Home', { subreddit: 'all'} )
  	}

	onNavigationStateChange = (navState) => {
		if (navState.url.indexOf('https://www.google.fr') === 0) {
            const regex = /^(https:\/\/www.google.fr\/\?state=toto&code=)(.*)?$/ ;
          	return( 
				Client.fetchToken(navState.url.match(regex)[2])
				.then( (responseJson) => {
					if(responseJson.access_token){
						 Client.storeToken(responseJson);
						 Client.setRefreshToken(responseJson.refresh_token);
					}
				})
				.then( this.props.navigation.navigate('Home', { subreddit: 'all'}))
            	.catch( (error) => {
              		console.error(error)
            	})
          	)
        }
	}

	render() {
		const REDDIT_APP_ID = '0f_WVPMtSN9uLg';
		const LOGIN_URL = 'https://www.reddit.com/api/v1/authorize.compact?client_id='
			+ REDDIT_APP_ID +
			'&response_type=code' +
			'&state=toto' +
			'&redirect_uri=https://www.google.fr' +
			'&duration=permanent' +
			'&scope=identity edit flair history, mysubreddits, privatemessages, read, report, save, submit, subscribe, vote, wikiread';
		return (  
			<WebView
				source={{uri: LOGIN_URL}}
				onNavigationStateChange={(this.onNavigationStateChange)}
			/>
		)
	}
}

export default Login;