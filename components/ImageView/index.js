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
        console.log(this.state.height);
        console.log(this.state.width);
        const regex = /(.*)\.(gif|jpg|jpeg|tiff|png|gifv)$/ ;
        let url = data.url;
        let type = '';
        console.log(data.domain);
        // if(url.match(regex)) {

            switch(data.domain) {
                case 'i.imgur.com': 
                    if(url.match(regex)[2] === 'gifv') {
                        url = url.substring(0, url.length - 4);
                        url += 'mp4';
                        type = 'gifv';
                    } else{
                        type = 'image';
                    }
                    break;
                case 'imgur.com':
                    if (!url.match(regex)) {
                        url += '.jpg';
                        type = 'image';
                    } else if(url.match(regex)[2] === 'gifv') {
                        url = url.substring(0, url.length - 4);
                        url += 'mp4';
                        type = 'gifv';
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
                case 'gfycat.com' : 
                    type = 'gifv';
                    let pattern = /(https:\/\/)(gfycat.com\/.*)/ ;
                    urlArray = url.match(pattern);
                    url = urlArray[1] + 'giant.' + urlArray[2] + '.mp4' ;
                    console.log(urlArray);
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