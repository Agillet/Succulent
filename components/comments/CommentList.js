import React from 'react'; 
import { 
    Text, 
    View, 
    Image,
    FlatList,
    ActivityIndicator
} from 'react-native';
import Client from '../../api';
import Comment from './Comment';
import { styles } from './styles';


class CommentList extends React.Component {
    constructor(props) {
        super(props);
    }
    
    renderComment(item) {
        return (
            <Comment comment={item} link = {this.props.link}/>
        )
    }
    
    render() {
        return (
            <FlatList
            data = { this.props.comments }
            keyExtractor = { (item, index) => index }
            renderItem = { ({item}) => this.renderComment(item)}
            initialNumToRender = {10}
            />
        );
    }
}

export default CommentList;