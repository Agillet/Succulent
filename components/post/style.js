import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
    post: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#0b1a33',
    //   minHeight: 150,
    },

    selfPost: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0b1a33',
        height: '100%'
    },

    textView: {
      width: '66%',
      marginLeft: 15,
    },

    text: {
      color: 'white',
      fontSize: 18,
    },

    thumbnail: {
      width: 100,
      height: 100,
      marginLeft: 10,
      paddingRight: 15,
      justifyContent: 'center',
    },

    title: {
      color: 'white',
    },
  });