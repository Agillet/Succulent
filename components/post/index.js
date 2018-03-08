import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import { style } from './style';
import { StackNavigator } from 'react-navigation';

class Post extends PureComponent{
render() {
    return (
        <TouchableOpacity onPress = { this.props.onPress }>
            <View style={ style.post }> 
                <View style= {style.textView}>
                    <Text style = { style.text } > { this.props.data.title } </Text>
                    <Text style = { style.text } > { this.props.data.author } </Text>
                </View>
                <Image
                    source={{ uri: this.props.data.thumbnail }}
                    style={style.thumbnail}
                />
            </View>
        </TouchableOpacity>

    );
  }
}

export default Post;