import React, { Component } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import CommentList from './CommentList';
import { styles } from './styles';
import { style } from '../post/style'
import Client from '../../api';
import  Post from '../post';
import { Container, Card, CardItem, Content } from 'native-base';

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
    return( <CommentList comments={this.state.comments} /> );
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
            <Container>
                <Content>
                    <Card style = {{borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderRightWidth: 0  }} transparent >
                        <CardItem header style =  {{backgroundColor: '#0b1628'}} >
                            <Text style= { style.title }> 
                                {this.headerString()}
                            </Text>
                        </CardItem> 
                        <View style={ style.post }>
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
                    </Card>
                </Content>
                <View style={[styles.container, styles.viewContainer]}>
                    {this.state.loading ?  this.renderLoader() :this.renderComments()}
                </View>
            </Container>
        );
      }
}

export default CommentView;
