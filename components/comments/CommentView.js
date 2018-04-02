import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import CommentList from './CommentList';
import { styles } from './styles';
import Client from '../../api';

class CommentView extends Component {

    constructor(props){
        super(props);    
        this.state = {
            loading: true
        }
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

    render() {
        return (
            <View style={[styles.container, styles.viewContainer]}>
                {this.state.loading ?  this.renderLoader() :this.renderComments()}
            </View>
        );
      }
}

export default CommentView;
