import React from 'react';
import { 
    Text, 
    View, 
    Image,
    WebView, 
    Dimensions, 
    ScrollView, 
    BackHandler, 
    ActivityIndicator
 } from 'react-native';
import { Video } from 'expo';
import Transformer from '../../Transformer/Transformer';
import { style } from './style';


class Target extends React.Component {

    state = {
        imgWidth: 0,
        imgHeight: 0,
        image: null,
        loading: true,
        url: this.props.navigation.state.params.data.url,
      }

    componentDidMount() {
        const data = this.props.navigation.state.params.data;
        if(data.is_self) {
            this.setState({type: 'self', loading: false});
            return;
        }
        const width = data.preview ? data.preview.images.slice(-1)[0].source.width : 0;
        const height = data.preview ? data.preview.images.slice(-1)[0].source.height : 0;
        const regex = /(.*)\.(gif|jpg|jpeg|tiff|png|gifv)$/ ;
        let url = data.url;
        let type = '';
        let params = {};
        switch(data.domain) {
            case 'i.imgur.com': 
                params = Transformer.i_imgur(url);
                url = params.url;
                type = params.type;    
                break;
            case 'imgur.com':
                params = Transformer.imgur(url);
                url = params.url;
                type = params.type;    
                break;
            case 'v.redd.it' :
                params = Transformer.v_reddit(url);
                url = params.url;
                type = params.type; 
                break;
            case 'i.redd.it':
                params = Transformer.i_reddit(url);
                url = params.url;
                type = params.type;                     
                break;
            case 'gfycat.com' : 
                // params = Transformer.gfycat(url) ;
                url = data.preview.reddit_video_preview.scrubber_media_url;
                type = 'gifv';
                break;
            default :
                type = 'link';
                break;
        }
        const screenWidth = Dimensions.get('window').width;
        const scaleFactor = width / screenWidth
        const imageHeight = height / scaleFactor;
        this.setState({type: type, imgWidth: screenWidth, imgHeight: imageHeight, loading: false, url: url})
    }

    render(){
        console.log(this.state.url);
        if(this.state.loading === false) {
            switch (this.state.type) {
                case 'image':
                    return (
                        <ScrollView contentContainerStyle = { style.container } >
                            <Image 
                                source =  {{ uri: this.state.url }}
                                style = {{ width: this.state.imgWidth, height: this.state.imgHeight }}
                            />
                        </ScrollView>
                    );
                    break;
                case 'gifv':
                    return (
                        <View style = { style.container } >
                            <Video
                                source={{ uri: this.state.url }}
                                rate={1.0}
                                volume={1.0}
                                isMuted={false}
                                resizeMode="cover"
                                shouldPlay
                                isLooping
                                style={{ width: this.state.imgWidth, height: this.state.imgHeight }}
                            />
                        </View>
                    );
                    break;
                case 'self':
                    return (
                        <View style = { style.container } >
                            <Text>Not supported yet</Text>
                        </View>
                    )
                    break;
                default :
                    return (
                        <WebView 
                            source = {{ uri: this.state.url }}
                        />
                    );
                    break;
            }
        } else {
            return (
                <ActivityIndicator />
            );
        }
    }
}

export default Target;