import React, { Component, PropTypes } from 'react';
import { View, WebView } from 'react-native';
import utf8 from 'utf8';
import binaryToBase64 from 'binaryToBase64';

class Login extends Component {

  onNavigationStateChange = (navState) => {
    // console.log(navState);
    if (navState.url.indexOf('https://www.google.fr') === 0) {
  const regex = /^(https:\/\/www.google.fr\/\?state=toto&code=)(.*)?$/ ;
  this.getToken(navState.url.match(regex)[2]);
    }
  }

  getToken (code) {
    let headers = new Headers();
console.log("yo");
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
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
    );
  }

  render() {
    const REDDIT_APP_ID = '0f_WVPMtSN9uLg'
    const LOGIN_URL = 'https://www.reddit.com/api/v1/authorize.compact?client_id=0f_WVPMtSN9uLg&response_type=code&state=toto&redirect_uri=https://www.google.fr&duration=permanent&scope=identity edit flair history, mysubreddits, privatemessages, read, report, save, submit, subscribe, vote, wikiread'
    return (
      <WebView
        source={{uri: LOGIN_URL}}
        onNavigationStateChange={(this.onNavigationStateChange)}
      />
    )
  }
}

export default Login;