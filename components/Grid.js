import { View, Text, ScrollView, StyleSheet, Image } from 'react-native'
import React from 'react'

const Grid = ({title,url,isLeft}) => {
  return (
    <View style={isLeft?styles.boxLeft:styles.boxRight}>
        <Image style={styles.img} source={{uri:url}}/>
        <Text style = {styles.title}>{title}</Text>
    </View>
  )
}

export default Grid

const styles = StyleSheet.create({
    boxRight:{
        padding:30,
        height:170,
        width:170,
        alignSelf:'flex-end',
        // alignItems:'flex-end'
        // marginLeft:10,
        backgroundColor:'#00ffff',
        borderBottomEndRadius:30,
        borderBottomStartRadius:30,
        borderTopLeftRadius:30,
    },
    boxLeft:{
        padding:30,
        height:170,
        marginRight:20,
        width:170,
        backgroundColor:'#00ffff',
        borderBottomEndRadius:30,
        borderBottomStartRadius:30,
        borderTopEndRadius:30,
    },
    img:{
        height:80,
        width:80,
        borderRadius:100,
        marginBottom:10,
        alignContent:'center',
        alignSelf:'center',
    },
    title:{
        fontSize:20,
        color:'#000',
        fontWeight:'bold',
        textAlign:'center',
    }
})