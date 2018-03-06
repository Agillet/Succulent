import React from 'react';
import { Text, View } from 'react-native';

class HomeScreen extends React.Component{

    redirect = () => {
        setTimeout(() => { 
            this.props.navigation.navigate('Subreddit');
        }, 1000)   
    }

    render() {
        this.props.navigation.navigate('Subreddit');
        return (
            <View>
                <Text> Succulent </Text>
            </View>
        )
    }
}

export default HomeScreen;