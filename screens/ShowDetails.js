import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase } from '@react-native-firebase/auth';
import { firestore } from '../Setup';
import { ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import Items from './Items2';
// import Items from './Items';


const ShowDetails = ({navigation}) => {
    const route = useRoute();
    const [loading, setLoading] = useState(false); // Set loading to true on component mount
    const [users, setUsers] = useState([]); // Initial empty array of users
    const usr = firebase.auth().currentUser;
    const [d,setD] = useState(0);
    const [n,setN] = useState(1);
    // var d = 0;
    // var n = 1;

    const getScore =async()=>{
        // const a = await firestore().collection('Users').doc(usr.uid).collection('History').doc(route.params.id).get();
        // console.log(a.data().map);
        console.log(route.params.map);
        setLoading(false);
    }
    const makeList = ()=>{
        const questions = [];
        for (const key in route.params.map) {
            // console.log(`${key}: ${user[key]}`);
            questions.push({
                ...route.params.map[key],
                qno:key.charAt(0)-'0'+1
                // key: documentSnapshot.id,
              });
        }
        console.log(questions);
        setUsers(questions);
    }

    useEffect(() => {
        makeList();
  }, []);

  const ShowDetails=()=>{
    console.log('hi');
    // NavigationPreloadManager.
  }

  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <View>
    <View>
      <Text style = {styles.header}>Total Score: {route.params.score}</Text>
    </View>
    <FlatList style={{height:'90%'}}
      data={users}
      renderItem={({ item }) => (
        // <View style={styles.item}>
        <Items question1={item.question} chosen1={item.chosen} score1={item.score} correct1={item.correct} qno={item.qno}/>
        // </View>
      )}
    />
    </View>
  );
}

export default ShowDetails

const styles = StyleSheet.create({
  header:{
    fontSize:30,
    fontWeight:'bold',
    color:'white',
    backgroundColor:'#002387',
    borderRadius:20,
    // alignItems:'center',
    // alignSelf:'center',
    margin:10,
    padding:5,
    borderColor:'#00f',
    borderBottomWidth:5,
    borderRightWidth:5,
    textAlign:'center',
  },
    col:{
        margin:10,
        padding:5,
    },
    item:{
        fontSize:20,
        color:'white',
        alignSelf:'center',
        backgroundColor:'#006666',
        margin:10,
        width:'100%',
        padding:10,
        textAlign:'center',
        borderRadius:20,
        alignContent:'center',
        borderRightWidth:5,
        borderBottomWidth:5,
        borderColor:'#0f0'
    },
    title:{
        fontSize:30,
        fontWeight:'bold',
        color:'#fff',
        textAlign:'center',
        justifyContent:'center',
        alignSelf:'center',
    },
    text:{
        color:'white',
        fontSize:15,
        // backgroundColor:'#008080',
        borderRadius:10,
        // margin:10,
        // padding:5,
    },
});