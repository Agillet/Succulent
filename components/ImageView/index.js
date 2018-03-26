import React from 'react';
import { Text, View, Image, Dimensions, WebView } from 'react-native';
import { Video } from 'expo';
class PostView extends React.Component {

    state = {
        imgWidth: 0,
        imgHeight: 0,
        image: null,
        loading: true,
        url: this.props.navigation.state.params.data.url,
      }

    componentDidMount() {
        const data = this.props.navigation.state.params.data;
        const width = data.preview.images.slice(-1)[0].source.width;
        const height = data.preview.images.slice(-1)[0].source.height;
        const regex = /(.*)\.(gif|jpg|jpeg|tiff|png|gifv)$/ ;
        let url = data.url;
        let type = '';
        console.log(data.domain);
        // if(url.match(regex)) {

            switch(data.domain) {
                case 'i.imgur.com': 
                    if(url.match(regex)[2] === 'gifv') {
                        type = 'gifv';
                        // url = url.substring(0, url.length - 1);
                    }
                    break;
                case 'imgur.com':
                    if (!url.match(regex)) {
                            url += '.jpg';
                            type = 'image';
                    }
                    break;
                case 'v.redd.it' :
                console.log(data);
                    type='gifv';
                    url += '/DASH_600_K';
                    break;
                case 'i.redd.it':
                    if (!url.match(regex)) {
                        url += '.jpg';
                    }
                    type = 'image';
                    break;
                default :
                    type = 'link';
                    break;
            }
        const screenWidth = Dimensions.get('window').width;
        const scaleFactor = width / screenWidth
        const imageHeight = height / scaleFactor
        this.setState({type: type, imgWidth: screenWidth, imgHeight: imageHeight, loading: false, url: url})
        // }
    }

    render(){
        console.log(this.state.url);
        if(this.state.loading === false) {
            if(this.state.type === 'image') {
                return (
                    <Image 
                        source =  {{ uri: this.state.url }}
                        style = {{ width: this.state.imgWidth, height: this.state.imgHeight }}
                        onLoadStart = { () => console.log('loading') }
                        onLoadEnd = { () => console.log('loading Ended') }
                    />
                )
            } else  if (this.state.type === 'link'){
                return (
                    <WebView 
                        source = {{ uri: this.state.url }}
                    />
                );
            }   else if (this.state.type === 'gifv') {
                return (
                    <Video
                        source = {{uri: this.state.uri }}
                        poster="https://baconmockup.com/300/200/"
                        ref={(ref) => {
                            this.player = ref
                          }}    
                          rate={1.0}
                          volume={1.0}
                          muted={false}
                          resizeMode={"cover"}
                          repeat
                    />
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

export default PostView;