import React, { Component } from 'react';
import { View } from 'react-native';

export default class Arrow extends Component {
    
    render() {
        return (
            <View
                // className={this.props.arrowClassName}
                // onClick={this.props.onClick}
            >
                ▾
            </View>
        );
    }
};