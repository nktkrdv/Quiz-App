import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const QuesStats = ({navigation}) => {
  return (
      <View style = {styles.container}>
    <View style = {styles.column}>
      <View style = {styles.row}>
        <TouchableOpacity>
            <Text style = {styles.btnBlue}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text style = {styles.btnGreen}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text style = {styles.btnBlue}>3</Text>
        </TouchableOpacity>
      </View>
      
      <View style = {styles.row}>
        <TouchableOpacity>
            <Text style = {styles.btnBlue}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text style = {styles.btnGreen}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text style = {styles.btnBlue}>6</Text>
        </TouchableOpacity>
      </View>

      <View style = {styles.row}>
        <TouchableOpacity>
            <Text style = {styles.btnGreen}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text style = {styles.btnBlue}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text style = {styles.btnGreen}>9</Text>
        </TouchableOpacity>
      </View>
      <View style = {styles.rowlast}>
        <TouchableOpacity>
            <Text style = {styles.btnBlue}>10</Text>
        </TouchableOpacity>
      </View>
      
    </View>
    </View>
  )
}

export default QuesStats

const styles = StyleSheet.create({
    container:{
        height:'100%',
        width:'100%',
        // marginTop:50,
        // marginBottom:50,
        // marginLeft:20,
        // marginRight:20,
    },
    btnGreen:{
        color:'#000',
        backgroundColor:'#0f0',
        borderRadius:30,
        fontSize:20,
        textAlign:'center',
        padding:10,
        height:50,
        width:50,
    },
    btnBlue:{
        color:'#fff',
        backgroundColor:'#00f',
        fontSize:20,
        textAlign:'center',
        height:50,
        borderRadius:30,
        padding:10,
        fontWeight:'bold',
        width:50,
    },
    row:{
        alignContent:'center',
        // alignSelf:'center',
        justifyContent:'space-between',
        flexDirection:'row',
        margin:20,
    },
    column:{
        justifyContent:'space-evenly',
        flexDirection:'column',
        margin:50,
    },
    rowlast:{
        flexDirection:'row',
        margin:30,
        alignItems:'center',
        justifyContent:'center',
        alignContent:'center',
    }
});