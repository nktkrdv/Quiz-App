import * as React from 'react';
import { View, Text ,StyleSheet, Image} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { LogBox,ActivityIndicator } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import { firestore } from '../Setup';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SimpleAnimatable from './animation';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const Result = ({navigation}) => {
  const [loading,setLoading] = React.useState(true);
  const route = useRoute();
  // const [score,setScore] = React.useState(0);
  const [score, setScore]= React.useState(0)
  const [isLoading,setIsLoading] = React.useState(false);
  const getScore =()=>{
    setLoading(true);
    let b = 0;
    // const object = {'a': 1, 'b': 2, 'c' : 3};
    for (const [key, value] of route.params.map.entries()) {
      // console.log(score)
        console.log(key, value);
        let a = value.get("score");
        b += a;
        console.log('b = ',b)
        // console.log(value.get("score"))
    }
    setScore(b);
    console.log('score = '  ,score);
    const user = firebase.auth().currentUser;
    if(user){
      console.log('user uid ' ,user.uid);
      var newMap={};
      route.params.map.forEach((value, key) => {
        //   // console.log(value, key);
        //    // 👉️ Chile country, 30 age
            // route.params.map.set(key,Object.fromEntries(value));
            newMap[key] = Object.fromEntries(value);
        });
        console.log(newMap);
      // const a = await firestore().collection('Users').doc(user.uid).collection('Details').doc('Score').get();
      // const n = await firestore().collection('Users').doc(user.uid).collection('Details').doc('Length').get();
      // const r = await firestore().collection('Users').doc(user.uid).collection('Details').doc('Map').get();
     
        // const ar  = await firestore().collection('Users').doc(user.uid).collection('Details').doc('Map').set(newMap);
        
      const usersCollectionRef = firestore().collection('Users').doc(user.uid).collection("History");
      usersCollectionRef.add({
        score: b,
        doneAt: firestore.FieldValue.serverTimestamp(),
        map: newMap,
      });
    }
    setLoading(false);
  }
  const addToHistory = async()=>{
  }
  React.useEffect(() => {
    getScore();
  }, []);
 
  // const {answerMap} = route.params.name;
  const print=()=>{
    // setQues(ques-1)
    {console.log(route.params.map)}
    // setscore
  }
  if (loading) {
    return <ActivityIndicator color='#fff' size={'large'} animating={true} style = {{alignSelf:'center', justifyContent:'center', margin:300,size:"large",color:'white'}}/>;
  }
    return (
        <View style = {{width:'100%',height:'100%'}}>
        <View style = {styles.absolute}>
      {isLoading && <SimpleAnimatable/>}
      </View>
        <Image
        style={styles.logo}
        source={{
          uri: 'https://imgs.search.brave.com/uDoIu1_6gQEFVIK51Ogzxn6qqY2W2iPWbfHv__Ia_-A/rs:fit:1200:1080:1/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC9USHNrbnZP/LmpwZw',
        }}
      />
      <View style={styles.absolute}>
      <View style = {styles.col}>
            <Text style = {styles.title}>Results</Text>
            <Text style = {styles.smalltitle}>You Scored : {score}</Text>
            <View style = {styles.row}>
            <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
              <Image style = {styles.smalllogo} source={{uri:'https://www.freepnglogos.com/uploads/logo-home-png/home-round-icon-transparent-vector-7.png'}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('StopWatch')}>
              <Image style = {styles.smalllogo} source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo8-KmZdYKyApnRTPnsLwgjynVg5LOwbH-6A&usqp=CAU'}}/>
            </TouchableOpacity>
            </View>
            <View>

            <Text
                    onPress={() => navigation.navigate('Responses',{"map" : route.params.map, "score" : score})}
                    style={styles.button}>See Responses</Text>
                     <Text
                    onPress={() => navigation.navigate('History')}
                    // onPress={print}
                    style={styles.button2}>History</Text>
                {/* <Text
                    onPress={() => navigation.navigate('Home')}
                    // onPress={print}
                    style={styles.button2}>Go To Home</Text> */}
            </View>
      </View>
        </View>
        </View>
    );
}

export default Result;

const styles = StyleSheet.create({
  smalllogo:{
    alignSelf:'center',
    alignContent:'center',
    justifyContent:'center',

    width:50,
    height:50,
    borderRadius:30,
    padding:5,
  },
  row:{
    justifyContent:'space-evenly',
    flexDirection:'row',
    alignContent:'center',
    alignSelf:'center',
    padding:10,
    height:'20%',
    width:'80%',
  },
  col:{
    flexDirection:'column',
    justifyContent:'space-between',
    // backgroundColor:'#fff',
    width:'80%',
    textAlign:'center',
    height:'100%'
  },
    container: {
      paddingTop: 50,
    },
    absolute:{
      width:'100%',
      height:'100%',
      flex:1,
      position:'absolute',
      alignItems:'center',
      alignSelf:'center',
      justifyContent:'center',
      alignContent:'center',
      textAlign:'center',
      // backgroundColor: 'transparent'
    },
    title:{
      marginTop:40,
    fontWeight:'bold',
    alignSelf:'center',
    fontSize:50,
    color:'#66cdaa'

    },
    smalltitle:{
      fontSize:40,
      // margin:20,
      color:'#fff',
      fontWeight:'bold',
      alignContent:'center',
      textAlign:'center',
      alignSelf:'center',
    },
    button:{
      textAlign:'center',
      backgroundColor:'#002487',
      borderBottomWidth:5,
      borderRightWidth:5,
      borderColor:'#00f',
      color:'#fff',
      margin:15,
      padding:15,
      paddingHorizontal:40,
      fontSize:30,
      borderRadius:20,
    },
    logo: {
    // margin:30,
    height:'100%',
    width:'100%',
      // width: 360,
      // height: 760,
    },
    // button:{
    //   backgroundColor:'#002387',
    //   color:'#fff',
    //   shadowColor:'#ffffff',
    //   shadowRadius:20,
    //   // shadwi
    //   borderColor:'#0000ff',
    //   // borderWidth:5,
    //   borderRightWidth:5,
    //   textShadowRadius:5,
    //   // shadowColor:'#ffffff',
    //   textShadowColor:'#ffffff',
    //   // borderTopWidth:5,
    //   borderBottomWidth:5,
    //   // bordersha
    //   margin:30,
    //   // padding:10,
    //   // position:'absolute',
    //   paddingHorizontal:25,
    //   padding:10,
    //   fontSize:30,
    //   borderRadius:20,
    // },
    button2:{
      textAlign:'center',
      backgroundColor:'#000',
      color:'#fff',
      shadowColor:'#ffffff',
      shadowRadius:20,
      // shadwi
      borderColor:'#0000ff',
      // borderWidth:5,
      borderRightWidth:5,
      textShadowRadius:5,
      // shadowColor:'#ffffff',
      textShadowColor:'#ffffff',
      // borderTopWidth:5,
      borderBottomWidth:5,
      // bordersha
      margin:15,
      padding:10,
      // position:'absolute',
      paddingHorizontal:40,
      fontSize:30,
      borderRadius:20,
    },
    button3:{
      textAlign:'center',
      backgroundColor:'#008080',
      color:'#fff',
      borderColor:'#0000ff',
      borderRightWidth:5,
      textShadowRadius:5,
      borderBottomWidth:5,
      margin:15,
      padding:10,
      paddingHorizontal:40,
      fontSize:30,
      borderRadius:20,
    },
    
  });