import React, {useState, useEffect} from 'react';
import {SafeAreaView,TextInput, StyleSheet, Text, View,Image, ScrollView, FlatList} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Grid from './components/grid';
import { BlurView } from 'expo-blur';
import { Dropdown } from 'react-native-element-dropdown';
import LINKS from '../assets/constants/links';
import STRINGS from '../assets/constants/strings';
import NAV from '../assets/constants/navigation';
import COLORS from '../assets/constants/colors';
 
const Categories = ({navigation}) => {
  const [showMenu,setShowMenu] = React.useState(false);
  const [diff,setDiff] = React.useState('');
  const [quesLen, setQuesLen] = React.useState('10');
  const [cat , setCat] = React.useState('');
  const [warning,setWarning] = React.useState(false);

  const data = [
    { label: STRINGS.LABEL, value:STRINGS.ANY},
    { label: STRINGS.EASY, value: STRINGS.EASY },
    { label: STRINGS.MEDIUM, value: STRINGS.MEDIUM },
    { label: STRINGS.HARD, value: STRINGS.HARD },
  ];

  const showResult=(link)=>{
    if(quesLen=='' || parseInt(quesLen)<1){
      setWarning(true);
      return;
    }
    else{

      if(diff == ''){
        var API = LINKS.API + LINKS.AMOUNT + quesLen + LINKS.CATEGORY + cat  + LINKS.API_LAST;
      }
      else
        var API = LINKS.API + LINKS.AMOUNT + quesLen + LINKS.CATEGORY + cat + LINKS.DIFFICULTY + diff + LINKS.API_LAST;
      console.log(API),
      navigation.navigate(NAV.QUIZ, {
        link: API,
        time : parseInt(quesLen)
      });
    }

  }
  
  const changeText=(text)=>{
    for(var i=0;i<text.length;i++){
      if(text.charAt(i) > '9' || text.charAt(i) <'0'){
        setQuesLen(text.substring(0,i));
        if(parseInt(text.substring(0,i)>50)) setWarning(true);
        return;
      }
    }
    if(text.charAt(0) > '4' && text.length == 2){
      if(parseInt(text)>50)
      setWarning(true);
      setQuesLen('50');
    }
    else{
      setWarning(false)
        setQuesLen(text)
    }
  }
  
  const CategoryyItems = [
    {topic : STRINGS.GK, category: 9, img : LINKS.GK_IMG},
    {topic : STRINGS.SCIENCE_AND_NATURE, category: 17, img : LINKS.SCI_AND_NATURE},
    {topic : STRINGS.MATH, category:19, img: LINKS.MATH_IMG},
    {topic : STRINGS.SPORTS, category:21, img : LINKS.SPORTS_IMG},
    {topic : STRINGS.TECH, category: 18, img:LINKS.TECH_IMG},
    {topic : STRINGS.ANIMALS, category:27, img:LINKS.ANIMALS_IMG},
  ];
  return (
    <View>
    <Image
        style={styles.logo}
        source={{
          uri:LINKS.BG_IMG,
        }}
      /> 
      <View style = {styles.absolute}>
    <Text style={styles.heading}>{STRINGS.CATEGORIES}</Text>

    <FlatList
          data={ CategoryyItems }
          renderItem={ ({item}) =>
          <TouchableOpacity onPress={()=>{
            setCat(item.category);
            setShowMenu(true);
          }}>
            <Grid title={item.topic} url = {item.img}/>
          </TouchableOpacity>
          }
          numColumns={2}
       />
      </View>
      {showMenu && <BlurView intensity={110} tint='dark' style = {styles.absolute} >
      <TouchableOpacity onPress={()=>setShowMenu(false)} style = {styles.width}>

      <Image
      style={styles.cancel}
        source={{uri:LINKS.CANCEL_IMG}}
        
      />
      </TouchableOpacity>
      <View style={styles.card}>

      <View style={styles.questions}>
          <Text style={styles.title}>{STRINGS.QUES_SIZE}</Text>
          <TextInput 
          maxLength={2}
            style={styles.textInput}
            keyboardType = 'number-pad'
            onChangeText = {(text)=> changeText(text)}
            defaultValue={'10'}
            value={quesLen}
          />
      </View>
      {warning && <Text style={styles.warning}>{STRINGS.WARNING}</Text>}
          <Text style={styles.title}>{STRINGS.CATEGORIES}</Text>

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
            }}
          />
      <Text onPress={()=>showResult()} style={styles.button}>{STRINGS.START}</Text>
      </View>
      </BlurView>}
    </View>
  );
};
 
export default Categories;
 
const styles = StyleSheet.create({
  width:{
    width:300,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color:COLORS.BLACK,
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
    color:COLORS.WHITE,
  },
  absolute:{
    position:'absolute',
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center',
    alignContent:'center',
    width:'100%',
    height:'100%',
    textAlign:'center'
  },
  placeHolderStyle:{
    fontSize:16,
    color:COLORS.BLACK,
    fontWeight:'bold',
  },
  dropdown:{
    height:50,
    width:200,
    color:COLORS.BLACK,
    backgroundColor:COLORS.WHITE,
    padding:10,
    borderRadius:20,
  },
  label: {
    color:COLORS.BLACK,
    position: 'absolute',
    backgroundColor: COLORS.WHITE,
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  textInput:{
    color:COLORS.BLACK,
    padding:10,
    borderRadius:10,
    fontWeight:'bold',
    backgroundColor:COLORS.WHITE,
    width:40,
    height:40,
  },
  card:{
    height:300,
    width:300,
    alignSelf:'center',
    backgroundColor:COLORS.LIGHT_BLUE,
    alignContent:'center',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:30,
  },
  button:{
    fontSize:20,
    backgroundColor:COLORS.TEAL,
    color:COLORS.WHITE,
    padding:10,
    paddingHorizontal:40,
    borderRadius:20,
    marginTop:30,
    borderColor:COLORS.GREEN,
    borderRightWidth:2,
    borderBottomWidth:2,
    fontWeight:'bold',
  },
  cancel:{
    height:30,
    width:30,
     borderRadius:20, 
     alignSelf:'flex-end'
    },
    questions:{
      flexDirection:'row',
      justifyContent:'space-around',
      alignContent:'center'
    },
    warning:
    {
      color:COLORS.RED,
    fontWeight:'bold',
    padding:2,
    borderRadius:10
  }
});