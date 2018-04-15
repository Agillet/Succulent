import React, { Component } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import CommentList from './CommentList';
import { styles } from './styles';
import { style } from '../post/style'
import Client from '../../api';
import  Post from '../post';
import { Container, Card, CardItem, Content } from 'native-base';
import Markdown from 'react-native-easy-markdown';

class CommentView extends Component {

    constructor(props){
        super(props);    
        this.state = {
            loading: true
        }
    }

    headerString = () => {
        const string  = this.props.navigation.state.params.data.subreddit_name_prefixed  + '   •   ' +this.props.navigation.state.params.data.ups + ' upvotes   •' ;
        return string;
    }

    componentDidMount() {
        this.fetchComments();
      }

    async fetchComments() {
        const data = this.props.navigation.state.params.data;
        const response = await Client.fetchComment(data.subreddit, data.id);
        this.setState({comments : response[1].data.children, loading: false});
    }

    renderComments() {
    return( <CommentList comments={this.state.comments} link = {this.props.navigation.state.params.data.name} /> );
    }
    
    renderLoader() {
        return (
            <View style={styles.activityIndicatorContainer}>
                <ActivityIndicator style={styles.activityIndicator} />
            </View>
        )
    }

    renderPost = (item) => {
        return (
                <Post 
                    data={ item.data }  
                />
        )
    }

    navigateToPost = (data) => {
        this.props.navigation.navigate('Target', { data: data })
    }

    render() {
        return (
            <Container style = {{ backgroundColor: 'rgba(52, 52, 52, 0.8)' }} >
                    <Card style = {{borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderRightWidth: 0 }} >
                        <CardItem header style =  {{backgroundColor: '#0b1628'}} >
                            <Text style= { style.title }> 
                                {this.headerString()}
                            </Text>
                        </CardItem> 
                        <View style={ style.selfPost }>
                            <View style= { style.textView }>
                                <Text style= { style.title }> { this.props.navigation.state.params.data.title } </Text>
                            </View>
                            <TouchableOpacity
                                onPress = { () => this.navigateToPost(this.props.navigation.state.params.data ) }
                            >
                                <Image 
                                    source = {{ uri: this.props.navigation.state.params.data.thumbnail }}
                                    style={ style.thumbnail }
                                    />  
                            </TouchableOpacity>
                        </View>
                        <Markdown> { this.props.navigation.state.params.data.selftext } </Markdown>
                    </Card>
                    <Content>
                <View style={styles.container}>
                    {this.state.loading ?  this.renderLoader() :this.renderComments()}
                </View>
                </Content>
                
            </Container>
        );
      }
}

export default CommentView;
