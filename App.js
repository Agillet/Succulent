
import React from 'react';
import { FlatList, ActivityIndicator, Text, View  } from 'react-native';
import { StackNavigator } from 'react-navigation';
import PostList from './components/postList';
import PostView from './components/postView';
import Header from './components/header';
import Post from './components/post';
import Login from './components/login';

const RootStack = StackNavigator({
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
    screen: PostView
  },

}, {headerMode: 'none'} );

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentSubreddit: 'blackpeopletwitter' };
  }

  render(){
    return <Login />
    // return <RootStack screenProps={this.state.currentSubreddit} />
  }
}
