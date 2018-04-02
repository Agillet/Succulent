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
import { style } from './style';
import stylePost from '../post/style';


class PostList extends React.Component {

    constructor(props) {
    super(props);
    this.backButtonListener = null;
    this.state = ({
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

                    this.setState(state => ({
                    posts: data.children,
                    after: data.after,
                    loading: false,
                    refreshing: false,
                }));
            }
        );
    }

    fetchMore = () => {
    this.setState({loadingMore: true});
        return(
                Client.fetchHot(this.state.subreddit, this.state.after)
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
        console.log(data);
        this.props.navigation.navigate('Target', { data: data })
    }

    navigateToComment = (data) => {
    this.props.navigation.navigate('Comments', { data: data });
}

    renderPost = (item) => {
        return (
                <Post 
                    data={ item.data }  
                    _onPress = {this.navigateToComment }
                    _navigateToPost = {this.navigateToPost}
                />
        )
    }

    renderLoading = () => {
    	return (
        	<ActivityIndicator />
      	)
	}

	render() {
	    const { navigate } = this.props.navigation
      	return (
      		<View style = {style.screen} >
				<FlatList
                    data = { this.state.posts }
                    renderItem = {({item}) => this.renderPost(item)}
                    keyExtractor = { (item, index) => index }
                    refreshing = { this.state.refreshing }
                    onRefresh = { this.handleRequest }
                    onEndReachedThreshold = { 1 }
                    onEndReached = { this.handleMore }
                    ListHeaderComponent={ this.renderHeader(this.state.subreddit) }
                    stickyHeaderIndices={[0]} 
        		/> 
    		</View>
      	);
	}
}

export default PostList;
