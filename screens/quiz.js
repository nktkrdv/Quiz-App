import * as React from 'react';
import { View, Text ,Image, StyleSheet,FlatList} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RadioButton } from 'react-native-paper';
import SimpleAnimatable from './components/animation';
import { BlurView } from 'expo-blur';
import CountDown from 'react-native-countdown-component';
import { useRoute,CommonActions } from '@react-navigation/native';
import LoadingAnimation from './components/loadingAnime';


export default function Quiz({ navigation }) {

  const [optionsList, setOptionsList] = React.useState([]);
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
  const submitImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEVDoEf///9An0QxmjY7nT8nly0wmjU0mzk5nT4rmDGMwI72+vbd7N5MpFC+2r/I4MldqmDs9Ox7uH2ax5yiy6NqsG2w07Hk7+S11baVxZdNpFHX6NiLwI2Cu4S72LxHoktVp1lztHVcql/G38dusnGpz6ugUNjWAAALr0lEQVR4nO2dV2OjOhCFjRAIbBMT18SO2836///Fi+NgmsqMKtnNecrDFr4gZiSd0WgS/e2ahH4A5/ol/Pn6Jfz5+iW0odfD53b1sdyU+wnNWEYn+3Kz/FhtPw+vHv53t4Tzl9X1nOcxq7goIWTyUPUTrVhZnOfn6+o0d/oMzgh3p+klSVn2xOKLkIylyX562rl6ECeEu7clSxmVs3U4afXnl29OKO0THt4nOaNguEaU5ZP3hfXnsUy4OMYx4t0N32UcHy1D2iQ8TFms8/J6rzJmHweLT2WNcHYrUnO8b8i0uM1sPZglwvkxZ/qDcyiSJUdLScQK4aLMbb2+RjQvrXyRFghfitTm62tE0uJlBIQv59gN3xdjfDZmNCRcFA75HoyF4Vg1IpyXjsZnhzEtjWKOAeHsmLjn+2JMjga5Q59w6yB+ikTzrXfC+YV547uLXXSHqibhytMAbUSSlUfCXeH3BT7ECq3VlQ7h2vsLfIgkay+EszLEC3woLvFBFU140Frd2hJl6IUVlnCdBOS7Cz1SkYTXODBgNVKvDglnRRaar1JWoD5GDOHc6iJXX4Rhsj+CcBEoSQxFEsR6A064DR1j2krg81Qw4ToPTdVRDg6pUML3NDRTT+m7XcLp2AArxKlNwhECghFBhKMbog/BBiqEcD1OwAoREm4AhNtxRdG2IJsbasLFmPJgX4DUryScjxmwQlRO4FSEs5HMRUUiTDUNVxEW4wasEAszwusYlktyZVcTwnX4Ba9asTxnSAkPY4gymfI7SaR7NzLCWbhNtUb59qJElEYbGWEZclftW9VCcHZWIdJSj3A9gleY3+5jaaJClH2KYsLdCD7C73XuTFE6Vr1q8Ya/mHAEmTCtzZhXVRWSJCsKCVfhx2hrdfSqiqhM6EyJCEcwHY3bK9xX1exROE5FhOoQ7Vrso/NAO0VJBLngCLfBxyg79h5pp1imMsFakU84C77oZcvBQ80VD5Xz8z6f8Bg613MAlbGB9t+6hDB4mBGsFxTzZP5qmEtYBg4z2YYLqEIk3Mkbj3AReG9NCKjaNEp5uzY8wsCzGek8WorIndlwCF/CLnvpfxLA6ulkiDGnkpFDqFysOBUVZe5aJwkiOUMIw75CulcARtGbBJHzEoeEQb9C5c7ZXRKvlvP3B4RBAyk5g4oQbuLZzTCcDghD5kIyAVZZiA3pYU7sE6omfy5FCLiMZCUcaXl/YtMnDDgjJRRxHFFoaQ5mpz3CgIsKkqHOW05FIb+/xOgR3oLt4hOGPFD6IXhUdpMSBksVJEWXxwq2IfoJo0t4CJYqcjTgu2gbIu1u8ncJp6HizCACKiWOprRbo9ElDLU7o3Zy+5KVaDEx4SLQlFRuHvEkmdVUk9POvKZDGCgZ4gHlVYTdlNghDPMKMaWUD8lWF3fFIsIwgzT5xALKVohfituDok34HmKQJugDhtJV/pdouxysTai06RwoOWEBARVMpEPV/KjaNneh5M0BYHf+0CJ8858NEcXM34IVT7DWL65FuPT+Gea3IYINwAltmQItQu+vEF6rXQtsN7SmNQ3hzvesO0UfKIRvQLRWKg3hyfM7BJeit94BONizJkQ3hJ7XFTGwEL0FiDgY31pfNIR7r9mw52EDpHTy22p53g2hV89w4GGrAdX1bW0lQ8K5z0DDtXilmiH7+qTPFeeT0GegYVc0oLIqqv9fPEPNk3Dlb5dNVfPKAURPmbNnKnoSXr0FGonFKwLEG37k+Vt8EnpzDfGAOmG+cRKfhL4WFlIPWwCok6nzPuGrHiHBtqdReNg8XbSmInm9hV4THrR2MLLNKy7IKT3soTQrlZ87GTXhp06yuI84VCYGeNgDQM0Yz+rtn5pQp1TvMeIQsymQh93VRjeJPQv5akKNdFiPOPCMGOhht/VHO0s/E2JN+IEe7c0nBdzgAXvYjQyO7DxXFzUheguj/UmBVqYID7vW0mAm+dzIqAk32KjfiRmA3QWUh20OOCH1xKImRJZgkF5vCuUOEdrijaKj0VrgWZRRE+ImRsOYoUDUAPww8xhIPchqQtzf5gRFedFgjLd4jU2UHiEm0PCD4qekFgtv0psfkKc9QkRYFgVFsWNi08MGK+sRwr9qQkVRX+R64R1QG21G6k1h9DuURX2+c2nZw4aq/w6h36G8connPuMtXjudcPrfIRRQEfWHv337HjZUPUJYPlSntf4XhPew1RYvSIN8CJrTQNJaNwq68LCBhP05DWReCktr7UyG97AlWRVJ2J+XAtYW0Lzd1EU68rBBGqwtAOtDcN7++E6u+MaxFhsADNaH6jU+YmLyWBU487BBGqzxlfs0qLx9X9k59LAhGuzTqPbakBOTK3PpYYMI+3ttiv1SdNvQjUsPG6LBfql8z5vg9znRgJabuw/2vBW+hXNElIcNIqz/Zaj3pLEdjwLEedhqcbwnlX/oFBHrYQMIrwNCZULUcI3AgFgPWy2OB6z28TO88wcEdFD2yfHxAbUYGu4tCNCF/cypxYDU02R/XBBqWbwqceppQL0+8GUiaulZvApxa6JAdW34Up8ggPy6NljJEL5cSy5H3ba4tYnA+lK7iLoetkrc+lLopnCMrioUS9vDVolbIww2SWP0skEkfQ9bIUGdN7hWH1/dy5e7tpOCWn34eQtQ/16ljCxeuQTnLRBnZvA7FEOZWbxSic7MYM494XeZPAKKzz1hzq7hT7t0ZehhyyU8u4Y6f4jf7W3L3MOWSXj+EHeGFG9JtACdFpVLzpDijljibaVaFjxsmSTngJFHn/DW4EOur8qQnOXGnpvRQ7TiYUskPY+P7amAt+g93OYi7amA7ouBR7TlYQsl74sR3bB5GFsqY8viFUvR2wTfnwaHaM3ilTyQvD8Nvq0CqqLLw00Sqh5DGhYXoirPx1UZyj5RGr2+wJWVPprYq3t96fRrA3Z48tKlH9CvTaeRkriYryUvbV8hPfe0+iYCqtT9NIID9U3UOsWmPGlg2cMWPQao96Ve88t+aXsf0PEF5d8C9i/Va2kmPdJk3cPmC9qDVrP9pcQktu5hCwTuI6zZ/1KIaN/D5gveC1o3sAt8cAceNl+Ift66Tb+4PrgLD5srTE927RaYHB/ciYfNVYrpq699N8LQB3fiYfOEuxtB/36Lvg/uxuLlCHu/hf49Ol0f3Bsg/o4S/Xtm2iaxvxuj8PfMGDRrbRBdedhD6dwVZHDfU90+yJmHPZTWfU/RTds9efjgzjxszn8oMfskhNFG+yu6++BXfw1vqKwcTUZocHdeunbpgPalfXeeyc5K5rFzmP79h//AHZYuC0KsyeweUt9d3DSkrLFXEf799wGHv91KLvM7nf+Be7mj6C34NXNC5YCSFwBhtA58h5dQoPo6CKHj8hdtwWokQYTjRExhHVBhhGNEBAJCCceHCC7jhRI6L2RCCl7hCiZ0XwiDEaIyEk5Ypf6xTOAIptwMQRjNRzJHJQxTw4MhjGb7MSymsj2q8RuKsFovhl8Sx1fcIyMJo3XoeJNgjwlgCaMDC3kbMkU3BsATRrNNuJEab9C9FzUIo+gWKG2QROeUhw5htNuHuNyLFei+dtqEUbTy/hpJgm4lYkQY7S5+XyO7aL1AA8Io2qb+girFtyuyQBjNjp6GKkmO+BBqg7CaqJYe6vFIWqIbS1ojrNYbe8cleSQuNE/mWCKMopezQ0YSnw3Oj1kirBgLR2OVpIUxnxXCaqyWuf24SvPScHw+ZIWwijnH3OrymLD8aBRfGlkirHLHrbCWIGla3AzyQ1fWCCsdpiw2h6Qxm2ociRPKJmGlxTGODeplCY3jo5Wvr5FlwkqH90mutUqmLJ+8W8aLXBBW2r0tWcoQ75LQ6s8v33Qn11I5Ibxrd5pekpRlihJoQjKWJpfpyQndXc4IvzR/WV3PeR4zllFKnrDVT5RmjMV5fr6uTpbSgkBuCR96PXxuV9PlptxPKq6MTvblZjldbT8P6OsENOSDMKx+CX++fgl/vn4Jf77+B78gqzhQHrc8AAAAAElFTkSuQmCC';
  const nextImg = 'https://icons.iconarchive.com/icons/hopstarter/soft-scraps/256/Button-Next-icon.png';
  const prevImg = 'data:image/jpeg;base64,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';
  const menuImg = 'data:image/png;base64,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'
  const bgImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTod4yNGJMd3hnPYzabnADQzzbt81DbDWei9w&usqp=CAU';
  const cancelImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPs2CgRYqEB56IjdDYH8zTsIcEx8DQqnd4aA&usqp=CAU'
  const [len, setLen] = React.useState(10);
  const l = Route.params.time;
  
  
  function ButtonImg({img}){
    return(
      <Image style={styles.bottomButton}
        source={{uri: img}}
      />
    );
  }
  // function for Grid of Question status
  function QuesStatusGrid(){
    return (
      <View style={{height:'100%',width:'80%'}}>
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


        <FlatList style={{alignSelf:'center' ,width:'90%',height:'70%'}}
        columnWrapperStyle={{justifyContent:'space-between'}}
        contentContainerStyle={{justifyContent:'space-between',alignContent:'space-between',alignItems:'stretch',alignSelf:'stretch'}}
            data={ questionGrid }
            renderItem={ ({item}) =>
            <TouchableOpacity onPress={() => {
              setQues(item.key)
              setOptions(generateOptionsAndShuffle(questions[item.key]))
              setShowMenu(false)
            }}>
                <Text style = {(answerMap.get(item.key) != undefined && answerMap.get(item.key).get("chosen") != "")?([styles.btnGreen,{marginBottom:(l<=12)?100:((l<=24)?40:(l<30)?15:(l<=40)?5:0)}]):[styles.btnBlue,{marginBottom:(l<15)?100:((l<=24)?40:(l<=30)?15:(l<=40?5:0))}]}>{item.key+1}</Text>
            </TouchableOpacity> }
            numColumns={l<6?2:(l<15?3:(l<32?4:5))}
         />

         <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:20,marginTop:20}}>
              <TouchableOpacity onPress={()=>{setIsRunning(false); navigation.navigate('Home')}} >
                <Text style = {styles.end}>End Quiz</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{setIsRunning(false); handleShowResult()}}>
                <ButtonImg img={submitImg} />
              </TouchableOpacity>
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
    if(res == null)
    return;
    const data = await res.json();
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
    console.log(options)
    const flatOptions = [];
    for(var i=0;i<options.length;i++){
      flatOptions.push({key:i})
    }
    console.log(flatOptions);
    setOptionsList(flatOptions);
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
      {isLoading && <LoadingAnimation/>}
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
          // onFinish={() => {
          //   alert('Time Out')
          //   handleShowResult()}}
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
              <FlatList
                data={optionsList}
                renderItem={ ({item}) =>
                <TouchableOpacity style={((answerMap.get(qnum) != undefined && answerMap.get(qnum).get("chosen") == options[item.key])?styles.chosen:styles.options)} onPress={()=>handleSelectedOption(options[item.key])}>
                    <View style={{flexDirection:'row'}}>

                        <Text style={{fontSize:20,fontWeight:'bold',color:'#fff',textAlignVertical:'center',marginLeft:5}}>{String.fromCharCode(65+item.key)}.</Text>
                        <Text style={styles.para}>{decodeURIComponent(options[item.key])}</Text>
                    </View>
                    </TouchableOpacity> }
              />
            </View>
      </View>
            <View style= {styles.row}>
            {(qnum !== 0) ? (<TouchableOpacity onPress={()=>previousClick()} ><ButtonImg img={prevImg} /></TouchableOpacity>):<Text style = {styles.empty}> </Text>}
            <Text onPress={()=>{setIsRunning(false); navigation.navigate('Categories')}} style={styles.end}>End Quiz</Text>
      {qnum == len-1?(<TouchableOpacity onPress={()=>handleShowResult()} ><ButtonImg img={submitImg} /></TouchableOpacity>):(
                      <TouchableOpacity onPress={()=>handleNextPress()}>
                      <ButtonImg img={nextImg} />
                      </TouchableOpacity>
                    )
      }
            </View>
      </View>)}
      {showMenu && <BlurView intensity={122} tint='dark' style = {styles.container}>
        <QuesStatusGrid/>
      </BlurView>}
        </View>
    );
}
const styles = StyleSheet.create({
  col:{
    flexDirection:'column',
    justifyContent:'space-evenly',
    height:'70%'
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
    width:'15%'
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
  // marginTop:30,
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
  // marginTop:30,
  // marginBottom:30,
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
},
bottomButton:{
  height:60,
  alignItems:'center',
  resizeMode:'cover',
  alignContent:'center',
  alignSelf:'center',
  justifyContent:'center',
  width:60,
  borderRadius:40,

},
end:{
  backgroundColor:'#000',
  fontSize:20,
  color:'#fff',
  textAlign:'center',
  borderWidth:1,
  borderBottomColor:'#0f0',
  borderRightColor:'#0f0',
  padding:15,
  paddingHorizontal:30,
  borderRadius:20,

}
})