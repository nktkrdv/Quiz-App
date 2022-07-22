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
        height:160,
        width:160,
        marginLeft:20,
        backgroundColor:'#00ffff',
        borderBottomEndRadius:30,
        borderBottomStartRadius:30,
        borderTopLeftRadius:30,
    },
    boxLeft:{
        padding:30,
        height:160,
        marginRight:10,
        width:160,
        backgroundColor:'#00ffff',
        borderBottomEndRadius:30,
        borderBottomStartRadius:30,
        borderTopEndRadius:30,
    },
    img:{
        height:50,
        width:50,
        borderRadius:100,
        alignContent:'center',
        alignSelf:'center',
    },
    title:{
        fontSize:20,
        color:'#000',
        textAlign:'center',
    }
})