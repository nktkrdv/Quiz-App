import * as React from 'react';
import { View, Text ,Image, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RadioButton } from 'react-native-paper';
import SimpleAnimatable from '../components/Animation';
import { BlurView } from 'expo-blur';
import {Stopwatch, Timer} from 'react-native-stopwatch-timer';
import App1 from './Categories';
import CountDown from 'react-native-countdown-component';
import { useRoute } from '@react-navigation/native';

export default function Quiz({ navigation }) {
  // const []
  const [isRunning,setIsRunning] = React.useState(true);
  const [questions, setQuestions] = React.useState();
  const [ques, setQues] = React.useState(0);
  const [options, setOptions]= React.useState([])
  const [score, setScore]= React.useState(0)
  const [isLoading, setIsLoading]= React.useState(false)
  const [showMenu, setShowMenu] = React.useState(false);
  const [value, setValue] = React.useState('');
  const bgimg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTod4yNGJMd3hnPYzabnADQzzbt81DbDWei9w&usqp=CAU';
  // const [timerDuration, setTimerDuration] = React.useState(90000);
  // const [resetTimer, setResetTimer] = React.useState(false);
  const Route = useRoute();

  const [isTimerStart, setIsTimerStart] = React.useState(true);

  function Quesstatus(){
    return (
      <View style = {styles.bottomContainer}>
      <TouchableOpacity onPress={()=>{
        setShowMenu(false);
      }}>

      <Image style = {styles.miniLogo} source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPs2CgRYqEB56IjdDYH8zTsIcEx8DQqnd4aA&usqp=CAU'}}/>
      </TouchableOpacity>
      <View style={styles.column2}>
      <View style = {styles.row4}>
        <Text style = {styles.blue}>   </Text>
        <Text style = {styles.para2}>Not Answered</Text>
      </View>
      <View style = {styles.row4}>
        <Text style = {styles.green}>   </Text>
        <Text style = {styles.para2}>Answered</Text>
      </View>
      </View>
    <View style = {styles.column}>
      <View style = {styles.row2}>
        <TouchableOpacity onPress={() => {
          setQues(0)
          setOptions(generateOptionsAndShuffle(questions[0]))
          setShowMenu(false)
        }}>
            <Text style = {(myMap.get(0) != undefined && myMap.get(0).get("chosen") != "")?(styles.btnGreen):styles.btnBlue}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          setQues(1)
          setOptions(generateOptionsAndShuffle(questions[1]))
          setShowMenu(false)
        }}>
            <Text style = {(myMap.get(1) != undefined && myMap.get(1).get("chosen") != "")?(styles.btnGreen):styles.btnBlue}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          setQues(2)
          setOptions(generateOptionsAndShuffle(questions[2]))
          setShowMenu(false)
        }}>
            <Text style = {(myMap.get(2) != undefined && myMap.get(2).get("chosen") != "")?(styles.btnGreen):styles.btnBlue}>3</Text>
        </TouchableOpacity>
      </View>
      
      <View style = {styles.row2}>
        <TouchableOpacity onPress={() => {
          setQues(3)
          setOptions(generateOptionsAndShuffle(questions[3]))
          setShowMenu(false)
        }}>
            <Text style = {(myMap.get(3) != undefined && myMap.get(3).get("chosen") != "")?(styles.btnGreen):styles.btnBlue}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          setQues(4)
          setOptions(generateOptionsAndShuffle(questions[4]))
          setShowMenu(false)
        }}>
            <Text style = {(myMap.get(4) != undefined && myMap.get(4).get("chosen") != "")?(styles.btnGreen):styles.btnBlue}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          setQues(5)
          setOptions(generateOptionsAndShuffle(questions[5]))
          setShowMenu(false)
        }}>
            <Text style = {(myMap.get(5) != undefined && myMap.get(5).get("chosen") != "")?(styles.btnGreen):styles.btnBlue}>6</Text>
        </TouchableOpacity>
      </View>

      <View style = {styles.row2}>
        <TouchableOpacity onPress={() => {
          setQues(6)
          setOptions(generateOptionsAndShuffle(questions[6]))
          setShowMenu(false)
        }}>
            <Text style = {(myMap.get(6) != undefined && myMap.get(6).get("chosen") != "")?(styles.btnGreen):styles.btnBlue}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          setQues(7)
          setOptions(generateOptionsAndShuffle(questions[7]))
          setShowMenu(false)
        }}>
            <Text style = {(myMap.get(7) != undefined && myMap.get(7).get("chosen") != "")?(styles.btnGreen):styles.btnBlue}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          setQues(8)
          setOptions(generateOptionsAndShuffle(questions[8]))
          setShowMenu(false)
        }}>
            <Text style = {(myMap.get(8) != undefined && myMap.get(8).get("chosen") != "")?(styles.btnGreen):styles.btnBlue}>9</Text>
        </TouchableOpacity>
      </View>
      <View style = {styles.rowlast}>
        <TouchableOpacity onPress={() => {
          setQues(9)
          setOptions(generateOptionsAndShuffle(questions[9]))
          setShowMenu(false)
        }}>
            <Text style = {(myMap.get(9) != undefined && myMap.get(9).get("chosen") != "")?(styles.btnGreen):styles.btnBlue}>10</Text>
        </TouchableOpacity>
      </View>
      <View style = {styles.row}>
        <Text onPress={()=>{
          navigation.navigate('Home')
        }} style = {styles.previous}>End Quiz</Text>
        <Text onPress={()=>{
          handleTimeOut();
        }} style = {styles.next}>Submit</Text>
      </View>
      
    </View>
    </View>
  )
  }
  
  // const answerMap = new Map();
  const [myMap, setMyMap] = React.useState(new Map());
  const updateMap = (k,v) => {
    setMyMap(new Map(myMap.set(k,v)));
  }

  const getQuiz = async () => {
    
    setIsLoading(true)
    // const num = 10;
    const url = Route.params.link;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.results)
    setQuestions(data.results);
    setOptions(generateOptionsAndShuffle(data.results[0]))
    setIsLoading(false)
  };

  React.useEffect(() => {
    getQuiz();
  }, []);

  const previousClick=()=>{
    setQues(ques-1)
    // setscore
    
    setOptions(generateOptionsAndShuffle(questions[ques-1]))
  }
  const handleNextPress=()=>{
    // if(ques >= questions.length-1)
    //   setQues(ques-1)
    if(myMap.get(ques) == undefined)
    updateMap(ques,new Map([["chosen",""],["correct",questions[ques].correct_answer], ["score", 0],["question", questions[ques].question]]))
    // if(ques == 9)
    setQues(ques+1)
    setOptions(generateOptionsAndShuffle(questions[ques+1]))
  }

  const generateOptionsAndShuffle=(_question)=>{
    const options= [..._question.incorrect_answers]
    options.push(_question.correct_answer)
 
    shuffleArray(options)
    
    return options
  }
  // const 

  const handlSelectedOption=(_option)=>{
    console.log(myMap)
    if(_option===questions[ques].correct_answer){
      setScore(score+10)
      updateMap(ques,new Map([["chosen",_option],["correct",questions[ques].correct_answer], ["score", 10],["question", questions[ques].question]]))
    }
    else{
      updateMap(ques,new Map([["chosen",_option],["correct",questions[ques].correct_answer], ["score", 0],["question",questions[ques].question]]))
    }
    if(ques!==9){
      setQues(ques+1)
      setOptions(generateOptionsAndShuffle(questions[ques+1]))
    }
    if(ques===9){
      showResult()
    }
  }
  const showResult=()=>{
    handleShowResult()
    setIsRunning(false);
    navigation.navigate('Result', {
      map: myMap,
    })
  }
  const handleShowResult=()=>{
    for(var i=0;i<10;i++){
      if(myMap.get(i) == undefined)
      updateMap(i,new Map([["chosen",""],["correct",questions[i].correct_answer], ["score", 0],["question", questions[i].question]]))
    }
    // updateMap(ques,new Map([["chosen",""],["correct",questions[ques].correct_answer], ["score", 0],["question", questions[ques].question]]))
    setIsRunning(false);
    navigation.navigate('Result', {
      map: myMap,
    })
  }

  const handleTimeOut=()=>{
    for(var i=0;i<10;i++){
      if(myMap.get(i) == undefined)
      updateMap(i,new Map([["chosen",""],["correct",questions[i].correct_answer], ["score", 0],["question", questions[i].question]]))
    }
    setIsRunning(false);
    navigation.navigate('Result', {
      map: myMap,
    })
  }
  const handleMenu=()=>{
    setShowMenu(true);
  }


  const shuffleArray=(array)=> {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
    return (
        <View style = {styles.hundred}>
        {/* <Quesstatus/> */}
      <View style = {styles.absolute}>
        <Image
        style={{resizeMode:'stretch',height:'100%',width:'100%'}}
        source={{
          uri:bgimg,
        }}
      />
      {isLoading && <SimpleAnimatable/>}

      </View>
      {questions && (<View style= {styles.absolute}>
      <View style = {styles.header}>
        <Text style={styles.quesTitle}>
          Ques. {ques+1}
        </Text>
        <CountDown
        style = {optionTimer}
          until={100}
          running={isRunning}
          //duration of countdown in seconds
          timeToShow={['M','S']}
          //formate to show
          digitStyle='#fff'
          showSeparator= 'true'
          // digitTxtStyle='#000'
          digitTxtStyle='#fff'
          timeLabelStyle='#fff'
          onFinish={() => {
            alert('Time Out')
            handleTimeOut()}}
          //on Finish call
          // onPress={() => alert('hello')}
          //on Press call
          
          size={20}
        />
        <TouchableOpacity onPress={handleMenu}>
          <Image style={styles.miniLogo} source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6vFxAcPPKlizCgBCNWhQ4XfBLy33AvQ7Y_A&usqp=CAU'}}/>
        </TouchableOpacity>
      </View>
      <View style = {styles.col}>

        <Text style = {styles.para}>
          Q. {decodeURIComponent(questions[ques].question)}
        </Text>
        <View style = {styles.sixty}>
        <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                <View style={styles.innerContainer}>
                    <TouchableOpacity style={((myMap.get(ques) != undefined && myMap.get(ques).get("chosen") == options[0])?styles.chosen:styles.options)} onPress={()=>handlSelectedOption(options[0])}>
                        <Text style={styles.para}>{decodeURIComponent(options[0])}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={((myMap.get(ques) != undefined && myMap.get(ques).get("chosen") == options[1])?styles.chosen:styles.options)} onPress={()=>handlSelectedOption(options[1])}>
                        <Text style={styles.para}>{decodeURIComponent(options[1])}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={((myMap.get(ques) != undefined && myMap.get(ques).get("chosen") == options[2])?styles.chosen:styles.options)} onPress={()=>handlSelectedOption(options[2])}>
                        <Text style={styles.para}>{decodeURIComponent(options[2])}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={((myMap.get(ques) != undefined && myMap.get(ques).get("chosen") == options[3])?styles.chosen:styles.options)} onPress={()=>handlSelectedOption(options[3])}>
                        <Text style={styles.para}>{decodeURIComponent(options[3])}</Text>
                    </TouchableOpacity>
                </View>
            </RadioButton.Group>
            </View>
      </View>
            <View style= {styles.row}>
            {(ques !== 0) ? (<Text
                    onPress={previousClick}
                    style={styles.previous}>Previous</Text>):<Text style = {styles.empty}> </Text>}
      {ques == 9?(<Text
                    onPress={handleShowResult}
                    style={styles.next}>Submit</Text>):(
                      <Text
                    onPress={handleNextPress}
                    style={styles.next}>Next</Text>
                    )
      }
            </View>
      </View>)}
      {showMenu && <BlurView intensity={110} tint='dark' style = {styles.container}>
        <Quesstatus/>
      </BlurView>}
        </View>
    );
}
const styles = StyleSheet.create({
  col:{
    flexDirection:'column',
    justifyContent:'space-evenly',
    // backgroundColor:'#fff',
    height:'64%'
  },
  sixty:{
    height:'60%',
  },
  chosen:{
    fontSize:20,
    // backgroundColor:'#03ac13',
    backgroundColor:'#228b22',
    margin:15,
    width:'75%',
    alignContent:'center',
    alignSelf:'center',
    borderColor:'#0f0',
    borderRightWidth:3,
    borderBottomWidth:3,
    // width:'100%',
    // maxWidth:'200%',
    color:'black',
    borderRadius:20,
  },
  hundred:{
    height:'100%'
  },
  absolute:{
      flex:1,
      height:'100%',
      position:'absolute',
      alignSelf:'center',
      height:'100%',
      width:'100%',
      resizeMode:'stretch',
      // justifyContent:'center',
      // alignContent:'center',
      // height:'100%',
      textAlign:'center',
      backgroundColor: 'transparent'
  },
  options:{
    fontSize:20,
    backgroundColor:'#808080',
    margin:10,
    width:'70%',
    alignSelf:'center',
    borderColor:'#0000bb',
    borderRightWidth:5,
    borderBottomWidth:5,
    // width:'100%',
    // maxWidth:'200%',
    borderRadius:20,
  },
  empty:{
    width:'50%'
  }
  ,
  para:{
    fontSize:20,
    padding:10,
    width:'80%',
    maxWidth:'80%',
    color:'#fff',
    alignSelf:'center',
    alignContent:'center',
    justifyContent:'center',
    textAlign:'center',
  },
  question:{
    // backfaceVisibility
    margin:30,
    backgroundColor:'black',
    alignContent:'center',
    textAlign:'center',
    fontWeight:'bold',
    // position:'absolute',
    fontFamily:'serif',
    margin:20,
    fontSize:40,
    textShadowRadius:5,
    // shadowColor:'#ffffff',
    textShadowColor:'#ff0',
    color: '#fff'
  },
  quesTitle:{
    // backgroundColor:'#0000ff',
    // topmargin:40,
    marginLeft:20,
    // marginBottom:10,
    fontWeight:'bold',
    alignSelf:'center',
    fontSize:30,
    color:'#fff'
  },
  logo:{
    width:360,
    height:760
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'transparent',
},
innerContainer: {
  height:'80%',
  maxHeight:'80%',
    flexDirection:'column',
    justifyContent:'space-between',
    backgroundColor: 'transparent',
    color:'white',
    // padding: 80,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
},
row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    
},
aligncenter:{
  flex:'row',
  alignContent:'center'
},
// title: {
//   color:'white',
//     marginTop: 7,
// },
categoryTitle: {
  color:'white',
    marginBottom:10,
    fontSize:20,
},
previous:{
  backgroundColor:'#ccccff',
  color:'#000',
  shadowColor:'#ffffff',
  shadowRadius:20,
  // shadwi
  borderColor:'#000',
  // borderWidth:5,
  borderRightWidth:2,
  textShadowRadius:5,
  // shadowColor:'#ffffff',
  
  textShadowColor:'#ff0',
  // borderTopWidth:5,
  borderBottomWidth:2,
  // bordersha
  
  // margin:30,
  padding:15,
  // position:'absolute',
  margin: 30,
  paddingHorizontal:15,
  fontSize:30,
  borderRadius:20,
},
next:{
  // justifyContent:'flex-end',
  // alignContent:'flex-end',
  // alignSelf:'flex-end',
  // height:200,
  backgroundColor:'#00A36c',
  color:'#fff',
  shadowColor:'#ffffff',
  shadowRadius:20,
  // shadwi
  borderColor:'#fff',
  // borderWidth:5,
  borderRightWidth:2,
  textShadowRadius:2,
  // shadowColor:'#ffffff',
  
  textShadowColor:'#ff0',
  // borderTopWidth:5,
  borderBottomWidth:2,
  // bordersha
  paddingHorizontal:30,
  // paddding
  // margin:30,
  padding:15,
  margin:30,
  // position:'absolute',
  paddingHorizontal:40,
  fontSize:30,
  borderRadius:20,
},
logo: {
// margin:30,
  width: '100%',
  height: 700,
  // flex:2,
  justifyContent:'center',
  alignContent:'center',
  alignSelf:'center'
  // height: null,
},
bottomContainer:{
  position:'absolute',
  height:'100%',
  width:'100%',
  alignContent:'center',
  justifyContent:'center',
  // borderradius
  // marginTop:100,
  marginBottom:50,
  // backgroundColor:'#008080',
  // marginRight:40,
  // marginLeft:40,
},
btnGreen:{
  color:'#000',
  backgroundColor:'#228b22',
  borderRadius:30,
  fontSize:20,
  borderColor:'#0f0',
  borderBottomWidth:3,
  borderRightWidth:2,
  fontWeight:'bold',
  textAlign:'center',
  padding:10,
  height:50,
  width:50,
},
btnBlue:{
  color:'#fff',
  backgroundColor:'#002387',
  borderColor:'#00f',
  borderBottomWidth:3,
  borderRightWidth:3,
  fontSize:20,
  textAlign:'center',
  height:50,
  borderRadius:30,
  padding:10,
  fontWeight:'bold',
  width:50,
},
row2:{
  alignContent:'center',
  // alignSelf:'center',
  justifyContent:'space-between',
  flexDirection:'row',
  margin:20,
},
column:{
  justifyContent:'space-evenly',
  flexDirection:'column',
  marginLeft:30,
  marginRight:30,
  marginBottom:20,
  // margin:50,
},
rowlast:{
  flexDirection:'row',
  margin:30,
  alignItems:'center',
  justifyContent:'center',
  alignContent:'center',
},
miniLogo:{
  marginTop:20,
  height:40,
  width:40,
  borderRadius:30,
  alignSelf:'flex-end',
  marginRight:20,
  // position:'relative',
  // position:'absolute',
  // backgroundColor:'transparent'
},
header:{
  flexDirection:'row',
  justifyContent:'space-between',
  marginTop:30,
  width:'90%',
  height:'12%',
  alignContent:'center',
  alignSelf:'center',
  backgroundColor:'#00a36c',
  // borderWidth:5,
  borderColor:'#fff',
  borderBottomWidth:2,
  borderRightWidth:2,
  borderRadius:20,
  marginBottom:20,
},
para2:{
  color:'#fff',
  fontSize:20,
},
blue:{
  backgroundColor:'#002386',
  fontSize:25,
  marginRight:10,
  borderRadius:20,
},
green:{
  backgroundColor:'#228b22',
  fontSize:25,
  marginRight:10,
  borderRadius:20,
},
timer:{
  marginTop:20,
},
column2:{
  flexDirection:'column',
  margin:10,
},
row4:{
  alignSelf:'flex-start',
  flexDirection:'row',
  margin:10,
}
})

const optionTimer = {
  container: {
    backgroundColor: '#FF0000',
    padding: 5,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    color: '#FFF',
    marginLeft: 7,
    // backgroundColor:'white'
  },

};