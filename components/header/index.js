import React from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { SearchBar } from 'react-native-elements'
import { style } from './style';

class Header extends React.Component{

    onSubmit = (subreddit) => {
        this.props.handle(subreddit);         
    }
render() {
    return  (
        <View style = { style.header } >
            <Text 
            style = {style.title }  
            adjustsFontSizeToFit 
            numberOfLines={2}
            > { this.props.title } </Text>
            <View   style = { style.searchBar }>
                <SearchBar
                    lightTheme
                    // onChangeText={someMethod}
                    // onClearText={someMethod}
                    onSubmitEditing = {(event) => this.onSubmit(event.nativeEvent.text) }
                    placeholder='Type Here...' 
                />
                </View>
                <Button 
                    title= 'login'
                    onPress= { this.props.login } 
                />
        </View>
    );
  }
}

export default Header;