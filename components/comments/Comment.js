import React from 'react';
import { 
    Text, 
    View, 
    Image,
    ActivityIndicator
 } from 'react-native';
 import Client from '../../api';
 import CommentList from './CommentList';
 import { styles } from './styles';
 import disclosure90 from './images/disclosure90.png';
 import disclosure from './images/disclosure.png';

 class Comment extends React.Component{
    constructor(props) {
      super (props);
      this.state = {
        repliesShown: true,
      }
    }

    _renderRepliesSection = () => {
        const repliesSection =
        (<View>
          <View style={styles.rowContainer}>
            <Text onPress={this._toggleReplies} style={styles.repliesBtnText}>
            Replies
            </Text>
            <Image
              style={[styles.disclosure, styles.muted]}
              source={this.state.repliesShown ? disclosure90 : disclosure}
            />
          </View>
            {this.state.repliesShown && this._renderReplies()}
        </View>);
        return repliesSection;
    }
  
    _toggleReplies = () => {
        this.setState({
            repliesShown: !this.state.repliesShown
      })
    }
  
    _renderReplies = () => {
        if('children' in this.props.comment.data) {
            return null;
        }
        if(this.props.comment.data.replies !== '' && this.props.comment.data !== 'undefined'){
            return (
                <View style={styles.repliesContainer}>
                <CommentList comments={this.props.comment.data.replies.data.children}></CommentList>
                </View>
            )
        } else {
            return null;
        }
    }
  
render() {
    return (
      <View >
        <View style={styles.rowContainer}>
          <Text style={styles.author}>{this.props.comment.data.author + ' '}</Text>
        </View>
        <View style={styles.postDetailsContainer}>
          <Text style={styles.commentBody}>{this.props.comment.data.body}</Text>
          {this._renderRepliesSection()}
        </View>
      </View>
    );
  }
}

export default Comment;
