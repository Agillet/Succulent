import React from 'react';
import {
  Text, 
  FlatList, 
  View, 
  TouchableOpacity, 
  Button, 
  Image, 
  ActivityIndicator
} from 'react-native';
import Header from '../header';
import  Post from '../post';
import Client from '../../api';
import Separator from '../separator';
import { style } from './style';
import stylePost from '../post/style';


class PostList extends React.Component {

  constructor(props) {
    super(props);
    this.backButtonListener = null;
    this.state = ({
		// loading: true,
		refreshing: true,
		subreddit: this.props.navigation.state.params.subreddit,
		loadingMore: false
    });
  }

  componentWillMount = () => {
    this.fetchData();
    ;
  }

	fetchData = () => {
    	return Client.fetchHot(this.state.subreddit)
			.then(data => {
		  		if(data.error) {
					setTimeout(() => { this.fetchData() }, 5000);
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
  	this.setState({loadingMore: true});
    	return(
			 Client.fetchNext(this.state.subreddit, this.state.after)
			.then(data => {
				let feed;
				if(!data || data.length === 0 || !this.state.posts) {
					feed = this.state.posts;
				} else {
					feed = this.state.posts.concat(data.children);
				}
				this.setState({
					posts: feed,
					after: data.after,
					loadingMore: false,
					refreshing: false,
				});
			})
		)
  	}

  handleRequest = () => {
    this.setState({ 
		loading:true,
		refreshing: true
	}, 
	() =>  {
		this.fetchData();
    });
  }

  handleMore = () => {
    if(this.state.loadingMore){
      return;
    }
    this.fetchMore();
  }

  renderHeader = (subreddit) => {
    return (
      <Header title = { subreddit } handle = { this.handleSubmit } />
    )
  }

  handleSubmit = (newSubreddit) => {
    this.props.navigation.navigate('Home', { subreddit: newSubreddit });
  }

  navigateToPost = (data) => {
	  this.props.navigation.navigate('Target', { data: data })
  }

  renderPost = (item) => {
    return (
      <View style = { style.post } >
        <Post 
          data={ item.data }  
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
    )

    renderLoading = () => {
      return (
        <ActivityIndicator />
      )
    }
  }

  render() {
    const { navigate } = this.props.navigation
    // if(this.state.loading === false ) {
      	return (
      		<View>
        		<FlatList
              		data = { this.state.posts }
					renderItem = {({item}) => this.renderPost(item)}
					keyExtractor = { (item, index) => index }
					refreshing = { this.state.refreshing }
					onRefresh = { this.handleRequest }
					ItemSeparatorComponent={ () => <Separator /> }
					onEndReachedThreshold = { 1 }
					onEndReached = { this.handleMore }
					ListHeaderComponent={ this.renderHeader(this.state.subreddit) }
					stickyHeaderIndices={[0]} 
        		/> 
    		</View>
      	);
    // } else {
    //   	return (
    //     	<ActivityIndicator />
    //   )
    // }
  }
}

export default PostList;
