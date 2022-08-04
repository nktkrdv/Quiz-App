import { View, Text, StyleSheet,Image } from 'react-native'
import React from 'react'
import SimpleAnimation from './congratsAnimation';


function ButtonImg({img}){
  return(
    <Image style={{height:'110%',width:'15%',resizeMode:'cover',paddingTop:3,alignItems:'center',alignContent:'center',justifyContent:'center',marginTop:8}}
      source={img}
    />
  );
}

const LeaderBoardRow = ({Number,Name,Points}) => {
  const firstImg = require('../../assets/images/goldIcon.png')
  const secondImg = require('../../assets/images/silverIcon.png');
  const thirdImg = require('../../assets/images/bronzeIcon.png');
  return (
    <View style={{flexDirection:'row'}}>
    {/* <SimpleAnimation/> */}
      {Number>3?<Text style = {styles.text}>{Number}</Text>:<ButtonImg img={(Number == 1)?firstImg:((Number==2)?secondImg:((Number==3)?thirdImg:''))}/>}

    <View style = {(Number==1)?[styles.row,{backgroundColor:'#ffb300'}]:((Number==2)?[styles.row,{backgroundColor:'silver'}]:((Number==3?([styles.row,{backgroundColor:'#cd7f32'}]):styles.row)))}>
        <Text style={styles.name}>{Name}</Text>
        <Text style={styles.pts}>{Points} Pts.</Text>
    </View>
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
        width:'80%',
        alignSelf:'center',
        backgroundColor:'#0ff',
        padding:15,
        borderColor:'#fff',
        borderBottomWidth:3,
        borderRadius:10,
    },
    text:{
      textAlign:'center',
      fontSize:30,
      // resizeMode:'cover',
      width:'15%',
      color:'#fff',
      borderRadius:40,
      textAlignVertical:'center',
      fontWeight:'bold',
      marginTop:10,
      marginBottom:10,

    },
    highlighted:{
      textAlign:'center',
      fontSize:20,
      color:'#00f',
      fontWeight:'bold',
    },
    bottomButton:{
      height:'100%',
      // resizeMode',
      alignSelf:'center',
      alignItems:'center',
      justifyContent:'center',
      alignContent:'center',
      width:'18%',
      borderRadius:40,
    },
    name:{
      width:'50%',
      fontSize:15,
      fontWeight:'bold',
    },
    pts:{
      width:'30%',
      fontSize:15,
      fontWeight:'bold',
    }
})

export default LeaderBoardRow