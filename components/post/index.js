import React from 'react';
import { Text, View, StyleSheet, Button, Image } from 'react-native';
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

                <Image 
                    source={{ uri: this.props.data.thumbnail }}
                    style={ style.thumbnail }
                />


        </View>
    );
  }
}

export default Post;