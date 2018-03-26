import React from 'react';
import {Text, FlatList, View, TouchableOpacity, Button, Image } from 'react-native';
import Header from '../header';
import  Post from '../post';
import Client from '../../api';
import Separator from '../separator';
import { style } from './style';
import stylePost from '../post/style';


class PostList extends React.Component {

  constructor(props) {
    super(props);
    console.log( this.props.navigation.state.params.subreddit);
    this.state = ({
      loading: true,
      refreshing: false,
      subreddit: this.props.navigation.state.params.subreddit,
    });
  }

  componentDidMount() {
    this.fetchData();
  }

	fetchData = () => {
		console.log('state :' + this.state.subreddit);
    	return Client.fetchHot(this.state.subreddit)
			.then(data => {
		  		if(data.error) {
					setTimeout(() => { this.fetchData() }, 3000);
				} else {
        			this.setState(state => ({
          			posts: data.children,
					after: data.after,
          			loading: false,
          			refreshing: false,
				}));
			}
      	});
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
      loading:true,
      refreshing: true
    }, () =>  {
    });
    this.fetchData();
  }

  handleMore = () => {
    this.setState({ 
        // loading: true
      }, () =>  {
        this.fetchMore();
      }
    );
  }

  renderHeader = (subreddit) => {
    return (
      <Header title = { subreddit } handle = { this.handleSubmit } />
    )
  }

  handleSubmit = (newSubreddit) => {
    this.setState({
      subreddit: newSubreddit
    }, () => {
    this.props.navigation.navigate('Home', { subreddit: newSubreddit });
    });
  }

  navigateToPost = (data) => {
	  this.props.navigation.navigate('ImageView', { data: data })
  }

  render() {
    const { navigate } = this.props.navigation
    if(this.state.loading === false ) {
      	return (
      		<View>
        		<FlatList
          			data = { this.state.posts }
		  			renderItem = 
						{({item}) => 
							<View style = { style.post } >
								<Post 
									data={ item.data }  
									// onPress= { () => this.navigate('PostView', { data: item.data }) }
								/>
								<TouchableOpacity
									onPress = { () => this.navigateToPost(item.data ) }
								>
									<Image 
										source = {{ uri: item.data.thumbnail }}
										style={ style.thumbnail }
									/>
								</TouchableOpacity>
							</View>
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
