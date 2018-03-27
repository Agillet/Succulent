import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
    screen : {
        backgroundColor: '#212223'
    },
    thumbnail: {
        width: 120,
        height: 120,
        marginLeft: 10,
        marginRight: 100,
        // paddingRight: 150,
        justifyContent: 'center',
      },
      post: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#212223',
        minHeight: 150,
        paddingRight: 50,
      },
  
      textView: {
        width: '66%',
        marginLeft: 15,
      },
  
      text: {
        color: 'white',
        fontSize: 18,
      },
  
  
  });