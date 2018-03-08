import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
    post: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'black',
      minHeight: 150
    },

    textView: {
      flexDirection: 'column',
      width: "66%",
      paddingLeft: 10,
    },

    text: {
      color: 'white',
      fontSize: 18,
    },

    thumbnail: {
      width: 100,
      height: 100,
      marginLeft: 10
    },

  });