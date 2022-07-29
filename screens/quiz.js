import * as React from 'react';
import { View, Text ,Image, StyleSheet,FlatList} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RadioButton } from 'react-native-paper';
import SimpleAnimatable from './components/animation';
import { BlurView } from 'expo-blur';
import CountDown from 'react-native-countdown-component';
import { useRoute,CommonActions } from '@react-navigation/native';


export default function Quiz({ navigation }) {

  const [isRunning,setIsRunning] = React.useState(true);
  const [questions, setQuestions] = React.useState();
  const [qnum, setQues] = React.useState(0);
  const [options, setOptions]= React.useState([])
  const [score, setScore]= React.useState(0)
  const [isLoading, setIsLoading]= React.useState(true)
  const [showMenu, setShowMenu] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [questionGrid,setQuestionGrid] = React.useState([]);
  const Route = useRoute();
  const [time, setTime] = React.useState(10);
  const menuImg = 'data:image/png;base64,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'
  const bgImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTod4yNGJMd3hnPYzabnADQzzbt81DbDWei9w&usqp=CAU';
  const cancelImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPs2CgRYqEB56IjdDYH8zTsIcEx8DQqnd4aA&usqp=CAU'
  const [len, setLen] = React.useState(10);
  
  
  // function for Grid of Question status
  function QuesStatusGrid(){
    return (
      <View>
        <TouchableOpacity onPress={()=>{setShowMenu(false);}}>
        <Image style = {styles.miniLogo} source={{uri:cancelImg}}/>
        </TouchableOpacity>

        <View style={styles.instrCol}>
        <View style = {styles.InstrRow}>
          <Text style = {styles.blue}>      </Text>
          <Text style = {styles.instr}>Not Answered</Text>
        </View>
        <View style = {styles.InstrRow}>
          <Text style = {styles.green}>     </Text>
          <Text style = {styles.instr}>Answered</Text>
        </View>
        </View>


        <FlatList style={{alignSelf:'center'}}
            data={ questionGrid }
            renderItem={ ({item}) =>
            <TouchableOpacity onPress={() => {
              setQues(item.key)
              setOptions(generateOptionsAndShuffle(questions[item.key]))
              setShowMenu(false)
            }}>
                <Text style = {(answerMap.get(item.key) != undefined && answerMap.get(item.key).get("chosen") != "")?(styles.btnGreen):styles.btnBlue}>{item.key+1}</Text>
            </TouchableOpacity> }
            numColumns={3}
         />


         <View style={styles.row}>
              <Text onPress={()=>{setIsRunning(false); navigation.navigate('Home')}} style={styles.previous}>End Quiz</Text>
              <Text onPress={()=>{setIsRunning(false); handleShowResult()}} style = {styles.next}>Submit</Text>
         </View>
      </View>
    )
  }
  const [answerMap, setMyMap] = React.useState(new Map());
  const updateMap = (k,v) => {
    setMyMap(new Map(answerMap.set(k,v)));
  }
  const getQuiz = async () => {
    
    setIsLoading(true)
    const url = Route.params.link;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.results);
    setQuestions(data.results);
    setOptions(generateOptionsAndShuffle(data.results[0]))
    setIsLoading(false)
    const questionNos = [];
    setLen(data.results.length);
    setTime(35);
    for(var i=0;i<data.results.length;i++){
      questionNos.push({
        key: i,
      });
    }
    setQuestionGrid(questionNos);
  };

  React.useEffect(() => {
    getQuiz();
  }, []);

  const previousClick=()=>{
    setQues(qnum-1)
    setOptions(generateOptionsAndShuffle(questions[qnum-1]))
  }
  const handleNextPress=()=>{
    if(answerMap.get(qnum) == undefined)
    updateMap(qnum,new Map([["chosen",""],["correct",questions[qnum].correct_answer], ["score", 0],["question", questions[qnum].question]]))
    setQues(qnum+1)
    setOptions(generateOptionsAndShuffle(questions[qnum+1]))
  }

  const generateOptionsAndShuffle=(_question)=>{
    const options= [..._question.incorrect_answers]
    options.push(_question.correct_answer)
    shuffleArray(options)
    return options
  }

  const handleSelectedOption=(_option)=>{
    if(_option===questions[qnum].correct_answer){
      setScore(score+10)
      updateMap(qnum,new Map([["chosen",_option],["correct",questions[qnum].correct_answer], ["score", 10],["question", questions[qnum].question]]))
    }
    else{
      updateMap(qnum,new Map([["chosen",_option],["correct",questions[qnum].correct_answer], ["score", 0],["question",questions[qnum].question]]))
    }
    if(qnum!==len-1){
      setQues(qnum+1)
      setOptions(generateOptionsAndShuffle(questions[qnum+1]))
    }
    if(qnum===len-1){
      showResult()
    }
  }
  const showResult=()=>{
    handleShowResult()
    setIsRunning(false);
    navigation.navigate('Result', {
      map: answerMap,
    })
  }
  const handleShowResult=()=>{
    for(var i=0;i<len;i++){
      if(answerMap.get(i) == undefined)
      updateMap(i,new Map([["chosen",""],["correct",questions[i].correct_answer], ["score", 0],["question", questions[i].question]]))
    }
    setIsRunning(false);
    navigation.navigate('Result', {
      map: answerMap,
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
      <View style = {styles.absolute}>
        <Image
        style={{resizeMode:'stretch',height:'100%',width:'100%'}}
        source={{
          uri:bgImg,
        }}
      />

      </View>
      <View style={{position:'absolute', alignContent:'center', alignSelf:'center'}}>
      {isLoading && <SimpleAnimatable/>}
      </View>
      {questions && (<View style= {styles.absolute}>
      <View style = {styles.header}>
        <Text style={styles.quesTitle}>
          Q. {qnum+1}
        </Text>
        <CountDown
        style = {{margin:20}}
          until={Route.params.time*10}
          running={isRunning}
          timeToShow={['M','S']}
          digitStyle={{backgroundColor:'#00f'}}
          showSeparator= {false}
          digitTxtStyle={{color:'yellow'}}
          timeLabelStyle={{color:'transparent'}}
          onFinish={() => {
            alert('Time Out')
            handleShowResult()}}
          size={20}
        />
        <TouchableOpacity onPress={handleMenu}>
          <Image style={styles.miniLogo} source={{uri:menuImg}}/>
        </TouchableOpacity>
      </View>
      <View style = {styles.col}>

        <Text style = {styles.para}>
          Q. {decodeURIComponent(questions[qnum].question)}
        </Text>
        <View style = {styles.sixty}>
        <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                <View style={styles.innerContainer}>
                    <TouchableOpacity style={((answerMap.get(qnum) != undefined && answerMap.get(qnum).get("chosen") == options[0])?styles.chosen:styles.options)} onPress={()=>handleSelectedOption(options[0])}>
                        <Text style={styles.para}>{decodeURIComponent(options[0])}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={((answerMap.get(qnum) != undefined && answerMap.get(qnum).get("chosen") == options[1])?styles.chosen:styles.options)} onPress={()=>handleSelectedOption(options[1])}>
                        <Text style={styles.para}>{decodeURIComponent(options[1])}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={((answerMap.get(qnum) != undefined && answerMap.get(qnum).get("chosen") == options[2])?styles.chosen:styles.options)} onPress={()=>handleSelectedOption(options[2])}>
                        <Text style={styles.para}>{decodeURIComponent(options[2])}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={((answerMap.get(qnum) != undefined && answerMap.get(qnum).get("chosen") == options[3])?styles.chosen:styles.options)} onPress={()=>handleSelectedOption(options[3])}>
                        <Text style={styles.para}>{decodeURIComponent(options[3])}</Text>
                    </TouchableOpacity>
                </View>
            </RadioButton.Group>
            </View>
      </View>
            <View style= {styles.row}>
            {(qnum !== 0) ? (<Text
                    onPress={previousClick}
                    style={styles.previous}>Previous</Text>):<Text style = {styles.empty}> </Text>}
      {qnum == len-1?(<Text
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
        <QuesStatusGrid/>
      </BlurView>}
        </View>
    );
}
const styles = StyleSheet.create({
  col:{
    flexDirection:'column',
    justifyContent:'space-evenly',
    height:'64%'
  },
  sixty:{
    height:'60%',
  },
  chosen:{
    fontSize:20,
    backgroundColor:'#228b22',
    margin:15,
    width:'75%',
    alignContent:'center',
    alignSelf:'center',
    borderColor:'#0f0',
    borderRightWidth:3,
    borderBottomWidth:3,
    color:'black',
    borderRadius:20,
  },
  hundred:{
    height:'100%'
  },
  absolute:{
      height:'100%',
      position:'absolute',
      alignSelf:'center',
      height:'100%',
      width:'100%',
      resizeMode:'stretch',
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
    fontWeight:'bold',
    color:'#fff',
    alignSelf:'center',
    alignContent:'center',
    justifyContent:'center',
    textAlign:'center',
  },
  question:{
    margin:30,
    backgroundColor:'black',
    alignContent:'center',
    textAlign:'center',
    fontWeight:'bold',
    fontFamily:'serif',
    margin:20,
    fontSize:40,
    textShadowRadius:5,
    textShadowColor:'#ff0',
    color: '#fff'
  },
  quesTitle:{
    marginLeft:20,
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
  fontWeight:'bold',
  borderColor:'#000',
  borderRightWidth:2,
  textShadowRadius:5,
  textShadowColor:'#ff0',
  borderBottomWidth:2,
  padding:15,
  margin: 30,
  paddingHorizontal:15,
  fontSize:30,
  borderRadius:20,
},
next:{
  backgroundColor:'#00A36c',
  color:'#fff',
  shadowColor:'#ffffff',
  shadowRadius:20,
  fontWeight:'bold',
  borderColor:'#fff',
  borderRightWidth:2,
  textShadowRadius:2,
  textShadowColor:'#ff0',
  borderBottomWidth:2,
  paddingHorizontal:30,
  padding:15,
  margin:30,
  paddingHorizontal:40,
  fontSize:30,
  borderRadius:20,
},
logo: {
  width: '100%',
  height: 700,
  justifyContent:'center',
  alignContent:'center',
  alignSelf:'center'
},
bottomContainer:{
  position:'absolute',
  height:'100%',
  width:'100%',
  alignContent:'center',
  justifyContent:'center',
  marginBottom:50,
},
btnGreen:{
  color:'#000',
  backgroundColor:'#228b22',
  borderRadius:30,
  fontSize:20,
  margin:30,
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
  margin:30,
  borderRadius:30,
  padding:10,
  fontWeight:'bold',
  width:50,
},
column:{
  justifyContent:'space-evenly',
  flexDirection:'column',
  marginLeft:30,
  marginRight:30,
  marginBottom:20,
},
miniLogo:{
  marginTop:20,
  height:40,
  width:40,
  borderRadius:30,
  alignSelf:'flex-end',
  marginRight:20,
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
  borderColor:'#fff',
  borderBottomWidth:2,
  borderRightWidth:2,
  borderRadius:20,
  marginBottom:20,
},
instr:{
  color:'#fff',
  fontSize:20,
},
blue:{
  backgroundColor:'#002386',
  fontSize:25,
  marginRight:10,
  borderRadius:200,
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
instrCol:{
  flexDirection:'column',
  margin:10,
},
InstrRow:{
  alignSelf:'flex-start',
  flexDirection:'row',
  margin:10,
}
})