import { 
    Text,
    View, 
    Modal, 
    Image, 
    StyleSheet, 
    Dimensions,
    TouchableOpacity, 
} from 'react-native';
import React from 'react';
import { style } from './style';
import { StackNavigator } from 'react-navigation';
import { Container, Header, Content, Card, CardItem, Body, Right, SwipeRow, Icon, Button } from 'native-base';

class Post extends React.PureComponent{


    headerString = () => {
        const string  = this.props.data.subreddit_name_prefixed  + '   •   ' + this.props.data.ups + ' upvotes   •' ;
        return string;
    }

render() {
    return (
        <View style = {{ marginRight: 5, marginTop: 5, marginLeft: 5, marginBottom: 2 }}>
            <Card style = {{borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderRightWidth: 0  }} transparent >
                <CardItem header style =  {{backgroundColor: '#0b1628'}} >
                    <Text style= { style.title }> 
                        {this.headerString()}
                    </Text>
                </CardItem> 
                <SwipeRow
                    style = {{backgroundColor: '#0b1a33', borderBottomWidth: 0}} 
                    leftOpenValue={75}
                    rightOpenValue={-75}
                    left={
                        <View  style = { {height: '100%'} }>
                            <Button success onPress={() => alert('upvote')}  style = { {height: '50%'} }>
                                <Icon active name="add" />
                            </Button>
                            <Button danger onPress={() => alert('downvote')} style = { {height: '50%'} }>
                                <Icon name="add" />
                            </Button>
                        </View>
                    }
                    body={ 
                           <View style={ style.post }>
                                <TouchableOpacity 
                                    style= { style.textView }
                                    onPress= {() => this.props._onPress(this.props.data)}
                                >
                                <Text style= { style.title }> { this.props.data.title } </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress = { () => this.props._navigateToPost(this.props.data ) }
                                >
                                    <Image 
                                        source = {{ uri: this.props.data.thumbnail }}
                                        style={ style.thumbnail }
                                    />  
                                </TouchableOpacity>
                            </View>
                    }
                />
            </Card>
        </View>
    );
  }
}

export default Post;