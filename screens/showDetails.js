import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Items from './components/itemHistory';


const ShowDetails = ({navigation}) => {
    const route = useRoute();
    const [loading, setLoading] = useState(false); // Set loading to true on component mount
    const [users, setUsers] = useState([]); // Initial empty array of users
    const makeList = ()=>{
        const questions = [];
        for (const key in route.params.map) {
            questions.push({
                ...route.params.map[key],
                qno:parseInt(key)+1
              });
        }
        setUsers(questions);
    }

    useEffect(() => {
        makeList();
  }, []);

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
        <Items question1={item.question} chosen1={item.chosen} score1={item.score} correct1={item.correct} qno={item.qno}/>
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
        borderRadius:10,
    },
});