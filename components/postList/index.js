import React from 'react';
import {
	Text, 
	FlatList, 
	View, 
	TouchableOpacity, 
	Button, 
	Image, 
	ActivityIndicator,
	DrawerLayoutAndroid
} from 'react-native';
import { Container, Icon, Fab } from 'native-base';
import Header from '../header';
import  Post from '../post';
import Client from '../../api';
import { style } from './style';
import stylePost from '../post/style';
import ListContainer from '../../containers/ListContainer';

class PostList extends React.Component {
	
	constructor(props) {
		super(props);
		this.backButtonListener = null;
		this.state = ({
			loading: true,
			refreshing: true,
			subreddit: this.props.navigation.state.params.subreddit,
			loadingMore: false
		});
	}
	
	componentDidMount = async () => {
		let data = await this.fetchData();
	}
	
	fetchData = () => {
		return Client.fetchHot(this.state.subreddit)
		.then(data => {
			if(data) {
				this.setState(state => ({
					posts: data.children,
					after: data.after,
					loading: false,
					refreshing: false,
				}));
			} 
		}
	);
}

fetchMore = () => {
	console.log('fetching more');
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
	if(this.state.loadingMore || this.state.loading){
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

renderList = () => {
	let listRef = '';  
	return(
		<View style = {style.screen} >
			<FlatList
				data = { this.state.posts }
				renderItem = {({item}) => this.renderPost(item)}
				keyExtractor = { (item, index) => index }
				refreshing = { this.state.refreshing }
				onRefresh = { this.handleRequest }
				onEndReachedThreshold = { 0.5 }
				onEndReached = { this.handleMore }
				ListHeaderComponent={ this.renderHeader(this.state.subreddit) }
				stickyHeaderIndices={[0]} 
				ref={(ref) => { this.listRef = ref; }}
			/>
			<Fab onPress = {() => this.listRef.getScrollResponder().scrollTo({y: 0, animated: true})}>
				<Icon name="arrow-up" />
			</Fab> 
		</View>
	);
}

render() {
	const { navigate } = this.props.navigation;
	
	return (
		<ListContainer>
			{this.renderList()}
		</ListContainer>
	);
}
}

export default PostList;
