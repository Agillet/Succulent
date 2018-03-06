
import React from 'react';
import { FlatList, ActivityIndicator, Text, View  } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Header } from './components/header';
import PostList from './components/postList';
import PostView from './components/postView';
import HomeScreen from './components/homescreen';
import Post from './components/post';

const RootStack = StackNavigator({
  Home: {
    title: 'Hello',
    screen: PostList,
    navigationOptions: {
      title: 'Succulent',
    },
  },
  PostView: {
    screen: PostView
  },
})

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentSubreddit: 'all' };
  }

  render(){
    return <RootStack screenProps={this.state.currentSubreddit} />
  }
}
