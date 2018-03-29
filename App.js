import React from 'react';
import { FlatList, ActivityIndicator, Text, View, AsyncStorage  } from 'react-native';
import { StackNavigator } from 'react-navigation';
import PostList from './components/postList';
import Header from './components/header';
import Post from './components/post';
import Login from './components/login';
import Target from './components/Target';
import SplashScreen from './components/splashscreen';

const RootStack = StackNavigator({
  SplashScreen: {
    screen: SplashScreen,
  },
  Home: {
    title: 'Hello',
    screen: PostList,
    headerMode: 'none',
    header: null,
    navigationOptions: {
      headerVisible: false,
    },
  },
  Login: {
    screen: Login,
  },
  Target: {
    screen: Target,
  }

}, {headerMode: 'none'} );

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentSubreddit: 'all' };
  }

  render(){
    // storage.remove({key: 'token'});
    return <RootStack />
  }
}
