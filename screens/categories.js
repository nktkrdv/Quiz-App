
import React, {useState, useEffect} from 'react';
 
// import all the components we are going to use
import {SafeAreaView,TextInput, StyleSheet, Text, View,Image, ScrollView, FlatList} from 'react-native';
 
// import moment to help you play with date and time
import moment, { calendarFormat } from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Grid from './components/grid';
import { BlurView } from 'expo-blur';
import { Dropdown } from 'react-native-element-dropdown';
 
const App1 = ({navigation}) => {
  const GKimg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRySUQ60CRL2e0SK89cVTq7weTEY-ZvCc4eYQ5aCMNynuxCvNRkAb6FrRagoKC3NWPelHY&usqp=CAU';
  const ScNnatureimg = 'data:image/png;base64,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';
  const mathimg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS617mPU9eh8CYUnoXQ6Iu9GgeU64gCGrJfer2xkwXYxcT9LKEqVnRDumPqYOUSyoOeY4s&usqp=CAU';
  const sportsimg = 'data:image/jpeg;base64,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';
  const techimg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSAaFDfJ4eeONr7E4NL2jynD-G_c3vlUpLmA&usqp=CAU';
  const animalsimg = 'data:image/png;base64,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';
  const bgimg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa5UIogPeTeL00zo_ybf3cL52DDAZ3F7K40Q&usqp=CAU';
  const [showMenu,setShowMenu] = React.useState(false);
  const cancelImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPs2CgRYqEB56IjdDYH8zTsIcEx8DQqnd4aA&usqp=CAU'

  const Api = 'https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple&encode=url3986'
  const apiStr = 'https://opentdb.com/api.php?';
  const amount = 'amount=';
  const category = '&category='
  const difficulty = '&difficulty='
  const apiLast = '&type=multiple&encode=url3986';
  const [diff,setDiff] = React.useState('');
  const [quesLen, setQuesLen] = React.useState('10');
  const [cat , setCat] = React.useState('');

  const data = [
    { label: 'Any', value:''},
    { label: 'Easy', value: 'easy' },
    { label: 'Medium', value: 'medium' },
    { label: 'Hard', value: 'hard' },
  ];

  const showResult=(link)=>{
    if(diff == ''){
      var API = apiStr + amount + quesLen + category + cat  + apiLast;
    }
    else
      var API = apiStr + amount + quesLen + category + cat + difficulty + diff + apiLast;
    console.log(API),
    navigation.navigate('Quiz', {
      link: API,
      time : parseInt(quesLen)
    });
  }
  
  // const handleSubmit=()=>{
  // }
  const changeText=(text)=>{
    for(var i=0;i<text.length;i++){
      if(text.charAt(i) > '9' || text.charAt(i) <'0'){
        setQuesLen(text.substring(0,i));
        return;
      }
    }
    if(text.charAt(0) > '4' && text.length == 2){
      setQuesLen('50');
    }
    else{
        setQuesLen(text)
    }
  }
  
  const CategoryyItems = [
    {topic : "General Knowledge", category: 9, img : GKimg},
    {topic : "Science And Nature", category: 17, img : ScNnatureimg},
    {topic : "Mathematics", category:19, img: mathimg},
    {topic : "Sports", category:21, img : sportsimg},
    {topic : "Computer And Tech.", category: 18, img:techimg},
    {topic : "Animals", category:27, img:animalsimg},
  ];
  return (
    <View style = {{height:'100%', width:'100%'}}>
    <Image
        style={styles.logo}
        source={{
          uri:bgimg,
        }}
      /> 
      <View style = {{position:'absolute', alignSelf:'center', justifyContent:'space-between'}}>
    <Text style={styles.heading}>Categories</Text>

    <FlatList style={{alignSelf:'center'}}
          data={ CategoryyItems }
          renderItem={ ({item}) =>
          <TouchableOpacity onPress={()=>{
            setCat(item.category);
            setShowMenu(true);
          }}>
            <Grid title={item.topic} isLeft={true} url = {item.img}/>
          </TouchableOpacity>
          }
          numColumns={2}
       />
      </View>
      {showMenu && <BlurView intensity={110} tint='dark' style = {styles.absolute} >
      <TouchableOpacity onPress={()=>setShowMenu(false)} style = {{width:300}}>

      <Image
      style={{height:30,width:30, borderRadius:20, alignSelf:'flex-end'}}
        source={{uri:cancelImg}}
        
      />
      </TouchableOpacity>
      <View style={styles.card}>

      <View style={{flexDirection:'row',justifyContent:'space-around',alignContent:'center'}}>
          <Text style={styles.title}>No. of Questions:</Text>
          <TextInput 
          maxLength={2}
            style={styles.textInput}
            keyboardType = 'number-pad'
            onChangeText = {(text)=> changeText(text)}
            defaultValue={'10'}
            value={quesLen}
          />
      </View>
          <Text style={styles.title}>Difficulty:</Text>

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeHolderStyle}
            selectedTextStyle={styles.placeHolderStyle}
            data={data}
            labelField='label'
            valueField='value'
            value={diff}
            onChange={item => {
              setDiff(item.value);
              console.log(item.value);
            }}
          />
      <Text onPress={()=>showResult()} style={styles.button}>Start</Text>
      </View>
      </BlurView>}
    </View>
  );
};
 
export default App1;
 
const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color:'#000',
    padding: 20,
  },
  logo:{
    height:'100%',
    width:'100%',
  },
  heading:{
    fontSize:30,
    height:100,
    margin:20,
    alignSelf:'center',
    alignItems:'center',
    fontWeight:'bold',
    color:'#fff',
  },
  absolute:{
    position:'absolute',
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center',
    alignContent:'center',
    // marginTop:'40%',
    width:'100%',
    height:'100%',
    textAlign:'center'
  },
  placeHolderStyle:{
    fontSize:16,
    color:'#000',
    fontWeight:'bold',
  },
  dropdown:{
    height:50,
    width:200,
    color:'#000',
    backgroundColor:'#fff',
    // position:'absolute',
    padding:10,
    borderRadius:20,
  },
  label: {
    color:'#000',
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  textInput:{
    color:'#000a',
    padding:10,
    borderRadius:10,
    fontWeight:'bold',
    backgroundColor:'#fff',
    width:40,
    height:40,
  },
  card:{
    height:300,
    width:300,
    alignSelf:'center',
    backgroundColor:'#00ffff',
    alignContent:'center',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:30,
  },
  button:{
    fontSize:20,
    backgroundColor:'#228b82',
    color:'#fff',
    padding:10,
    paddingHorizontal:40,
    borderRadius:20,
    marginTop:30,
    borderColor:'#32cd32',
    borderRightWidth:4,
    borderBottomWidth:4,
    fontWeight:'bold',
  }
});