import React from 'react';
import {Text, FlatList, View, TouchableOpacity, Button } from 'react-native';
import Header from '../header';
import  Post from '../post';
import Client from '../../api';
import Separator from '../separator';
import { style } from './style';

class PostList extends React.Component {

  constructor(props) {
    super(props);
    this.state = ({
      loading: false,
      refreshing: false,
      subreddit: this.props.navigation.state.params.subreddit,
    })
    this.fetchData();
  }

  fetchData =  () => {
    return Client.fetchHot('all')
      .then(data => {
        this.setState(state => ({
          posts: data.children,
          after: data.after,
          loading: false,
          refreshing: false,
        }));
      })
  }

  fetchMore = () => {
    return Client.fetchNext(this.state.subreddit, this.state.after)
    .then(data => {
      var feed;
      if(!data || data.length === 0 || !this.state.posts) {
        feed = this.state.posts;
      } else {
        feed = this.state.posts.concat(data.children);
      }
      this.setState({
        posts: feed,
        after: data.after,
        loading: false,
        refreshing: false,
      });
    })
  }

  handleRequest = () => {
    this.setState({ 
      refreshing: true
    }, () =>  {
    });
    this.fetchData();
  }

  handleMore = () => {
    this.setState(
      { 
        loading: true
      }, () =>  {
        this.fetchMore();
      }
    );
  }

  handleSubmit = (newSubreddit) => {
    this.setState({
      subreddit: newSubreddit
    });
    this.handleRequest();
}

  goToLogin = () => {
    this.props.navigation.navigate('Login');
  }


  renderHeader = (subreddit) => {
    return (
      <Header title = { subreddit } handle = { this.handleSubmit } login = { this.goToLogin } />
    )
  }

  render() {
    const { navigate } = this.props.navigation
    if(this.state.loading !== 'true' ) {
      return (
      <View>
        <FlatList
          data = { this.state.posts }
          renderItem = {
            ({item}) => 
              <Post 
                data={ item.data }  
                onPress= { () => navigate('PostView', { data: item.data }) }
              />
          }
          initialNumToRender = { 50 }
          keyExtractor = { (item, index) => index }
          refreshing = { this.state.refreshing }
          onRefresh = { this.handleRequest }
          ItemSeparatorComponent={ () => <Separator /> }
          onEndReached = { () => this.handleMore }
          onEndReachedThreshold = { 1 }
          ListHeaderComponent={ this.renderHeader(this.state.subreddit) }
        />

    </View>
      );
    }
  }
}

export default PostList;
