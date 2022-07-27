import * as React from 'react';
import { View, Text ,StyleSheet, Image} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { LogBox,ActivityIndicator } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import { firestore } from '../Setup';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SimpleAnimatable from './components/animation';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);


const Result = ({navigation}) => {
  const user = firebase.auth().currentUser;
  const [loading,setLoading] = React.useState(true);
  const route = useRoute();
  const [score, setScore]= React.useState(0)
  const [isLoading,setIsLoading] = React.useState(false);
  const [objectMap, setObjectMap] = React.useState([]);
  const bgImg = 'https://imgs.search.brave.com/uDoIu1_6gQEFVIK51Ogzxn6qqY2W2iPWbfHv__Ia_-A/rs:fit:1200:1080:1/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC9USHNrbnZP/LmpwZw';
  const homeImg = 'https://www.freepnglogos.com/uploads/logo-home-png/home-round-icon-transparent-vector-7.png';
  const retryImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo8-KmZdYKyApnRTPnsLwgjynVg5LOwbH-6A&usqp=CAU';
  const getScore =()=>{
    setLoading(true);
    let total = 0;
    for (const [key, value] of route.params.map.entries()) {
        let quesScore = value.get("score");
        total += quesScore;
    }
    setScore(total);

    if(user){
      var newMap={};
      route.params.map.forEach((value, key) => {
            newMap[key] = Object.fromEntries(value);
        });
        setObjectMap(newMap);
      const usersCollectionRef = firestore().collection('Users').doc(user.uid).collection("History");
      usersCollectionRef.add({
        score: total,
        doneAt: firestore.FieldValue.serverTimestamp(),
        map: newMap,
      });
    }
    setLoading(false);
    updateLeaderBoard();
  }
  const updateLeaderBoard = async()=>{
    const subscriber =firestore()
      .collection('Users')
      .doc(user.uid)
      .collection('History')
      .orderBy('doneAt','desc')
      .onSnapshot(querySnapshot => {
        var value = 0;
        var len = 0;
      querySnapshot.forEach(documentSnapshot => {
        value += documentSnapshot.data().score;
        len++;
      });
      firestore().collection('Users').doc(user.uid).update({avg: (value+score)/(len)});
      });
    return () => subscriber();
  }
  React.useEffect(() => {
    getScore();
  }, []);
  if (loading) {
    return <ActivityIndicator color='#fff' size={'large'} animating={true} style = {{alignSelf:'center', justifyContent:'center', margin:300,size:"large",color:'white'}}/>;
  }

    return (
        <View style = {{width:'100%',height:'100%'}}>
        <View style = {styles.absolute}>
      {isLoading && <SimpleAnimatable/>}
      </View>
        <Image
        style={styles.bgImg}
        source={{
          uri: bgImg,
        }}
      />
      <View style={styles.absolute}>
      <View style = {styles.col}>
            <Text style = {styles.title}>Results</Text>
            <Text style = {styles.smallTitle}>You Scored : {score}</Text>
            <View style = {styles.row}>
              <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
                <Image style = {styles.smallLogo} source={{uri:homeImg}}/>
              </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Categories')}>
              <Image style = {styles.smallLogo} source={{uri:retryImg}}/>
            </TouchableOpacity>
            </View>
            <View>

            <Text
                    onPress={() => navigation.navigate('ShowDetails',{"map" : objectMap, "score" : score})}
                    style={styles.responses}>See Responses</Text>
                     <Text
                    onPress={() => navigation.navigate('History')}
                    style={styles.history}>History</Text>
            </View>
      </View>
        </View>
        </View>
    );
}

export default Result;

const styles = StyleSheet.create({
  smallLogo:{
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
    },
    title:{
      marginTop:40,
    fontWeight:'bold',
    alignSelf:'center',
    fontSize:50,
    color:'#66cdaa'

    },
    smallTitle:{
      fontSize:40,
      color:'#fff',
      fontWeight:'bold',
      alignContent:'center',
      textAlign:'center',
      alignSelf:'center',
    },
    responses:{
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
    bgImg: {
    height:'100%',
    width:'100%',
    },
    history:{
      textAlign:'center',
      backgroundColor:'#000',
      color:'#fff',
      shadowColor:'#ffffff',
      shadowRadius:20,
      borderColor:'#0000ff',
      borderRightWidth:5,
      textShadowRadius:5,
      textShadowColor:'#ffffff',
      borderBottomWidth:5,
      margin:15,
      padding:10,
      paddingHorizontal:40,
      fontSize:30,
      borderRadius:20,
    },
    
  });