import React from 'react';
import {View, Text} from 'react-native';
import Client from '../../api';
import { NavigationActions } from 'react-navigation'

class SplashScreen extends React.Component {

    componentDidMount () {
        console.log('splashscreen')
        Client.getToken().then( ret => {
            if(ret.token.error || ret === 'undefined') {
                console.log('splashscreen to login...');
                this.props.navigation.replace('Login');
                return; 
            } else {
            console.log('splashscreen to home...');
            this.props.navigation.replace('Home', { subreddit: 'all'});
            }
        })
        .catch(err => {
            console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    console.log('splashscreen to login...');
                    this.props.navigation.replace('Login');
                break;
                default :
                    this.props.navigation.replace('Home', { subreddit: 'all'});
                break;
            }
        });       
    }

  render(){
      return (
        <View>
            <Text> Splashscreen </Text>
        </View>
      );
  }
}


export default SplashScreen;