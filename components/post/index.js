import { Text, View, StyleSheet, Button, Image, TouchableOpacity, Modal } from 'react-native';
import React from 'react';
import { style } from './style';
import { StackNavigator } from 'react-navigation';

class Post extends React.PureComponent{

render() {
    return (
        <View style={ style.post }> 
            <View style= { style.textView }>
                <Text style= { style.title }> 
                    { this.props.data.title }
                </Text>
            </View>
        </View>
    );
  }
}

export default Post;