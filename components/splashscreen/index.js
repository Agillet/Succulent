import React from 'react';
import {View, Text} from 'react-native';

class SplashScreen extends React.Component {

    componentDidMount () {
        storage.load({ key: 'token'}).then( ret => {
            if(ret.length > 0) {
                this.props.navigation.navigate('Home', { subreddit: 'all'});
            } else {
                this.props.navigation.navigate('Login');
            }
        })
        .catch(err => {
            console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    // TODO; 
                    break;
                case 'ExpiredError':
                    // TODO 
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