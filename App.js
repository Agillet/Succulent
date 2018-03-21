
import React from 'react';
import { FlatList, ActivityIndicator, Text, View, AsyncStorage  } from 'react-native';
import { StackNavigator } from 'react-navigation';
import PostList from './components/postList';
import PostView from './components/postView';
import Header from './components/header';
import Post from './components/post';
import Login from './components/login';
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
  PostView: {
    screen: PostView,
  },
  Login: {
    screen: Login,
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
