// React Native CountDown Timer | react-native-countdown-component
// https://aboutreact.com/react-native-countdown-timer/
 
// import React in our code
import React, {useState, useEffect} from 'react';
 
// import all the components we are going to use
import {SafeAreaView, StyleSheet, Text, View,Image, ScrollView} from 'react-native';
 
// import CountDown to show the timer
import CountDown from 'react-native-countdown-component';
 
// import moment to help you play with date and time
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Grid from '../components/Grid';
 
const App1 = ({navigation}) => {
  // const [link, setLink] = React.useState('https://opentdb.com/api.php?amount=10&category=9&type=multiple&encode=url3986');
  const GKimg = '';
  const ScNnatureimg = '';
  const mathimg = '';
  const sportsimg = '';
  const techimg = '';
  const animalsimg = '';
  const bgimg = 'https://imgs.search.brave.com/uDoIu1_6gQEFVIK51Ogzxn6qqY2W2iPWbfHv__Ia_-A/rs:fit:1200:1080:1/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC9USHNrbnZP/LmpwZw';

  const GKapi = 'https://opentdb.com/api.php?amount=10&category=9&type=multiple&encode=url3986';
  const ScNnatureAPI = 'https://opentdb.com/api.php?amount=10&category=17&type=multiple&encode=url3986';
  const mathAPI = 'https://opentdb.com/api.php?amount=10&category=19&type=multiple&encode=url3986';
  const sportAPI = 'https://opentdb.com/api.php?amount=10&category=21&type=multiple&encode=url3986';
  const techAPI = 'https://opentdb.com/api.php?amount=10&category=18&type=multiple&encode=url3986';
  const animalsAPI = 'https://opentdb.com/api.php?amount=10&category=27&type=multiple&encode=url3986';
  const showResult=(link)=>{
    navigation.navigate('Quiz', {
      link: link,
    })
  }
  
  return (
    <SafeAreaView>
    <Image
        style={styles.logo}
        source={{
          uri:bgimg,
        }}
      />
      <ScrollView style={styles.absolute}>
      <View style={styles.col}>
        <View style={styles.row}>
      <TouchableOpacity onPress={()=>{
        showResult(GKapi);
      }}>
        <Grid title={"General Knowledge" } isLeft={true} url = {GKimg}/>
      </TouchableOpacity>


      <TouchableOpacity onPress={()=>{
        showResult(ScNnatureAPI)
      }}>
      <Grid title={"Science and Nature"} isLeft={false} />
      </TouchableOpacity>

        </View>

        <View style={styles.row}>
      <TouchableOpacity onPress={()=>{
        showResult(mathAPI);
      }}>
      <Grid title={"Mathematics"} isLeft={true}  />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{
        showResult(sportAPI);
      }}>
      <Grid title={"Sports"} isLeft={false}/>
      </TouchableOpacity>
          
        </View>
        <View style={styles.row}>
      <TouchableOpacity onPress={()=>{
        showResult(animalsAPI)
      }}>
      <Grid title={"Animals"} isLeft={true}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{
        showResult(techAPI)
      }}>
      <Grid title={"Computer And Tech."} isLeft={false}/>
      </TouchableOpacity>
          
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};
 
export default App1;
 
const styles = StyleSheet.create({
  absolute:{
    flex:1,
    position:'absolute',
    marginLeft:20,
    marginTop:50,
    height:'100%',
    textAlign:'center',
    backgroundColor: 'transparent'
  },
  logo: {
      width: '100%',
      height: '100%',
    },
  button:{
    backgroundColor:'#4b0082',
    color:'#fff',
    borderColor:'#0000ff',
    borderRightWidth:5,
    borderBottomWidth:3,
    textAlign:'center',
    // margin:20,
    justifyContent:'flex-start',
    marginTop:30,
    width:260,
    padding:10,
    // paddingHorizontal:25,
    fontSize:30,
    borderRadius:20,
  },
  button1:{
    backgroundColor:'#4b0082',
    color:'#fff',
    borderColor:'#0000ff',
    borderRightWidth:5,
    borderBottomWidth:3,
    textAlign:'center',
    // margin:20,
    justifyContent:'flex-start',
    marginTop:30,
    width:260,
    padding:10,
    marginLeft:20,
    // paddingHorizontal:25,
    fontSize:30,
    borderRadius:20,
  },
  button2:{
    backgroundColor:'#4b0082',
    color:'#fff',
    borderColor:'#0000ff',
    textAlign:'center',
    borderRightWidth:5,
    borderBottomWidth:3,
    // margin:20,
    justifyContent:'flex-start',
    marginTop:30,
    width:260,
    // height:'0%',
    padding:10,
    marginLeft:40,
    // paddingHorizontal:25,
    fontSize:30,
    borderRadius:20,
  },
  button3:{
    backgroundColor:'#4b0082',
    color:'#fff',
    borderColor:'#0000ff',
    borderRightWidth:5,
    textAlign:'center',
    borderBottomWidth:3,
    // margin:20,
    justifyContent:'flex-start',
    marginTop:30,
    width:260,
    padding:10,
    marginLeft:60,
    // paddingHorizontal:25,
    fontSize:30,
    borderRadius:20,
  },
  col:{
    flexDirection:'column',
    alignSelf:'center',
    alignContent:'center',
    justifyContent:'space-between'

  },
  row:{
    // flex:1,
    marginBottom:30,
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignContent:'center',
    alignSelf:'center',
    alignItems:'center'
  },
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
});