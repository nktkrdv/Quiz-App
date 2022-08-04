import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase } from '@react-native-firebase/auth';
import { firestore } from '../Setup';
import { ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const History = ({navigation}) => {
    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [questionList, setQuestionList] = useState([]); // Initial empty array of users
    const usr = firebase.auth().currentUser;
    const [score,setScore] = useState(0);
    const [length,setLength] = useState(1);

    useEffect(() => {
    const subscriber =firestore()
      .collection('Users')
      .doc(usr.uid)
      .collection('History')
      .orderBy('doneAt','desc')
      .onSnapshot(querySnapshot => {
        const answerList = [];
        var value = 0;
        var len = 0;
      querySnapshot.forEach(documentSnapshot => {
        value += documentSnapshot.data().score;
        len++;
        answerList.push({
          ...documentSnapshot.data(),
          key: len,
        });
      });
      setScore(value);
      setLength(len);
      setQuestionList(answerList);
      setLoading(false);
      });
    return () => subscriber();
  }, []);

  const ShowDetails=(key,score)=>{
    navigation.navigate('ShowDetails',{map:key,score:score});
  }

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View>
    <View>
      <Text style = {styles.header}>Average Score: {(score/length).toFixed(2)}</Text>
    </View>
    <FlatList style={{height:'90%'}}
      data={questionList}
      renderItem={({ item }) => (
        <View style={(item.key%2==0)?[styles.item,{backgroundColor:'#002f6c',borderColor:'#13294b'}]:[styles.item,{backgroundColor:'#001440',borderColor:'#006eb3'}]}>
        <TouchableOpacity onPress={()=>ShowDetails(item.map,item.score)}>
          <Text style={styles.title}>Score: {item.score}</Text>
          <View style={styles.col}>
          <Text style = {styles.text}>Completed On : {item.doneAt.toDate().toDateString()}</Text>
          <Text style = {styles.text}>At {item.doneAt.toDate().toTimeString().substring(0,9)}</Text>
          </View>
        </TouchableOpacity>
        </View>
      )}
    />
    </View>
  );
}

export default History

const styles = StyleSheet.create({
  header:{
    fontSize:30,
    fontWeight:'bold',
    color:'white',
    backgroundColor:'#002387',
    borderRadius:20,
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
        backgroundColor:'#002f6c',
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
        color:'#009a18',
        textAlign:'center',
        justifyContent:'center',
        alignSelf:'center',
    },
    text:{
        color:'white',
        fontSize:15,
        borderRadius:10,
    },
});