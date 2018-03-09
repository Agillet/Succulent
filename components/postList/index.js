import React from 'react';
import {Text, FlatList, View, TouchableOpacity } from 'react-native';
import Header from '../header';
import  Post from '../post';
import Client from '../../api';
import Separator from '../separator';
import { style } from './style';

class PostList extends React.Component {

  constructor(props) {
    super(props);
    this.state = ({
      loading: true,
      refreshing: false,
      subreddit: this.props.screenProps,
    })
    this.fetchData();
  }

  fetchData =  () => {
    return Client.fetchHot(this.state.subreddit)
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
      if(!data || data.length === 0) {
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
       this.fetchData();
     });
  }

  handleMore = () => {
    this.setState({ 
      loading: true
     }, () =>  {
       this.fetchMore();
     });
  }

  handler(e) {
    e.preventDefault()
  }

  renderHeader = (subreddit) => {
    return (
      <Header title = { subreddit }/>
    )
  }

  render() {
    const { navigate } = this.props.navigation
    if(this.state.loading !== 'true') {
      return (
      <View>

        <FlatList
          data = { this.state.posts }
          renderItem = { ({item}) => 

            <Post 
              data={ item.data }  
              onPress= { () => navigate('PostView', { data: item.data }) }
            />
          
          }
          initialNumToRender = { 100 }
          keyExtractor = { (item, index) => index }
          refreshing = { this.state.refreshing }
          onRefresh = { this.handleRequest }
          ItemSeparatorComponent={ () => <Separator /> }
          onEndReached = { this.handleMore }
          onEndReachedThreshold = { 75 }
          ListHeaderComponent={ this.renderHeader(this.state.subreddit) }
        />

    </View>
      );
    }
  }
}

export default PostList;
