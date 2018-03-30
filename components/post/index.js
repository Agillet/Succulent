import { 
    Text, 
    View, 
    Modal, 
    Image, 
    Button, 
    StyleSheet, 
    TouchableOpacity, 
} from 'react-native';
import React from 'react';
import { style } from './style';
import { StackNavigator } from 'react-navigation';

class Post extends React.PureComponent{

render() {
    return (
        <View style={ style.post }> 
            <TouchableOpacity 
                style= { style.textView }
                onPress= {() => this.props._onPress(this.props.data)}
            >
                <Text style= { style.title }> 
                    { this.props.data.title }
                </Text>
            </TouchableOpacity>
        </View>
    );
  }
}

export default Post;