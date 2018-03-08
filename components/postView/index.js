import React from 'react';
import { Text, View } from 'react-native';

class PostView extends React.Component {

    render(){
        return (
            <View>
                <Text> { this.props.navigation.state.params.data.title } </Text>
            </View>
        );
    }
}

export default PostView;