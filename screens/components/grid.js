import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const Grid = ({title,url}) => {
  return (
    <View style={styles.box}>
        <Image style={styles.img} source={{uri:url}}/>
        <Text style = {styles.title}>{title}</Text>
    </View>
  )
}

export default Grid

const styles = StyleSheet.create({
    box:{
        padding:30,
        height:170,
        margin:20,
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