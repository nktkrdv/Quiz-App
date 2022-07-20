import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase } from '@react-native-firebase/auth';
import { firestore } from '../Setup';
import { ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const History = ({navigation}) => {
    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [users, setUsers] = useState([]); // Initial empty array of users
    const usr = firebase.auth().currentUser;
    const [d,setD] = useState(0);
    const [n,setN] = useState(1);
    // var d = 0;
    // var n = 1;

    useEffect(() => {
      // getAvg();
      // console.log('score ',d);
      // console.log('number ',n);
    // const user
    const subscriber =firestore()
      .collection('Users')
      .doc(usr.uid)
      .collection('History')
      .orderBy('doneAt','desc')
      .onSnapshot(querySnapshot => {
        // see next step
        const users = [];
        var value = 0;
        var len = 0;
      querySnapshot.forEach(documentSnapshot => {
        // value += documentSnapshot.data()
        // console.log('data = ',documentSnapshot.data().score);
        value += documentSnapshot.data().score;
        len++;
        // console.log(documentSnapshot.id);
        users.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      console.log(value);
      console.log(len);
      setD(value);
      setN(len);
      setUsers(users);
      setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  const ShowDetails=(key,score)=>{
    console.log(users);
    console.log('score  = ',score);

    navigation.navigate('ShowDetails',{map:key,score:score});
  }

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View>
    <View>
      <Text style = {styles.header}>Average Score: {(d/n).toFixed(2)}</Text>
    </View>
    <FlatList style={{height:'90%'}}
      data={users}
      renderItem={({ item }) => (
        <View style={styles.item}>
        <TouchableOpacity onPress={()=>ShowDetails(item.map,item.score)}>

          <Text style={styles.title}>Score: {item.score}</Text>
          <View style={styles.col}>
          <Text style = {styles.text}>Completed On : {item.doneAt.toDate().toDateString()}</Text>
          <Text style = {styles.text}>At {item.doneAt.toDate().toTimeString().substring(0,9)}</Text>
          {/* <Text style = {styles.text}>{item.key}</Text> */}
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