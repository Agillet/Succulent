import React from 'react';
import { 
    Text, 
    View, 
    Image,
    ActivityIndicator,
    TouchableHighlight
 } from 'react-native';
 import { Card, CardItem, SwipeRow, Button, Icon } from 'native-base';
 import Client from '../../api';
 import CommentList from './CommentList';
 import { styles } from './styles';
 import { style } from '../post/style';
 import Markdown from 'react-native-easy-markdown';

 class Comment extends React.Component{
    constructor(props) {
      super (props);
      this.state = {
        repliesShown: true,
        loading: false,
      }
    }

    componentWillMount() {
        if('children' in this.props.comment.data) {
            this.setState({
                'moreChildren': true, 
                'link' : this.props.comment.data.link_id, 
                'children' : this.props.comment.data.children,
            });
        }
    }

    renderLoader = () => {
        return (
            <ActivityIndicator />
        )
    }

    _renderRepliesSection = () => {
        if('children' in this.props.comment.data) {
            return null;
        }
        let repliesSection = (
            <View>
                {this.state.repliesShown && this._renderReplies()}
            </View>);
    
        return repliesSection;
    }
  
    _toggleReplies = () => {
        // console.log(this.props.comment.data);
        this.setState({
            repliesShown: !this.state.repliesShown
      })
    }
  
    _renderReplies = () => {
        if(this.props.comment.data.replies !== ''  && this.props.comment.data !== 'undefined'){
            return (
                <View style={styles.repliesContainer}>
                    <CommentList comments={this.props.comment.data.replies.data.children}></CommentList>
                </View>
            )
        } 
    }

    getBorderColor = () => {
        const colors = ['#E83030', '#E89F30', '#C3E830', '#55E830', '#30E87A', '#30E8E8', '#307AE8','#5530E8', '#C330E8', '#E8309F'];
        return colors[this.props.comment.data.depth];
    }

    renderComment = () => {
        if(this.state.moreChildren) {
            return( 
                <View style= { { marginLeft: 15} }>
                    <Text style={styles.commentBody} onPress= {this.getMoreComments}>Load more comments</Text>
                </View> 
            )         
        }
        return (
            <TouchableHighlight  onPress= {this._toggleReplies} >
                <View style= { { marginLeft: 15} } >
                    <Markdown text = {{color: 'white'}} >{this.props.comment.data.body}</Markdown> 
                </View>
            </TouchableHighlight>
        );
    }

    getMoreComments = () => {
        const data = this.props.comment.data;
        const response = Client.fetchMoreComments(this.state.link, this.state.children.join())
        .then(response => console.log(response));
    }

    render() {
        if(this.state.loading) {
            return (
                <ActivityIndicator />
            )
        } else {
            return (
                <View style = {{ paddingTop: 2 }}>
                    <SwipeRow
                        style = {{borderLeftWidth: 0.5, borderStyle: 'dashed', borderColor: this.getBorderColor(), backgroundColor: '#0b1a33', borderBottomWidth: 0}} 
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
                            this.renderComment()
                        }
                    />
                    {this._renderRepliesSection()}
                </View>
            );
        }   
    }
}

export default Comment;
