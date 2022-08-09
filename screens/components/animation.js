import * as Animatable from "react-native-animatable";
import React from "react";
import { StyleSheet } from "react-native";

export default function SimpleAnimatable() {
  return (
    <Animatable.View style = {styles.absolute}>
      <Animatable.Text style = {styles.text}
        animation="bounce"
        iterationCount={"infinite"}
        direction="normal"
      >
        Loading...
      </Animatable.Text>
    </Animatable.View>
  );
}
const styles = StyleSheet.create({
    absolute:{
        flex:1,
        position:'absolute',
        alignSelf:'center',
        textAlign:'center',
        backgroundColor: 'transparent'
    },
    text:{
        margin:300,
        fontSize:50,
        color:'#fff',
        fontWeight:'bold',
        justifyContent:'center',
        alignContent:'center',
        alignSelf:'center',
        alignItems:'center',
        textAlign:'center',
    }
})
