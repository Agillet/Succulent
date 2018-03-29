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
import Transformer from '../Transformer/Transformer';
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
        const width = data.preview.images.slice(-1)[0].source.width;
        const height = data.preview.images.slice(-1)[0].source.height;
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
                params = Transformer.gfycat(url) ;
                url = params.url;
                type = params.type;
                break;
            default :
                type = 'link';
                break;
        }
        const screenWidth = Dimensions.get('window').width;
        const scaleFactor = width / screenWidth
        const imageHeight = height / scaleFactor;
        console.log('image ' +imageHeight)
        console.log('screen ' +  Dimensions.get('window').height)
        this.setState({type: type, imgWidth: screenWidth, imgHeight: imageHeight, loading: false, url: url})
        // }
    }

    render(){
        console.log(this.state.url);
        if(this.state.loading === false) {
            if(this.state.type === 'image') {
                return (
                    <ScrollView contentContainerStyle = { style.container } >
                    <Image 
                        source =  {{ uri: this.state.url }}
                        style = {{ width: this.state.imgWidth, height: this.state.imgHeight }}
                    />
                    </ScrollView>
                )
            } else  if (this.state.type === 'link'){
                return (
                    <WebView 
                        source = {{ uri: this.state.url }}
                    />
                );
            } else if (this.state.type === 'gifv') {
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
                            onLoadStart={() => { console.log('loading')}}
                            onLoadStart={() => { console.log('loading end')}}
                        />
                        </View>
                )
            } else if (this.state.type === 'self') {
                return (
                    <View style = { style.container } >
                        <Text>Not supported yet</Text>
                    </View>
                )
            }

        } else {
            return (
                <View>
                    <Text> Loading </Text>
                </View>
            );
        }
    }
}

export default Target;