import React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { style } from './style';
import { StackNavigator } from 'react-navigation';

class Post extends TouchableOpacity{
    static navigationOptions = {
        title: 'Welcome',
      };
render() {
    return (
            <View style={ style.post }> 
                <Text style= {{color: 'grey'}}> {this.props.title} </Text>
            </View>
    );
  }
}

export default Post;