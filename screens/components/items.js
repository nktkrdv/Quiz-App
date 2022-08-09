import { View, Text, StyleSheet } from 'react-native'
import React  from 'react'
import STRINGS from '../../assets/constants/strings'
import COLORS from '../../assets/constants/colors'

const ItemHistory = ({data}) => {
    return (
      <View style={(data.key%2==0)?[styles.item,styles.blueBG]:[styles.item,styles.darkBlueBG]}>
            <Text style={styles.title}>{STRINGS.SCORE + data.score}</Text>
            <View style={styles.col}>
            <Text style = {styles.text}>{STRINGS.COMPLETED_ON + data.doneAt.toDate().toDateString()}</Text>
            <Text style = {styles.text}>{STRINGS.AT + data.doneAt.toDate().toTimeString().substring(0,9)}</Text>
            </View>
      </View>
    )
  }
  
  const styles = StyleSheet.create({
      col:{
          margin:10,
          padding:5,
      },
      item:{
          fontSize:20,
          color:COLORS.WHITE,
          alignSelf:'center',
          backgroundColor:COLORS.DARK_BLUE,
          margin:10,
          width:'100%',
          padding:10,
          textAlign:'center',
          borderRadius:20,
          alignContent:'center',
          borderRightWidth:2,
          borderBottomWidth:2,
          borderColor:COLORS.LIGHT_GREEN
      },
      title:{
          fontSize:30,
          fontWeight:STRINGS.BOLD,
          color:COLORS.GREEN,
          textAlign:'center',
          justifyContent:'center',
          alignSelf:'center',
      },
      text:{
          color:COLORS.WHITE,
          fontSize:15,
          borderRadius:10,
      },
      blueBG:{
        backgroundColor:COLORS.OCEAN_BLUE,
        borderColor:COLORS.DARK_BLUE
      },
      darkBlueBG:{
        backgroundColor:COLORS.DARK_BLUE,
        borderColor:COLORS.OCEAN_BLUE
      }
  })
  export default ItemHistory