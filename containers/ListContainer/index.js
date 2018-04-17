import React, { Component } from 'react';
import { View, Text, DrawerLayoutAndroid, FlatList } from 'react-native';
import Client from '../../api';

class ListContainer extends React.PureComponent {

	componentDidMount() {
		this.getListSubreddits();
	}
	
	getListSubreddits = () => {
		Client.getMySubreddits().then( response => {
			this.setState({
				subreddits : response.data,
			});	
		}); 
	}

	
	
  render() {
	let navigationView = (
		<View style={{flex: 1, backgroundColor: '#fff'}}>
		<Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
		<FlatList
			data = { this.state.subreddits }
			renderItem = {({item}) => this.renderPost(item)}
			keyExtractor = { (item, index) => index }
		/>
      </View>
    );
    return (
    <DrawerLayoutAndroid
      drawerWidth={200}
      drawerPosition={DrawerLayoutAndroid.positions.Left}
      renderNavigationView={() => navigationView}
    >
        {this.props.children}
      </DrawerLayoutAndroid>
    );
  }
}

export default ListContainer;
