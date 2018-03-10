import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({

    header: {
        backgroundColor:"#161616", 
        width: "100%",
        height: 100,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    title: {
        color: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        width: "20%",
        fontSize: 40,
    },

    searchBar: {
        marginRight: 20,
        width: 250,
    },

  });