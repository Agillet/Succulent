import React from 'react';
import {Text, FlatList, View, TouchableOpacity } from 'react-native';
import  Post from '../post';
import Client from '../../api';
import Seperator from '../seperator';

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
      var concat = this.state.posts.concat(data.children);
      this.setState({
        posts: concat,
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

  render() {
    const { navigate } = this.props.navigation
    if(this.state.loading !== 'true') {
      return (
      <View>
        <FlatList
          data = { this.state.posts }
          renderItem = { ({item}) => 
            <TouchableOpacity 
              onPress= { () => navigate('PostView', { data: item.data }) } 
            >
              <Post title={ item.data.title } />
            </TouchableOpacity>  
          }
          keyExtractor = { (item, index) => index }
          refreshing = { this.state.refreshing }
          onRefresh = { this.handleRequest }
          ItemSeparatorComponent={ () => <Seperator /> }
          onEndReached = { this.handleMore }
          onEndReachedThreshold = { 10 }
        />
    </View>
      );
    }
  }
}

export default PostList;