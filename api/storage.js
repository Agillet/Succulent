import React from 'react';
import { AsyncStorage  } from 'react-native';
import Storage from '../node_modules/react-native-storage';
import Client from '../api';

var storage = new Storage({
    storageBackend: AsyncStorage,
    sync : {
     token(params){
         Client.refreshToken()
         .then( (responseJson) => {
            if(responseJson.access_token){
                console.warn('token refreshed');
                storage.save({
                    key: 'token',
                    data: { token },
                    expires: 1000 * 3600
                });
                return responseJson; 
            }      
        })
        .catch( (error) => {
            console.error(error)
      })
     }   
    }
});

global.storage = storage; 
