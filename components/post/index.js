import React from 'react';
import { Text, View, StyleSheet, Button, Image } from 'react-native';
import { style } from './style';
import { StackNavigator } from 'react-navigation';

class Post extends React.PureComponent{

render() {
    return (
        <View style={ style.post }> 
            <Text style= {style.textView}> {this.props.data.title} </Text>
            <Image
                source={{ uri: this.props.data.thumbnail }}
                style={{width: 100, height: 100, marginLeft: 10 }}
            />
        </View>
    );
  }
}

export default Post;