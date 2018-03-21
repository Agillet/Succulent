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
      loading: true,
      refreshing: false,
      subreddit: this.props.navigation.state.params.subreddit,
    })
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
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
    console.log('end reached...');
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
        // loading: true
      }, () =>  {
        this.fetchMore();
      }
    );
  }

  renderHeader = (subreddit) => {
    return (
      <Header title = { subreddit } />
    )
  }

  render() {
    const { navigate } = this.props.navigation
    if(this.state.loading === false ) {
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
          keyExtractor = { (item, index) => index }
          refreshing = { this.state.refreshing }
          onRefresh = { this.handleRequest }
          ItemSeparatorComponent={ () => <Separator /> }
          onEndReachedThreshold = { 1 }
          onEndReached = { () => this.handleMore() }
          ListHeaderComponent={ this.renderHeader(this.state.subreddit) }
          stickyHeaderIndices={[0]} 
        /> 

    </View>
      );
    } else {
      return (
        <View><Text>Loading</Text></View>
      )
    }
  }
}

export default PostList;
