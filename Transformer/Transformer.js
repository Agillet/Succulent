import React from 'react';

class UrlTransformer {

    imgur(url) {
        let type = '';
        let regex = /(.*)\.(gif|jpg|jpeg|tiff|png|gifv)$/ ;
        let galleryRegex = /(https:\/\/imgur.com)(\/gallery\/)(.*)$/ ;

        if(url.match(galleryRegex)) {
            type = 'link';
            return { url, type };
        }

        if (!url.match(regex)) {
            url += '.jpg';
            type = 'image';
        } else if(url.match(regex)[2] === 'gifv') {
            url = url.substring(0, url.length - 4);
            url += 'mp4';
            type = 'gifv';
        } else {
            type = 'image'
        }    

        return { url, type };
    }

    i_imgur(url) {
        let type = '';
        let regex = /(.*)\.(gif|jpg|jpeg|tiff|png|gifv)$/ ;
        if(url.match(regex)[2] === 'gifv') {
            url = url.substring(0, url.length - 4);
            url += 'mp4';
            type = 'gifv';
        } else{
            type = 'image';
        }

        return { url, type };
    }

    gfycat(url) {
        let type = 'image';
        let pattern = /(https:\/\/)(gfycat.com\/.*)/ ;
        let urlArray = url.match(pattern);
        url = urlArray[1] + 'thumbs.' + urlArray[2] + '-size_restricted.gif' ;

        return { url, type }
    }

    i_reddit(url) {
        let regex = /(.*)\.(gif|jpg|jpeg|tiff|png|gifv)$/ ;
        if (!url.match(regex)) {
            url += '.jpg';
        }
        type = 'image';
        
        return { url, type };
    }

    v_reddit(url) {
        let type = 'gifv';
        url += '/DASH_600_K';
        
        return { url, type };
    }

    other(url) {
        url += '.jpg';

        return url;
    }
}


const Transformer = new UrlTransformer();
export default Transformer;
