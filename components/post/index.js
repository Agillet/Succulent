import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { style } from './style';
import { StackNavigator } from 'react-navigation';

class Post extends React.Component{
    static navigationOptions = {
        title: 'Welcome',
      };
render() {
    // const { navigate } = this.props.navigation;
    return (
        <View>
        <Button 
        title="hello"
            // style={ style.post }
        onPress={  this.props.navigation.push('Post', {title: 'WHATEVER'}) }
        />
        <Text style= {{color: 'grey'}}> { this.props.data.title } </Text>
        </View>
    );
  }
}

export default Post;