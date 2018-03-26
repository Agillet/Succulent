import React from 'react';
import { AsyncStorage  } from 'react-native';
import Storage from '../node_modules/react-native-storage';
import Client from '../api';

var storage = new Storage({
    storageBackend: AsyncStorage,
});

global.storage = storage; 
