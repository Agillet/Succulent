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
import Client from '../../api';
import { StackNavigator } from 'react-navigation';
import { Container, Header, Content, Card, CardItem, Body, Right, SwipeRow, Icon, Button } from 'native-base';
import Markdown from 'react-native-easy-markdown';
import { Ionicons } from '@expo/vector-icons';

class Post extends React.PureComponent{


    headerString = () => {
        const data = this.props.data
        const string  = data.subreddit_name_prefixed  + '   •   u/' + data.author;
        return string;
    }

    footerString = () => {
        const data = this.props.data
        const string  = data.score + ' upvotes   •   ' + data.num_comments + ' comments ';
        return string;
    }

    renderActions = () => {
        return (
        <View  style = { {height: '100%', flexDirection: 'row', backgroundColor: 'red', justifyContent: 'space-between'}}>
            <Button onPress={() => this.vote(this.props.data.id, 1)} style = {{height: '100%'}}>
                <Ionicons name="md-arrow-up" />
            </Button>
            <Button onPress={() => this.vote(this.props.data.id, -1)} style = {{height: '100%'}}>
                <Ionicons name="md-arrow-down" />
            </Button>
        </View>
        );
    }

    vote = (id, dir) => {
        return Client.vote(id, dir);
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
                    style = {{backgroundColor: '#0b1a33', borderBottomWidth: 0, justifyContent: 'center',}} 
                    leftOpenValue= {200}
                    swipeToOpenPercent = {50}
                    left={this.renderActions()}
                    body={ 
                           <View style= { style.post }>
                                <TouchableOpacity 
                                    style={ style.textView }
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
                <CardItem footer style =  {{backgroundColor: '#0b1628'}} >
                    <Text style= { style.title }> 
                        {this.footerString()}
                    </Text>
                </CardItem> 
            </Card>
        </View>
    );
  }
}

export default Post;