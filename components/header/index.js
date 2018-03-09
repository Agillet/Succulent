import React from 'react';
import { Text, View, TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { style } from './style';

class Header extends React.Component{

render() {
    return  (
        <View style = { style.header } >
            <Text style = {style.title}> { this.props.title } </Text>
        </View>
    );
  }
}

export default Header;