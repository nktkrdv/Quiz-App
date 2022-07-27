import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Items = ({map,qno}) => {
    const correct = decodeURIComponent(map.get("correct"))
    const incorrect = decodeURIComponent(map.get("chosen"))
    const score = decodeURIComponent(map.get("score"))
    const question = decodeURIComponent(map.get("question"))
  return (
    <View style = {styles.bg}>
    <View style = {styles.row}>
        <Text style = {styles.top}>Question {qno}</Text>
        <Text style={styles.top}>{score}</Text>
    </View>
      <Text style={styles.title}>{question}</Text>
      <Text style={styles.correct}>{correct}</Text>
      {(score ==0 && incorrect != "") && (<Text style={styles.incorrect}>{incorrect}</Text>)}
      {(incorrect == "") && (<Text style = {styles.notAns}>Not Answered</Text>)}
    </View>
  )
}

const styles = StyleSheet.create({
    notAns:{
        fontSize:20,
        color:'white',
        margin:10
    },
    top:{
        // marginto
        color:'white',
        fontSize:20,
        // backgroundColor:'#00ff00',
        borderRadius:10,
        margin:10,
        padding:5,
    },
    bg:{
        backgroundColor:"#4b0082",
        margin:10,
        padding:10,
        borderColor:'#0000ff',
        // borderWidth:5,
        borderRightWidth:5,
        borderBottomWidth:5,
        // borderra
        borderRadius:20,
    },
    row:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    incorrect:{
        color:'white',
        fontSize:20,
        backgroundColor:'#ff726f',
        borderRadius:10,
        margin:10,
        padding:5,
    },
    correct:{
        color:'white',
        fontSize:20,
        backgroundColor:'#008080',
        borderRadius:10,
        margin:10,
        padding:5,
    },
    title:{
        color:'white',
        fontSize:20,
        // backgroundColor:'#008080',
        borderRadius:10,
        margin:10,
        padding:5,
    }
})
export default Items