import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const LeaderBoardRow = ({Number,Name,Points}) => {
  return (
    // <View style = {styles.row}>
    <View style = {(Number!=1)?styles.row:styles.first}>
        <Text style = {styles.text}>{Number}</Text>
        <Text style={styles.text}>{Name}</Text>
        <Text style={styles.text}>{Points} Pts.</Text>
    </View>
     
  )
}

const styles = StyleSheet.create({
  first:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:350,
    borderBottomColor:'blue',
    alignSelf:'center',
    margin:20,
    padding:30,
    backgroundColor:'gold',
    borderBottomWidth:5,
    borderBottomEndRadius:10,
    borderBottomLeftRadius:10,
    borderRadius:10,
  },
    row:{
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'space-between',
        margin:10,
        color:'#000',
        width:350,
        
        alignSelf:'center',
        backgroundColor:'#0ff',
        // margin:20,
        padding:15,
        borderColor:'#fff',
        borderBottomWidth:3,
        borderRadius:10,
    },
    text:{
      textAlign:'center',
      fontSize:20,
      color:'#000',
      fontWeight:'bold',

    },
    highlighted:{
      textAlign:'center',
      fontSize:20,
      color:'#00f',
      fontWeight:'bold',
    }
})

export default LeaderBoardRow