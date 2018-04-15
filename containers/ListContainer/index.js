import React, { Component } from 'react';
import { View, Text, DrawerLayoutAndroid } from 'react-native';

class ListContainer extends Component {
  render() {
    var navigationView = (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
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
